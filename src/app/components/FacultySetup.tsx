import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, BookOpen, MapPin, Clock, Calendar, PlayCircle } from 'lucide-react';

export function FacultySetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    department: '',
    batch: '',
    section: '',
    subject: '',
    classroom: '',
    startTime: '',
    endTime: '',
    duration: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.batch) newErrors.batch = 'Batch is required';
    if (!formData.section) newErrors.section = 'Section is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.classroom) newErrors.classroom = 'Classroom is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate and set geofence based on classroom
    const geofenceData = {
      lat: 40.7128 + Math.random() * 0.01, // Mock coordinates
      lng: -74.0060 + Math.random() * 0.01,
      radius: 50,
      classroom: formData.classroom
    };

    // Save session data
    const sessionData = {
      ...formData,
      geofence: geofenceData,
      active: true,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('activeSession', JSON.stringify(sessionData));
    localStorage.setItem('geofenceData', JSON.stringify(geofenceData));

    // Navigate to reports
    navigate('/faculty/reports');
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl text-gray-800">Setup Attendance Session</h1>
          <button
            onClick={() => navigate('/faculty/reports')}
            className="px-4 py-2 text-emerald-600 hover:text-emerald-700"
          >
            View Reports
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Class Information */}
            <div>
              <h2 className="text-xl mb-4 text-gray-800 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                Class Information
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-gray-700">Department</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select Department</option>
                      <option value="CSE">Computer Science</option>
                      <option value="ECE">Electronics</option>
                      <option value="ME">Mechanical</option>
                      <option value="CE">Civil</option>
                      <option value="EE">Electrical</option>
                    </select>
                  </div>
                  {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Batch</label>
                  <input
                    type="text"
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="2024"
                  />
                  {errors.batch && <p className="mt-1 text-sm text-red-500">{errors.batch}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                  {errors.section && <p className="mt-1 text-sm text-red-500">{errors.section}</p>}
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div>
              <h2 className="text-xl mb-4 text-gray-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                Session Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block mb-2 text-gray-700">Subject Name</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Data Structures & Algorithms"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-gray-700">Classroom Number</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.classroom}
                      onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., Room 301, Block A"
                    />
                  </div>
                  {errors.classroom && <p className="mt-1 text-sm text-red-500">{errors.classroom}</p>}
                  <p className="mt-1 text-sm text-gray-500">Geofence will be automatically set for this location</p>
                </div>
              </div>
            </div>

            {/* Time Settings */}
            <div>
              <h2 className="text-xl mb-4 text-gray-800 flex items-center gap-2">
                <Clock className="w-6 h-6 text-emerald-600" />
                Time Settings
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-gray-700">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="90"
                  />
                  {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  {errors.startTime && <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  {errors.endTime && <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              <PlayCircle className="w-6 h-6" />
              Start Attendance Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
