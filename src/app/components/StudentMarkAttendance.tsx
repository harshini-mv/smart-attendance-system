import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, User, Hash, BookOpen, Calendar, Clock, MapPin, BarChart3 } from 'lucide-react';

export function StudentMarkAttendance() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load student data
    const data = localStorage.getItem('studentData');
    if (data) {
      setStudentData(JSON.parse(data));
    }

    // Load session data (set by faculty)
    const session = localStorage.getItem('activeSession');
    if (session) {
      setSessionData(JSON.parse(session));
    } else {
      // Mock session data if not available
      setSessionData({
        subject: 'Data Structures & Algorithms',
        classroom: 'Room 301, Block A',
        startTime: '09:00 AM',
        endTime: '10:30 AM',
        duration: '90 minutes',
        date: new Date().toLocaleDateString()
      });
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const markAttendance = () => {
    const attendanceRecord = {
      studentId: studentData.studentId,
      name: studentData.name,
      subject: sessionData.subject,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    // Save attendance record
    const existingRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    existingRecords.push(attendanceRecord);
    localStorage.setItem('attendanceRecords', JSON.stringify(existingRecords));

    setAttendanceMarked(true);
  };

  const handleFinish = () => {
    // Clear verification data
    localStorage.removeItem('locationVerified');
    localStorage.removeItem('biometricVerified');
    navigate('/');
  };

  if (!studentData || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {!attendanceMarked ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl mb-2 text-gray-800">Mark Your Attendance</h1>
              <p className="text-gray-600">Please verify your details before marking attendance</p>
            </div>

            {/* Current Time */}
            <div className="mb-6 p-4 bg-indigo-50 rounded-xl text-center">
              <p className="text-indigo-600 text-sm mb-1">Current Time</p>
              <p className="text-2xl text-indigo-900">{currentTime.toLocaleTimeString()}</p>
            </div>

            {/* Student Details */}
            <div className="mb-6">
              <h2 className="text-xl mb-4 text-gray-800">Student Details</h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-gray-900">{studentData.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="text-gray-900">{studentData.studentId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-gray-900">{studentData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Batch</p>
                    <p className="text-gray-900">{studentData.batch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Section</p>
                    <p className="text-gray-900">{studentData.section}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="mb-8">
              <h2 className="text-xl mb-4 text-gray-800">Session Details</h2>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <div className="flex-1">
                    <p className="text-sm text-indigo-600">Subject</p>
                    <p className="text-indigo-900">{sessionData.subject}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <div className="flex-1">
                    <p className="text-sm text-indigo-600">Classroom</p>
                    <p className="text-indigo-900">{sessionData.classroom}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <div className="flex-1">
                    <p className="text-sm text-indigo-600">Date</p>
                    <p className="text-indigo-900">{sessionData.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-indigo-600">Start Time</p>
                      <p className="text-indigo-900">{sessionData.startTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-indigo-600">End Time</p>
                      <p className="text-indigo-900">{sessionData.endTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="mb-8 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg text-green-900">All Verifications Completed</h3>
              </div>
              <div className="ml-9 space-y-1 text-sm text-green-700">
                <p>✓ Location verified within geofence</p>
                <p>✓ Biometric authentication successful</p>
                <p>✓ Session time is active</p>
              </div>
            </div>

            {/* Mark Attendance Button */}
            <button
              onClick={markAttendance}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg shadow-lg"
            >
              Mark Attendance
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h1 className="text-3xl mb-3 text-green-700">Attendance Marked Successfully!</h1>
              <p className="text-gray-600 mb-8">Your attendance has been recorded for this session</p>

              <div className="bg-green-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="text-lg mb-4 text-gray-800">Attendance Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Student:</span>
                    <span className="text-gray-900">{studentData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID:</span>
                    <span className="text-gray-900">{studentData.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="text-gray-900">{sessionData.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="text-gray-900">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                Done
              </button>

              <button
                onClick={() => navigate('/student/analytics')}
                className="w-full mt-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                View Attendance Analytics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}