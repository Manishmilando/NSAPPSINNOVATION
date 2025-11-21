import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function createTextTexture(gl, text, font = 'bold 20px sans-serif', color = '#000000') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.4);
  canvas.width = textWidth + 60;
  canvas.height = textHeight + 40;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, text, textColor = '#000000', font = 'bold 20px sans-serif' }) {
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.8;
    this.mesh.setParent(this.plane);
  }
}

class ProjectCard {
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    
    this.program = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 2.5 + uTime) * 0.8 + cos(p.y * 2.0 + uTime) * 0.8) * (0.06 + uSpeed * 0.3);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 texColor = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: Math.random() * 100 },
        uBorderRadius: { value: 0.05 }
      },
      transparent: true
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${this.image}`);
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: '#000000',
      font: 'bold 18px sans-serif'
    });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    const bend = 1.2;
    const B_abs = Math.abs(bend);
    const R = (H * H + B_abs * B_abs) / (2 * B_abs);
    const effectiveX = Math.min(Math.abs(x), H);
    const arc = R - Math.sqrt(Math.max(0, R * R - effectiveX * effectiveX));
    
    this.plane.position.y = -arc;
    this.plane.rotation.z = -Math.sign(x) * Math.asin(Math.min(effectiveX / R, 1));

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.025;
    this.program.uniforms.uSpeed.value = Math.abs(this.speed);

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    
    this.scale = this.screen.height / 1000;
    this.plane.scale.y = (this.viewport.height * (700 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (550 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    
    this.padding = 1.5;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

const ProjectSection = () => {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('product');
  const appRef = useRef(null);
  const navigate = useNavigate();

  const projectData = {
    product: [
      {
        id: 'vendor-dashboard',
        type: 'product',
        title: 'VENDOR DASHBOARD',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
      },
      {
        id: 'ns-apps-mobile',
        type: 'product',
        title: 'NS APPS MOBILE',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
      },
      {
        id: 'analytics-platform',
        type: 'product',
        title: 'ANALYTICS PLATFORM',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
      },
      {
        id: 'ecommerce-suite',
        type: 'product',
        title: 'E-COMMERCE SUITE',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
      },
      {
        id: 'crm-system',
        type: 'product',
        title: 'CRM SYSTEM',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop'
      },
      {
        id: 'project-tracker',
        type: 'product',
        title: 'PROJECT TRACKER',
        image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop'
      }
    ],
    service: [
      {
        id: 'web-development',
        type: 'service',
        title: 'WEB DEVELOPMENT',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'
      },
      {
        id: 'ui-ux-design',
        type: 'service',
        title: 'UI/UX DESIGN',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop'
      },
      {
        id: 'brand-identity',
        type: 'service',
        title: 'BRAND IDENTITY',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop'
      },
      {
        id: 'digital-marketing',
        type: 'service',
        title: 'DIGITAL MARKETING',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop'
      },
      {
        id: 'consulting',
        type: 'service',
        title: 'CONSULTING',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop'
      },
      {
        id: 'maintenance',
        type: 'service',
        title: 'MAINTENANCE',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop'
      }
    ]
  };

  // ✅ FIXED: Enhanced navigation handler
  const handleExploreClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear any hash from URL
    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname);
    }
    
    console.log('Navigating to:', `/projects/explore?type=${activeTab}`);
    
    // Navigate to explore page
    navigate(`/projects/explore?type=${activeTab}`);
  };

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // Clear existing canvas before creating new instance
    canvasContainerRef.current.innerHTML = '';

    class WebGLCarousel {
      constructor(container, items) {
        this.container = container;
        this.items = items;
        this.scroll = { ease: 0.08, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
        this.init();
      }

      init() {
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createCards();
        this.update();
        this.addEventListeners();
      }

      createRenderer() {
        this.renderer = new Renderer({
          alpha: false,
          antialias: true,
          dpr: Math.min(window.devicePixelRatio, 2)
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0.96, 0.96, 0.96, 1);
        
        this.gl.canvas.style.width = '100%';
        this.gl.canvas.style.height = '100%';
        this.gl.canvas.style.display = 'block';
        
        this.container.appendChild(this.gl.canvas);
      }

      createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 10;
      }

      createScene() {
        this.scene = new Transform();
      }

      createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
          heightSegments: 30,
          widthSegments: 60
        });
      }

      createCards() {
        const galleryItems = this.items.concat(this.items);
        this.cards = galleryItems.map((data, index) => {
          return new ProjectCard({
            geometry: this.planeGeometry,
            gl: this.gl,
            image: data.image,
            index,
            length: galleryItems.length,
            scene: this.scene,
            screen: this.screen,
            text: data.title,
            viewport: this.viewport
          });
        });
      }

      onTouchDown(e) {
        this.isDown = true;
        this.scroll.position = this.scroll.current;
        this.start = e.touches ? e.touches[0].clientX : e.clientX;
      }

      onTouchMove(e) {
        if (!this.isDown) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const distance = (this.start - x) * 0.04;
        this.scroll.target = this.scroll.position + distance;
      }

      onTouchUp() {
        this.isDown = false;
        this.onCheck();
      }

      onWheel(e) {
        const delta = e.deltaY || e.wheelDelta;
        this.scroll.target += (delta > 0 ? 1.5 : -1.5) * 0.2;
        this.onCheckDebounce();
      }

      onCheck() {
        if (!this.cards || !this.cards[0]) return;
        const width = this.cards[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
      }

      onResize() {
        this.screen = {
          width: this.container.clientWidth,
          height: this.container.clientHeight
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({ aspect: this.screen.width / this.screen.height });
        
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        
        if (this.cards) {
          this.cards.forEach(card => card.onResize({ screen: this.screen, viewport: this.viewport }));
        }
      }

      update() {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        
        if (this.cards) {
          this.cards.forEach(card => card.update(this.scroll, direction));
        }
        
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = requestAnimationFrame(this.update.bind(this));
      }

      addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);
        
        window.addEventListener('resize', this.boundOnResize);
        this.container.addEventListener('wheel', this.boundOnWheel);
        this.container.addEventListener('mousedown', this.boundOnTouchDown);
        this.container.addEventListener('mousemove', this.boundOnTouchMove);
        this.container.addEventListener('mouseup', this.boundOnTouchUp);
        this.container.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
        this.container.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
        this.container.addEventListener('touchend', this.boundOnTouchUp);
      }

      destroy() {
        // Cancel animation frame first
        if (this.raf) {
          cancelAnimationFrame(this.raf);
          this.raf = null;
        }

        // Remove event listeners
        if (this.boundOnResize) {
          window.removeEventListener('resize', this.boundOnResize);
        }
        if (this.container) {
          this.container.removeEventListener('wheel', this.boundOnWheel);
          this.container.removeEventListener('mousedown', this.boundOnTouchDown);
          this.container.removeEventListener('mousemove', this.boundOnTouchMove);
          this.container.removeEventListener('mouseup', this.boundOnTouchUp);
          this.container.removeEventListener('touchstart', this.boundOnTouchDown);
          this.container.removeEventListener('touchmove', this.boundOnTouchMove);
          this.container.removeEventListener('touchend', this.boundOnTouchUp);
        }

        // Kill ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Dispose WebGL resources properly
        if (this.cards) {
          this.cards.forEach(card => {
            if (card.program && card.program.uniforms && card.program.uniforms.tMap) {
              const texture = card.program.uniforms.tMap.value;
              if (texture && texture.image) {
                texture.image = null;
              }
            }
          });
          this.cards = null;
        }

        // Lose WebGL context to free GPU resources
        if (this.gl) {
          const loseContextExt = this.gl.getExtension('WEBGL_lose_context');
          if (loseContextExt) {
            loseContextExt.loseContext();
          }
        }

        // Clear all references - Let React handle DOM cleanup
        this.planeGeometry = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.gl = null;
        this.container = null;
      }
    }

    appRef.current = new WebGLCarousel(canvasContainerRef.current, projectData[activeTab]);

    return () => {
      if (appRef.current) {
        appRef.current.destroy();
        appRef.current = null;
      }
    };
  }, [activeTab]);

  return (
    <section ref={containerRef} className="min-h-screen bg-white text-black py-20" id="projects-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">Our Projects</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our creative solutions with immersive WebGL effects
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('product')}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === 'product'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black border border-gray-300 hover:border-gray-400'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('service')}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === 'service'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black border border-gray-300 hover:border-gray-400'
            }`}
          >
            Services
          </button>
        </div>

        <div
          ref={canvasContainerRef}
          className="w-full h-[600px] cursor-grab active:cursor-grabbing rounded-2xl bg-gray-100 border-2 border-gray-300 shadow-xl overflow-hidden"
        />

        {/* ✅ FIXED: Explore Projects Button with proper event handling */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleExploreClick}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="relative z-50 px-10 py-3 rounded-full bg-black text-white text-sm md:text-base font-semibold tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors"
          >
            Explore Projects
          </button>
        </div>

        <div className="text-center mt-4 text-gray-500 text-sm">
          Drag or scroll to explore • {projectData[activeTab].length}{' '}
          {activeTab === 'product' ? 'Products' : 'Services'}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
