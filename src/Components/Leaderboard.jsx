import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, PlusCircle, Gamepad2, Timer, School, User, X, ChevronDown, Camera, Search } from 'lucide-react';

const initialStudents = [
  { id: 1, avatar: null, name: "Aarav Kumar", school: "DPS Patna", age: 14, game: "Puzzle", score: 95, second: 120.5 },
  { id: 2, avatar: null, name: "Sneha Singh", school: "St. Michaels", age: 15, game: "Quiz", score: 95, second: 110.0 },
  { id: 3, avatar: null, name: "Rohan Raj", school: "Notre Dame Academy", age: 13, game: "Treasure Hunt", score: 88, second: 200.0 },
  { id: 4, avatar: null, name: "Priya Sharma", school: "Loyola High", age: 16, game: "Quiz", score: 85, second: 150.2 },
  { id: 5, avatar: null, name: "Vikash Jain", school: "Don Bosco", age: 15, game: "Puzzle", score: 85, second: 155.0 },
  { id: 6, avatar: null, name: "Ananya", school: "St. Joseph's", age: 14, game: "Treasure Hunt", score: 70, second: 180.0 },
];

const games = ["Puzzle", "Quiz", "Treasure Hunt"];

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterGame, setFilterGame] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Backend Integration Ready
  // const API_URL = "http://localhost:5000/api/leaderboard";

  useEffect(() => {
    // Fetch data from backend
    const fetchLeaderboard = async () => {
      try {
        // const res = await fetch(API_URL);
        // if(res.ok) {
        //   const data = await res.json();
        //   setStudents(data);
        // }
        // Using sample data for now:
        setStudents(initialStudents);
      } catch (err) {
        console.error("Error fetching leaderboard data", err);
      }
    };
    fetchLeaderboard();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    school: '',
    age: '',
    game: 'Puzzle',
    score: '',
    second: '',
    avatar: null 
  });

  const fileInputRef = useRef(null);

  const sortedStudents = useMemo(() => {
    let filtered = students;
    if (filterGame !== "All") {
      filtered = filtered.filter(s => s.game === filterGame);
    }

    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(lowerQuery) || 
        s.school.toLowerCase().includes(lowerQuery)
      );
    }

    return [...filtered].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.second - b.second;
    });
  }, [students, filterGame, searchQuery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = {
      id: Date.now(),
      name: formData.name,
      school: formData.school,
      age: parseInt(formData.age, 10),
      game: formData.game,
      score: parseInt(formData.score, 10),
      second: parseFloat(formData.second),
      avatar: formData.avatar
    };
    
    try {
      // Send to Backend
      // const res = await fetch(API_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newStudent),
      // });
      // if (res.ok) {
      //   const savedStudent = await res.json();
      //   setStudents(prev => [...prev, savedStudent]);
      // }
      
      // Simulating backend success locally
      setStudents(prev => [...prev, newStudent]);
      setIsAddModalOpen(false);
      setFormData({ name: '', school: '', age: '', game: 'Puzzle', score: '', second: '', avatar: null });
    } catch (err) {
      console.error("Error saving student data", err);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera or permission denied.");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      // Mirror image fixing since facingMode user mirror video
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/jpeg');
      
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const RankIcon = ({ rank }) => {
    if (rank === 1) return <img src="/1.png" alt="1st Place" className="w-[85%] h-auto object-contain drop-shadow-sm" />;
    if (rank === 2) return <img src="/2.png" alt="2nd Place" className="w-[80%] h-auto object-contain drop-shadow-sm" />;
    if (rank === 3) return <img src="/3.png" alt="3rd Place" className="w-[80%] h-auto object-contain drop-shadow-sm" />;
    return <span className="text-gray-400 font-bold text-lg w-full text-center">{rank}</span>;
  };

  const ShineEffect = () => (
    <motion.div
      className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg] pointer-events-none"
      initial={{ left: '-100%' }}
      animate={{ left: '200%' }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
        delay: 0.5
      }}
    />
  );

  const getRowStyle = (rank) => {
    switch (rank) {
      case 1: // Metallic Gold
        return 'py-5 md:py-6 bg-gradient-to-r from-[#fef3c7] via-[#fde68a] to-[#fef3c7] border-y border-r border-l-4 border-[#d97706] shadow-[0_8px_30px_rgba(217,119,6,0.15)] relative z-10 transform-gpu overflow-hidden';
      case 2: // Metallic Silver
        return 'py-5 md:py-6 bg-gradient-to-r from-[#f1f5f9] via-[#cbd5e1] to-[#f1f5f9] border-y border-r border-l-4 border-[#64748b] shadow-[0_8px_30px_rgba(100,116,139,0.15)] relative z-10 transform-gpu overflow-hidden';
      case 3: // Metallic Bronze
        return 'py-5 md:py-6 bg-gradient-to-r from-[#ffedd5] via-[#fdba74] to-[#ffedd5] border-y border-r border-l-4 border-[#c2410c] shadow-[0_8px_30px_rgba(194,65,12,0.15)] relative z-10 transform-gpu overflow-hidden';
      default:
        return 'py-3 md:py-4 bg-white hover:bg-gray-50 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-l-4 border-l-transparent relative overflow-hidden';
    }
  };

  const ListRow = ({ student, rank }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: rank <= 3 ? 1.02 : 1 }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      className={`group flex flex-wrap md:flex-nowrap items-center justify-between px-4 mb-2 rounded-xl transition-all duration-300 border ${getRowStyle(rank)}`}
    >
      {rank <= 3 && <ShineEffect />}
      <div className="flex items-center gap-4 w-full md:w-auto relative z-10">
        <div className="flex items-center justify-center w-10 md:w-12">
          <RankIcon rank={rank} />
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
           {student.avatar ? (
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
           ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                 <User className="w-5 h-5" />
              </div>
           )}
        </div>
        <div className="flex flex-col ml-2">
          <span className="font-semibold text-gray-900 text-lg">{student.name}</span>
          <span className="text-sm text-gray-500 flex items-center gap-1.5"><School className="w-3.5 h-3.5"/>{student.school}</span>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center px-8 relative z-10">
        <span className="text-sm text-gray-500 flex items-center gap-1.5 px-3 py-1 bg-gray-50/90 rounded-md border border-gray-100">
           <Gamepad2 className="w-4 h-4 text-gray-400"/>
           {student.game}
        </span>
      </div>

      <div className="flex items-center justify-end gap-6 md:gap-8 relative z-10">
         <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Time</span>
            <div className="flex items-center gap-1 text-gray-700 font-medium">
              <Timer className="w-4 h-4 text-gray-400"/> {student.second}s
            </div>
         </div>
         <div className="flex flex-col items-end min-w-[60px]">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Score</span>
            <span className={`text-2xl font-bold ${rank <= 3 ? 'text-gray-900' : 'text-gray-700'}`}>
              {student.score}
            </span>
         </div>
      </div>
    </motion.div>
  );

  return (
    <section id="leaderboard" className="relative w-full py-20 font-sans min-h-screen">
      {/* SVG Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/Bihar Diwas Poster.svg" 
          alt="Bihar Diwas Background" 
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
             e.target.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Emblem_of_Bihar.svg";
             e.target.className = "w-full h-full object-cover opacity-10";
          }}
        />
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      <div className="w-full max-w-[95%] md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minimal Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-8">
          
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8">
            <img src="/bihar1.png" alt="Bihar Logo" className="w-28 md:w-46 h-auto object-contain drop-shadow-sm" />
            
            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-20 bg-gray-300/80 rounded-full"></div>

            <div className="text-center md:text-left pt-2">
              <h1 className="text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight mb-4">
                Event Leaderboard
              </h1>
              <p className="text-gray-600 font-semibold text-lg max-w-[28rem] leading-snug">
                Celebrating Bihar Diwas through interactive games.<br />Check out our top performers below.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto mt-4 md:mt-0">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search participant..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 text-gray-700 py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-0 font-medium transition-colors text-sm"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-48">
              <select 
                value={filterGame} 
                onChange={(e) => setFilterGame(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-10 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-0 font-medium transition-colors cursor-pointer text-sm"
              >
                <option value="All">All Games</option>
                {games.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Score</span>
            </button>
          </div>
        </div>

        {/* Minimal Leaderboard List */}
        <div className="rounded-3xl border border-[#f0ebd8] bg-[#fcfaf5] p-4 md:p-8 shadow-xl shadow-black/5">
          {sortedStudents.length === 0 ? (
            <div className="text-center py-24 text-gray-400 font-medium">
              No participants recorded yet.
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {/* Header row for desktop */}
              <div className="hidden md:flex items-center justify-between px-6 py-3 border-b border-gray-100 mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-64">Participant</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex-1 text-center">Category</span>
                <div className="flex items-center justify-end gap-16 min-w-[150px]">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">Score</span>
                </div>
              </div>

              {/* Rows */}
              {sortedStudents.map((student, index) => (
                <ListRow key={student.id} student={student} rank={index + 1} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Minimalistic Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="bg-white mx-auto rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Participant</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                
                {isCameraOpen ? (
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden bg-black flex items-center shadow-lg border-4 border-amber-500 transform scale-x-[-1]">
                       <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button type="button" onClick={capturePhoto} className="bg-amber-600 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-amber-700 transition-colors">Capture</button>
                      <button type="button" onClick={stopCamera} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-bold hover:bg-gray-300 transition-colors">Cancel</button>
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center mb-6">
                     <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                       {/* Upload Container */}
                       <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="relative w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-amber-400 focus:ring focus:ring-amber-200 transition-all group"
                       >
                          {formData.avatar ? (
                             <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                             <span className="text-xs font-semibold text-gray-400 group-hover:text-amber-600 text-center px-2">Upload Photo</span>
                          )}
                       </div>
                       
                       <span className="text-gray-300 font-bold hidden sm:block">OR</span>
                       
                       {/* Camera Container */}
                       <button type="button" onClick={startCamera} className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg shadow-amber-900/20 text-sm font-semibold hover:from-amber-600 hover:to-amber-700 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95">
                         <Camera className="w-6 h-6" />
                         <span>Take Photo</span>
                       </button>
                     </div>
                     <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-medium text-gray-600">Full Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm" />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-medium text-gray-600">School Name</label>
                    <input required type="text" name="school" value={formData.school} onChange={handleInputChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Age</label>
                    <input required type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Game Type</label>
                    <div className="relative">
                      <select required name="game" value={formData.game} onChange={handleInputChange} className="w-full appearance-none px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm pr-8">
                        {games.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Score</label>
                    <input required type="number" name="score" value={formData.score} onChange={handleInputChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Time Taken (s)</label>
                    <input required step="0.1" type="number" name="second" value={formData.second} onChange={handleInputChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm" />
                  </div>
                </div>

                <div className="mt-8">
                  <button type="submit" className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors text-sm">
                    Submit Result
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Leaderboard;
