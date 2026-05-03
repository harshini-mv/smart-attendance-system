import { useNavigate } from 'react-router-dom';
import { GraduationCap, UserCircle, LogIn, Fingerprint, MapPin, Zap, Shield, CheckCircle, Clock } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Gradient Orbs */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Animated Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-particle-1"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-particle-2"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-pink-400 rounded-full animate-particle-3"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-particle-1"></div>
        
        {/* Floating Feature Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float-slow">
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-2xl backdrop-blur-sm">
            <Fingerprint className="w-8 h-8 text-indigo-400" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-slow animation-delay-1000">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-2xl backdrop-blur-sm">
            <MapPin className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-slow animation-delay-2000">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-2xl backdrop-blur-sm">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float-slow animation-delay-3000">
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 p-4 rounded-2xl backdrop-blur-sm">
            <Zap className="w-8 h-8 text-pink-400" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          {/* App Name with Premium Design */}
          <div className="inline-block mb-6 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white px-10 py-4 rounded-[2rem] shadow-2xl">
              <h1 className="text-5xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                TapNTrack
              </h1>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-2xl text-gray-800">Your Smart Attendance System</p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Secure, Location-Based, and Biometric Verified
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">Real-time Tracking</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span className="text-sm text-gray-700">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-gray-700">Lightning Fast</span>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card - Enhanced */}
          <button
            onClick={() => navigate('/student/signup')}
            className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 border border-white/20 hover:border-indigo-300 hover:scale-[1.02] overflow-hidden"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated Corner Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center">
              {/* Icon with Multiple Layers */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                  <GraduationCap className="w-14 h-14 text-white" />
                </div>
              </div>

              <h2 className="text-3xl mb-3 text-gray-800">Student</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join the future of attendance tracking with biometric verification and real-time updates
              </p>

              {/* Quick Stats */}
              <div className="flex gap-6 mb-6 text-sm">
                <div className="text-center">
                  <div className="text-indigo-600 mb-1">⚡</div>
                  <div className="text-gray-600">Quick</div>
                </div>
                <div className="text-center">
                  <div className="text-indigo-600 mb-1">🔒</div>
                  <div className="text-gray-600">Secure</div>
                </div>
                <div className="text-center">
                  <div className="text-indigo-600 mb-1">📱</div>
                  <div className="text-gray-600">Easy</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full space-y-3">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  Get Started
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/student/login');
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1 w-full py-2 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Already registered? Login
                </button>
              </div>
            </div>
          </button>

          {/* Faculty Card - Enhanced */}
          <button
            onClick={() => navigate('/faculty/login')}
            className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 border border-white/20 hover:border-emerald-300 hover:scale-[1.02] overflow-hidden"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated Corner Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center">
              {/* Icon with Multiple Layers */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                  <UserCircle className="w-14 h-14 text-white" />
                </div>
              </div>

              <h2 className="text-3xl mb-3 text-gray-800">Faculty</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Manage attendance sessions, track student presence, and generate comprehensive reports
              </p>

              {/* Quick Stats */}
              <div className="flex gap-6 mb-6 text-sm">
                <div className="text-center">
                  <div className="text-emerald-600 mb-1">📊</div>
                  <div className="text-gray-600">Analytics</div>
                </div>
                <div className="text-center">
                  <div className="text-emerald-600 mb-1">⏱️</div>
                  <div className="text-gray-600">Real-time</div>
                </div>
                <div className="text-center">
                  <div className="text-emerald-600 mb-1">📈</div>
                  <div className="text-gray-600">Reports</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  Access Portal
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">99.9%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">&lt;2s</div>
            <div className="text-sm text-gray-600">Verification Time</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">24/7</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}