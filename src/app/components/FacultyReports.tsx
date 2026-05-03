import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Users, CheckCircle, XCircle, TrendingUp, Calendar, Filter } from 'lucide-react';

interface AttendanceRecord {
  studentId: string;
  name: string;
  subject: string;
  timestamp: string;
  date: string;
  time: string;
}

export function FacultyReports() {
  const navigate = useNavigate();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [sessionData, setSessionData] = useState<any>(null);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Load attendance records
    const records = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    setAttendanceRecords(records);

    // Load session data
    const session = localStorage.getItem('activeSession');
    if (session) {
      setSessionData(JSON.parse(session));
    }
  }, []);

  const filteredRecords = attendanceRecords.filter(record => record.date === new Date(filterDate).toLocaleDateString());

  // Calculate statistics
  const totalStudents = 60; // Mock total students in class
  const presentStudents = filteredRecords.length;
  const absentStudents = totalStudents - presentStudents;
  const attendancePercentage = ((presentStudents / totalStudents) * 100).toFixed(1);

  const downloadReport = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Subject', 'Date', 'Time', 'Status'].join(','),
      ...filteredRecords.map(record => 
        [record.studentId, record.name, record.subject, record.date, record.time, 'Present'].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${filterDate}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/faculty/setup')}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Setup
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Logout
          </button>
        </div>

        <h1 className="text-3xl mb-6 text-gray-800">Attendance Reports & Analytics</h1>

        {/* Session Info Card */}
        {sessionData && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl">Active Session</h2>
                <p className="text-emerald-100">{sessionData.subject}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-emerald-100">Department</p>
                <p>{sessionData.department}</p>
              </div>
              <div>
                <p className="text-emerald-100">Batch & Section</p>
                <p>{sessionData.batch} - {sessionData.section}</p>
              </div>
              <div>
                <p className="text-emerald-100">Classroom</p>
                <p>{sessionData.classroom}</p>
              </div>
              <div>
                <p className="text-emerald-100">Time</p>
                <p>{sessionData.startTime} - {sessionData.endTime}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-2xl text-blue-600">{totalStudents}</span>
            </div>
            <p className="text-gray-600">Total Students</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl text-green-600">{presentStudents}</span>
            </div>
            <p className="text-gray-600">Present</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-red-600" />
              <span className="text-2xl text-red-600">{absentStudents}</span>
            </div>
            <p className="text-gray-600">Absent</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <span className="text-2xl text-purple-600">{attendancePercentage}%</span>
            </div>
            <p className="text-gray-600">Attendance Rate</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl text-gray-800">Attendance Records</h2>
            <p className="text-gray-600 text-sm">
              Showing {filteredRecords.length} records for {new Date(filterDate).toLocaleDateString()}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.studentId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 rounded-full bg-green-100 text-green-800">
                          Present
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No attendance records found for this date
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Charts Placeholder */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg mb-4 text-gray-800">Weekly Attendance Trend</h3>
            <div className="h-48 flex items-end justify-around gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
                const height = 60 + Math.random() * 40;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-600">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg mb-4 text-gray-800">Department-wise Statistics</h3>
            <div className="space-y-4">
              {['Computer Science', 'Electronics', 'Mechanical'].map((dept, index) => {
                const percentage = 75 + Math.random() * 20;
                return (
                  <div key={dept}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">{dept}</span>
                      <span className="text-sm text-gray-600">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
