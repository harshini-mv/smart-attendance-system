import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Scan, UserCheck, Loader, AlertCircle, Camera, X, UserCog } from 'lucide-react';

export function StudentBiometric() {
  const navigate = useNavigate();
  const [verificationMethod, setVerificationMethod] = useState<'face' | 'fingerprint' | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [showManualValidation, setShowManualValidation] = useState(false);
  const [manualValidationRequested, setManualValidationRequested] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Cleanup camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        setCameraError('');
        
        // Start scanning animation after camera is ready
        setTimeout(() => {
          performFaceScan();
        }, 2000);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraError('Unable to access camera. Please grant camera permissions.');
      // Fallback to simulated scan
      setTimeout(() => {
        performFaceScan();
      }, 1000);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const performFaceScan = () => {
    // Simulate face detection and recognition (70% success rate for demo)
    setTimeout(() => {
      const success = Math.random() > 0.3;
      stopCamera();
      
      if (success) {
        setVerificationStatus('success');
        localStorage.setItem('biometricVerified', 'true');
        setTimeout(() => {
          navigate('/student/mark-attendance');
        }, 2000);
      } else {
        setVerificationStatus('failed');
        setShowManualValidation(true);
      }
    }, 3000);
  };

  const startVerification = (method: 'face' | 'fingerprint') => {
    setVerificationMethod(method);
    setVerificationStatus('scanning');

    if (method === 'face') {
      startCamera();
    } else {
      // Simulate fingerprint scan (70% success rate for demo)
      setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
          setVerificationStatus('success');
          localStorage.setItem('biometricVerified', 'true');
          setTimeout(() => {
            navigate('/student/mark-attendance');
          }, 2000);
        } else {
          setVerificationStatus('failed');
          setShowManualValidation(true);
        }
      }, 3000);
    }
  };

  const requestManualValidation = () => {
    setManualValidationRequested(true);
    // In a real app, this would notify the teacher
    setTimeout(() => {
      // Simulate teacher approval
      alert('Manual validation request sent to faculty. Please wait for approval.');
    }, 500);
  };

  const retryVerification = () => {
    setVerificationStatus('idle');
    setVerificationMethod(null);
    setShowManualValidation(false);
    setCameraError('');
    stopCamera();
  };

  const simulateTeacherApproval = () => {
    localStorage.setItem('biometricVerified', 'true');
    localStorage.setItem('manuallyApproved', 'true');
    navigate('/student/mark-attendance');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-3xl mb-2 text-gray-800">Biometric Verification</h1>
            <p className="text-gray-600">Choose your preferred verification method</p>
          </div>

          {verificationStatus === 'idle' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Face Scan */}
              <button
                onClick={() => startVerification('face')}
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-xl p-8 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <Scan className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-800">Face Scan</h3>
                  <p className="text-gray-600 text-sm">Verify using facial recognition</p>
                </div>
              </button>

              {/* Fingerprint */}
              <button
                onClick={() => startVerification('fingerprint')}
                className="group bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8 hover:border-purple-400 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Fingerprint className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl mb-2 text-gray-800">Fingerprint</h3>
                  <p className="text-gray-600 text-sm">Verify using fingerprint scanner</p>
                </div>
              </button>
            </div>
          )}

          {/* Manual Verification Option */}
          {verificationStatus === 'idle' && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or</span>
                </div>
              </div>
              
              <button
                onClick={requestManualValidation}
                className="mt-4 w-full bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 hover:border-amber-400 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <UserCog className="w-6 h-6 text-amber-600" />
                  <div className="text-left">
                    <h3 className="text-gray-800">Manual Verification</h3>
                    <p className="text-sm text-gray-600">Request teacher approval if biometric methods fail</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {verificationStatus === 'scanning' && verificationMethod === 'face' && (
            <div className="text-center">
              <div className="relative mb-6">
                {/* Camera View */}
                <div className="relative w-full max-w-md mx-auto aspect-[4/3] bg-gray-900 rounded-2xl overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    placesinline
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Scanning Overlay */}
                  {cameraActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Face detection frame */}
                      <div className="relative w-64 h-80">
                        <div className="absolute inset-0 border-4 border-blue-500 rounded-3xl opacity-80">
                          {/* Corner accents */}
                          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-3xl" />
                          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-3xl" />
                          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-3xl" />
                          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-3xl" />
                        </div>
                        
                        {/* Scanning line animation */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan-line" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Camera error or loading state */}
                  {!cameraActive && !cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
                        <p className="text-white">Activating camera...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={retryVerification}
                  className="absolute top-2 right-2 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <h2 className="text-2xl mb-3 text-gray-800">Scanning Face...</h2>
              <p className="text-gray-600 mb-4">
                {cameraError || 'Please position your face within the frame'}
              </p>
              
              <div className="flex justify-center">
                <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            </div>
          )}

          {verificationStatus === 'scanning' && verificationMethod === 'fingerprint' && (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Fingerprint className="w-16 h-16 text-purple-600 animate-pulse" />
              </div>
              <h2 className="text-2xl mb-3 text-gray-800">Scanning...</h2>
              <p className="text-gray-600">Please place your finger on the scanner</p>
              <div className="mt-6 flex justify-center">
                <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-2xl mb-3 text-green-700">Verification Successful!</h2>
              <p className="text-gray-600">Redirecting to attendance page...</p>
            </div>
          )}

          {verificationStatus === 'failed' && (
            <div className="text-center py-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-16 h-16 text-red-600" />
              </div>
              <h2 className="text-2xl mb-3 text-red-700">Verification Failed</h2>
              <p className="text-gray-600 mb-8">
                {verificationMethod === 'face' ? 'Face recognition failed. ' : 'Fingerprint not recognized. '}
                Please try again or request manual validation.
              </p>

              {showManualValidation && (
                <div className="mb-6 p-6 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h3 className="text-lg mb-2 text-amber-900">Manual Validation Available</h3>
                      <p className="text-amber-700 text-sm mb-4">
                        If biometric verification continues to fail, you can request manual validation from your faculty member.
                      </p>
                      {!manualValidationRequested ? (
                        <button
                          onClick={requestManualValidation}
                          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                        >
                          Request Manual Validation
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-amber-800 text-sm">
                            ✓ Request sent to faculty. Waiting for approval...
                          </p>
                          {/* Demo button - in production this would be triggered by teacher */}
                          <button
                            onClick={simulateTeacherApproval}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            [Demo] Simulate Teacher Approval
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={retryVerification}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Progress Steps */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">✓</span>
              <span className="text-gray-400">→</span>
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">✓</span>
              <span className="text-gray-400">→</span>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                verificationStatus === 'success' ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white'
              }`}>3</span>
              <span className="text-gray-400">→</span>
              <span className="w-8 h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center">4</span>
            </div>
            <div className="flex justify-center gap-8 mt-2 text-xs text-gray-500">
              <span>Signup</span>
              <span>Location</span>
              <span>Biometric</span>
              <span>Attendance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}