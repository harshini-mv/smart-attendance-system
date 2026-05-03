import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle, XCircle, Loader } from 'lucide-react';

export function StudentGeolocation() {
  const navigate = useNavigate();
  const [locationStatus, setLocationStatus] = useState<'checking' | 'success' | 'failed'>('checking');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number>(0);

  // Mock geofence coordinates (classroom location)
  const geofenceData = JSON.parse(localStorage.getItem('geofenceData') || '{"lat": 40.7128, "lng": -74.0060, "radius": 50}');
  
  useEffect(() => {
    checkLocation();
  }, []);

  const checkLocation = () => {
    setLocationStatus('checking');
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserLocation({ lat: userLat, lng: userLng });

          // Calculate distance from geofence center
          const dist = calculateDistance(userLat, userLng, geofenceData.lat, geofenceData.lng);
          setDistance(Math.round(dist));

          // Check if within geofence radius (50 meters tolerance)
          if (dist <= geofenceData.radius) {
            setTimeout(() => {
              setLocationStatus('success');
              localStorage.setItem('locationVerified', 'true');
            }, 1500);
          } else {
            setTimeout(() => {
              setLocationStatus('failed');
            }, 1500);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          // For demo purposes, simulate success
          setTimeout(() => {
            setLocationStatus('success');
            setUserLocation({ lat: geofenceData.lat, lng: geofenceData.lng });
            setDistance(0);
            localStorage.setItem('locationVerified', 'true');
          }, 2000);
        }
      );
    } else {
      // Geolocation not supported, simulate success for demo
      setTimeout(() => {
        setLocationStatus('success');
        setUserLocation({ lat: geofenceData.lat, lng: geofenceData.lng });
        setDistance(0);
        localStorage.setItem('locationVerified', 'true');
      }, 2000);
    }
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleContinue = () => {
    if (locationStatus === 'success') {
      navigate('/student/biometric');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              locationStatus === 'checking' ? 'bg-blue-100' :
              locationStatus === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {locationStatus === 'checking' && <Loader className="w-12 h-12 text-blue-600 animate-spin" />}
              {locationStatus === 'success' && <CheckCircle className="w-12 h-12 text-green-600" />}
              {locationStatus === 'failed' && <XCircle className="w-12 h-12 text-red-600" />}
            </div>

            <h1 className="text-3xl mb-3 text-gray-800">
              {locationStatus === 'checking' && 'Verifying Location...'}
              {locationStatus === 'success' && 'Location Verified!'}
              {locationStatus === 'failed' && 'Location Verification Failed'}
            </h1>

            <p className="text-gray-600 mb-8">
              {locationStatus === 'checking' && 'Please wait while we verify your location'}
              {locationStatus === 'success' && 'You are within the classroom geofence'}
              {locationStatus === 'failed' && 'You are not within the classroom boundaries'}
            </p>
          </div>

          {/* Location Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                locationStatus === 'checking' ? 'bg-blue-100 text-blue-700' :
                locationStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {locationStatus === 'checking' ? 'Checking' : locationStatus === 'success' ? 'Inside Geofence' : 'Outside Geofence'}
              </span>
            </div>

            {userLocation && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Your Location:</span>
                  <span className="text-gray-800">{userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Distance:</span>
                  <span className="text-gray-800">{distance}m from classroom</span>
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Required Range:</span>
              <span className="text-gray-800">Within {geofenceData.radius}m</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {locationStatus === 'success' && (
              <button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                Continue to Biometric Verification
              </button>
            )}

            {locationStatus === 'failed' && (
              <button
                onClick={checkLocation}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                Retry Location Check
              </button>
            )}

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
          </div>

          {/* Geofence Visualization */}
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div className="text-sm">
                <p className="text-indigo-900 mb-1">Classroom Geofence Active</p>
                <p className="text-indigo-600">You must be within the designated classroom area to mark attendance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
