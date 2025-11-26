import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const owner = {
  name: "Nishant Shekhar",
  title: "Founder",
  img: "https://media.licdn.com/dms/image/v2/D4D03AQFUD3EMJW-SMQ/profile-displayphoto-shrink_800_800/B4DZR_Z.U3HkAg-/0/1737304303571?e=1765411200&v=beta&t=az_Mt9zkLGTMIpekhzkDOFWzYy2vAqVdoOsc5KrTelE",
  desc: "Leading the vision and strategy. Nishant ensures our team delivers exceptional results and innovation every day.",
};

const members = [
  {
    role: "React Developer",
    name: "Aditya Kumar",
    img: "https://media.licdn.com/dms/image/v2/D5603AQEk-OM0mDJnkQ/profile-displayphoto-shrink_800_800/B56ZZojkV5GQAg-/0/1745510877242?e=1765411200&v=beta&t=nuHQ2kXeFZfOQdcPCljPptIUW1fR7zhF8a95MS0uiz4",
  },
  {
    role: "React Developer",
    name: "Abhishek Anand",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQHgdEA3WVAhNQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1692214950711?e=1765411200&v=beta&t=_rVEG7UleCcO-VIPbhVJaL1ydgLRXVDiVO3L08BOGAQ",
  },
  {
    role: "React Developer",
    name: "Manish Kumar",
    img: "https://media.licdn.com/dms/image/v2/D5603AQExFwrFWBhafA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702654018781?e=1765411200&v=beta&t=5M3cHkL2k9BGF5uyDEvt-F-z3X3IvepQXLwcLpgB5FA",
  },
  {
    role: "React Developer",
    name: "Aditya Raj ",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQEq17gHXLfK7Q/profile-displayphoto-shrink_800_800/B4DZSRvrVTGcAc-/0/1737611983348?e=1765411200&v=beta&t=0WgrsWrI1E9o2DsWcnmFxKSjtGabEZOP-9WLA3fu8nM",
  },
  
  // new members
  {
    role: "React Developer",
    name: "Pranav Kumar",
    img: "https://media.licdn.com/dms/image/v2/D5603AQGK4D8tOKZuCQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712578935106?e=1765411200&v=beta&t=o66tWWvYtRRiUBevQyzQpl0xbK8lMPRqriX2-vM_EJs",
  },
  {
    role: "Machine Learning",
    name: "Abhinab Kumar",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQGAsH23Z7DMdw/profile-displayphoto-shrink_800_800/B4DZRoT6LpHkAg-/0/1736916838539?e=1765411200&v=beta&t=MYn5a88yPk9-wWzZB4bpNjPrwU8WWt3uMJQIqNB5lJU",
  },
  {
    role: "React Developer",
    name: "Aman Kumar",
    img: "https://media.licdn.com/dms/image/v2/D5603AQEkYJhghVPZ0g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726213256893?e=1765411200&v=beta&t=leMEh7ln0i-brmobrWie4CkHmRyzjLvxpeyoudW7msk",
  },
  {
    role: "React Developer",
    name: "Manish Kumar",
    img: "https://media.licdn.com/dms/image/v2/D4D35AQGE_NRQ-PomEg/profile-framedphoto-shrink_800_800/B4DZkj7yoNIcAg-/0/1757244500804?e=1764136800&v=beta&t=3KPF6fdEra392PCv50fyhtSa6hKs5TfquqUBDoTSSAM",
  },
  {
    role: "Machine Learning",
    name: "Priyanshu Shankar ",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQFXF8LraML_hw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714559521498?e=1765411200&v=beta&t=XRZA9ZBJ98iz8m80hiAOChCxlluuqgnDTBz6gYjrblY",
  },

];


