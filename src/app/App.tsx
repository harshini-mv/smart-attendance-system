import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { StudentSignup } from './components/StudentSignup';
import { StudentLogin } from './components/StudentLogin';
import { StudentGeolocation } from './components/StudentGeolocation';
import { StudentBiometric } from './components/StudentBiometric';
import { StudentMarkAttendance } from './components/StudentMarkAttendance';
import { StudentAnalytics } from './components/StudentAnalytics';
import { FacultyLogin } from './components/FacultyLogin';
import { FacultySetup } from './components/FacultySetup';
import { FacultyReports } from './components/FacultyReports';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/geolocation" element={<StudentGeolocation />} />
          <Route path="/student/biometric" element={<StudentBiometric />} />
          <Route path="/student/mark-attendance" element={<StudentMarkAttendance />} />
          <Route path="/student/analytics" element={<StudentAnalytics />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/faculty/setup" element={<FacultySetup />} />
          <Route path="/faculty/reports" element={<FacultyReports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}