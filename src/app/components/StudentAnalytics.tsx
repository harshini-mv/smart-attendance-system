import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, BookOpen, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface AttendanceRecord {
  studentId: string;
  name: string;
  subject: string;
  timestamp: string;
  date: string;
  time: string;
}

interface SubjectStats {
  subject: string;
  present: number;
  total: number;
  percentage: number;
  missed: number;
  classesNeeded: number;
  nextClass?: string;
}

export function StudentAnalytics() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<any>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [subjectStats, setSubjectStats] = useState<SubjectStats[]>([]);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);

  useEffect(() => {
    // Load student data
    const data = localStorage.getItem('studentData');
    if (data) {
      setStudentData(JSON.parse(data));
    }

    // Load attendance records
    const records: AttendanceRecord[] = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    
    // Filter records for current student
    const studentRecords = data ? records.filter(r => r.studentId === JSON.parse(data).studentId) : [];
    setAttendanceRecords(studentRecords);

    // Calculate subject-wise statistics
    const subjectMap = new Map<string, { present: number; total: number }>();
    
    // Mock: Add some total classes for each subject (in production, this would come from faculty setup)
    const mockSubjects = [
      'Data Structures & Algorithms',
      'Database Management',
      'Operating Systems',
      'Computer Networks',
      'Web Development'
    ];

    // Initialize with mock total classes
    mockSubjects.forEach(subject => {
      subjectMap.set(subject, { present: 0, total: 15 }); // Assuming 15 total classes per subject
    });

    // Count present classes
    studentRecords.forEach(record => {
      const existing = subjectMap.get(record.subject) || { present: 0, total: 15 };
      subjectMap.set(record.subject, {
        ...existing,
        present: existing.present + 1
      });
    });

    // Convert to array and calculate percentages
    const stats: SubjectStats[] = Array.from(subjectMap.entries()).map(([subject, data]) => {
      const percentage = (data.present / data.total) * 100;
      const missed = data.total - data.present;
      // Calculate how many more classes needed to reach 75%
      const requiredFor75 = Math.ceil(data.total * 0.75);
      const classesNeeded = Math.max(0, requiredFor75 - data.present);
      
      return {
        subject,
        present: data.present,
        total: data.total,
        percentage,
        missed,
        classesNeeded,
        nextClass: '9/25/2024, 10:00 AM' // Mock next class date
      };
    });

    setSubjectStats(stats);

    // Calculate overall statistics
    const totalPresentClasses = stats.reduce((sum, s) => sum + s.present, 0);
    const totalAllClasses = stats.reduce((sum, s) => sum + s.total, 0);
    const overall = totalAllClasses > 0 ? (totalPresentClasses / totalAllClasses) * 100 : 0;

    setTotalPresent(totalPresentClasses);
    setTotalClasses(totalAllClasses);
    setOverallPercentage(overall);
  }, []);

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getAttendanceBgColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-100';
    if (percentage >= 60) return 'bg-amber-100';
    return 'bg-red-100';
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 75) return 'Good';
    if (percentage >= 60) return 'Warning';
    return 'Low';
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl text-gray-800">Attendance Analytics</h1>
              <p className="text-gray-600">Track your attendance performance</p>
            </div>
          </div>

          {studentData && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-xl">
              <p className="text-indigo-900">
                <span className="text-indigo-600">Student:</span> {studentData.name} ({studentData.studentId})
              </p>
              <p className="text-indigo-900 text-sm">
                {studentData.department} - Batch {studentData.batch} - Section {studentData.section}
              </p>
            </div>
          )}

          {/* Overall Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
                <h3 className="text-gray-700">Overall Attendance</h3>
              </div>
              <p className={`text-4xl mb-1 ${getAttendanceColor(overallPercentage)}`}>
                {overallPercentage.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">
                {totalPresent} / {totalClasses} classes
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-gray-700">Classes Attended</h3>
              </div>
              <p className="text-4xl text-green-600 mb-1">{totalPresent}</p>
              <p className="text-sm text-gray-600">Total present</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                <h3 className="text-gray-700">Status</h3>
              </div>
              <p className={`text-4xl mb-1 ${getAttendanceColor(overallPercentage)}`}>
                {getAttendanceStatus(overallPercentage)}
              </p>
              <p className="text-sm text-gray-600">
                {overallPercentage >= 75 ? 'Keep it up!' : overallPercentage >= 60 ? 'Improve attendance' : 'Critical level'}
              </p>
            </div>
          </div>

          {/* Subject-wise Statistics */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4 text-gray-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Subject-wise Attendance Details
            </h2>
            
            {/* Overall Attendance Alert */}
            {overallPercentage < 75 && (
              <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-amber-900">
                      <span className="text-sm">Your current attendance is <strong>{overallPercentage.toFixed(0)}%</strong>. You need to attend{' '}
                      <strong>{Math.ceil((totalClasses * 0.75) - totalPresent)}</strong> more classes to reach 75%.</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              {subjectStats.map((stat, index) => {
                const bgColor = stat.percentage >= 75 
                  ? 'bg-green-50' 
                  : stat.percentage >= 60 
                  ? 'bg-amber-50' 
                  : 'bg-red-50';
                const borderColor = stat.percentage >= 75 
                  ? 'border-green-200' 
                  : stat.percentage >= 60 
                  ? 'border-amber-200' 
                  : 'border-red-200';
                const textColor = stat.percentage >= 75 
                  ? 'text-green-800' 
                  : stat.percentage >= 60 
                  ? 'text-amber-800' 
                  : 'text-red-800';
                const badgeColor = stat.percentage >= 75 
                  ? 'bg-green-500' 
                  : stat.percentage >= 60 
                  ? 'bg-amber-500' 
                  : 'bg-red-500';
                
                return (
                  <div key={index} className={`${bgColor} border-2 ${borderColor} rounded-xl p-6`}>
                    {/* Subject Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className={`text-lg ${textColor}`}>{stat.subject}</h3>
                      <span className={`${badgeColor} text-white px-3 py-1 rounded-md text-sm`}>
                        {stat.percentage.toFixed(0)}%
                      </span>
                    </div>
                    
                    {/* Statistics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className={`text-sm ${textColor} opacity-75 mb-1`}>Total Classes:</p>
                        <p className={`text-2xl ${textColor}`}>{stat.total}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${textColor} opacity-75 mb-1`}>Attended:</p>
                        <p className={`text-2xl ${textColor}`}>{stat.present}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${textColor} opacity-75 mb-1`}>Missed:</p>
                        <p className={`text-2xl ${textColor}`}>{stat.missed}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${textColor} opacity-75 mb-1`}>Classes Needed:</p>
                        <p className={`text-2xl ${textColor}`}>{stat.classesNeeded}</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-2 mb-4 overflow-hidden">
                      <div
                        className={`${badgeColor} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    
                    {/* Alert Message */}
                    {stat.percentage < 75 && (
                      <div className={`p-3 bg-white bg-opacity-50 rounded-lg border ${borderColor}`}>
                        <p className={`text-sm ${textColor}`}>
                          {stat.percentage >= 60 ? (
                            <>⚠️ You need to attend <strong>{stat.classesNeeded}</strong> more {stat.classesNeeded === 1 ? 'class' : 'classes'} to reach 75% attendance.</>
                          ) : (
                            <>🚨 Critical! You need to attend <strong>{stat.classesNeeded}</strong> more {stat.classesNeeded === 1 ? 'class' : 'classes'} to reach 75% attendance.</>
                          )}
                        </p>
                        {stat.nextClass && (
                          <p className={`text-xs ${textColor} opacity-75 mt-1`}>
                            Next Class: {stat.nextClass}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {stat.percentage >= 75 && (
                      <div className="p-3 bg-white bg-opacity-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800">
                          ✅ Excellent! You have met the 75% attendance requirement.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Attendance Records */}
          <div>
            <h2 className="text-2xl mb-4 text-gray-800">Recent Attendance</h2>
            {attendanceRecords.length > 0 ? (
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm text-indigo-900">Date</th>
                        <th className="px-6 py-3 text-left text-sm text-indigo-900">Time</th>
                        <th className="px-6 py-3 text-left text-sm text-indigo-900">Subject</th>
                        <th className="px-6 py-3 text-left text-sm text-indigo-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {attendanceRecords.slice().reverse().slice(0, 10).map((record, index) => (
                        <tr key={index} className="hover:bg-gray-100 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{record.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{record.subject}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1 w-fit">
                              <CheckCircle className="w-3 h-3" />
                              Present
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No attendance records found</p>
                <p className="text-sm text-gray-500 mt-1">Start marking attendance to see your analytics</p>
              </div>
            )}
          </div>

          {/* Attendance Tips */}
          {overallPercentage < 75 && (
            <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-xl">
              <h3 className="text-lg mb-2 text-amber-900">📚 Attendance Tips</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Maintain at least 75% attendance to avoid academic penalties</li>
                <li>• Set reminders for upcoming classes</li>
                <li>• Inform faculty in advance if you need to miss a class</li>
                <li>• Review your attendance regularly to stay on track</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}