const Team = () => {
  const ownerRef = useRef();
  const imgRefs = useRef([]);
  const containerRefs = useRef([]);
  const floatAnimations = useRef([]);
  const hoverTimeouts = useRef([]);
  const rowRefs = useRef([]);
  const nameRefs = useRef([]);
  const roleRefs = useRef([]);
  const containerRef = useRef();

  const [visibleIdx, setVisibleIdx] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Owner section animation with ScrollTrigger
      if (ownerRef.current) {
        gsap.fromTo(
          ownerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ownerRef.current,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Team members scroll animation with stagger
      rowRefs.current.filter(Boolean).forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            x: -50,
            y: 30
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      });
    }, containerRef);

    // Force refresh when component mounts or updates
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = (idx) => {
    if (nameRefs.current[idx]) {
      gsap.to(nameRefs.current[idx], {
        x: 8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (roleRefs.current[idx]) {
      gsap.to(roleRefs.current[idx], {
        x: 5,
        color: "#1f2937",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    hoverTimeouts.current[idx] = setTimeout(() => {
      setVisibleIdx(idx);

      if (containerRefs.current[idx] && imgRefs.current[idx]) {
        gsap.set(containerRefs.current[idx], {
          visibility: "visible",
          display: "block",
        });

        gsap.to(containerRefs.current[idx], {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.fromTo(
          imgRefs.current[idx],
          {
            opacity: 0,
            scale: 0.85,
            x: -30,
            y: 0,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.5)",
          }
        );

        // Enhanced continuous loop animation
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(imgRefs.current[idx], {
          x: 10,
          y: 15,
          rotation: 2,
          duration: 2.5,
          ease: "sine.inOut",
        })
          .to(imgRefs.current[idx], {
            x: -10,
            y: 10,
            rotation: -1,
            duration: 2.5,
            ease: "sine.inOut",
          })
          .to(imgRefs.current[idx], {
            x: -8,
            y: -12,
            rotation: -2,
            duration: 2.5,
            ease: "sine.inOut",
          })
          .to(imgRefs.current[idx], {
            x: 10,
            y: -10,
            rotation: 1,
            duration: 2.5,
            ease: "sine.inOut",
          });

        floatAnimations.current[idx] = tl;
      }
    }, 700);
  };

  const handleMouseLeave = (idx) => {
    clearTimeout(hoverTimeouts.current[idx]);
    hoverTimeouts.current[idx] = null;

    if (nameRefs.current[idx]) {
      gsap.to(nameRefs.current[idx], {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    if (roleRefs.current[idx]) {
      gsap.to(roleRefs.current[idx], {
        x: 0,
        color: "#374151",
        duration: 0.3,
        ease: "power2.in",
      });
    }

    setVisibleIdx(null);

    if (imgRefs.current[idx]) {
      if (floatAnimations.current[idx]) {
        floatAnimations.current[idx].kill();
        floatAnimations.current[idx] = null;
      }

      gsap.to(containerRefs.current[idx], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (containerRefs.current[idx]) {
            gsap.set(containerRefs.current[idx], {
              visibility: "hidden",
              display: "none",
            });
          }
        },
      });

      gsap.to(imgRefs.current[idx], {
        opacity: 0,
        scale: 0.85,
        x: -30,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10 mb-20 px-4 relative z-10 bg-white" ref={containerRef} id="team-section">
      <div
        ref={ownerRef}
        className="flex items-center gap-7 pb-8 mb-8 border-b border-gray-300 transition-all duration-300 hover:border-gray-400"
      >
        <div className="relative group">
          <img
            src={owner.img}
            alt={owner.name}
            className="w-32 h-40 object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105"
            style={{
              boxShadow: "0 4px 32px rgba(60,60,60,0.08)",
            }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/128x160?text=Owner";
            }}
          />
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-bold tracking-tight mb-1 text-gray-900 transition-colors duration-300 hover:text-gray-700">
            {owner.name}
          </div>
          <div className="italic text-gray-700 text-xl mb-2">{owner.title}</div>
          <div className="text-gray-600 text-base leading-relaxed max-w-[400px]">
            {owner.desc}
          </div>
        </div>
      </div>

      <div className="relative" style={{ overflow: 'visible' }}>
        {members.map((m, i) => (
          <div
            key={i}
            ref={(el) => (rowRefs.current[i] = el)}
            className="relative group"
            style={{ isolation: 'isolate' }}
          >
            <div className="flex items-center gap-4 bg-white py-8 transition-all duration-300 hover:bg-gray-50/50 rounded-lg px-2 -mx-2 relative">
              <div
                ref={(el) => (roleRefs.current[i] = el)}
                className="w-[30%] text-base md:text-lg italic text-gray-700 flex-shrink-0 transition-all duration-300 self-end pb-2"
              >
                {m.role}
              </div>
              <div
                className="flex-1 relative"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <span
                  ref={(el) => (nameRefs.current[i] = el)}
                  className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 inline-block transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {m.name}
                </span>
              </div>
            </div>

            {i !== members.length - 1 && (
              <div className="flex justify-center">
                <div className="w-[90%] h-[1.5px] bg-gray-300 transition-all duration-300 group-hover:bg-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fixed position container for all images - positioned far to the right */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 9999,
          top: 0,
          right: '18%',
          bottom: 0,
          width: '280px',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {members.map((m, i) => (
          <div
            key={i}
            ref={(el) => (containerRefs.current[i] = el)}
            className="absolute"
            style={{
              visibility: "hidden",
              opacity: 0,
              display: "none",
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <img
              ref={(el) => (imgRefs.current[i] = el)}
              src={m.img}
              alt={m.name}
              className="w-56 h-72 object-cover rounded-xl shadow-2xl"
              style={{
                opacity: 0,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/224x288?text=${m.name.replace(
                  " ",
                  "+"
                )}`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
