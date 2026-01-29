import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { RefreshCw, AlertCircle, Camera, Loader2, X } from 'lucide-react';

interface ScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: any) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [cameras, setCameras] = useState<any[]>([]);
  const [activeCameraId, setActiveCameraId] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const initializedRef = useRef(false);
  const hasDecodedRef = useRef(false);
  const containerId = "reader-custom-view";

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;
    // 1. Initialize the scanner instance
    // formatsToSupport must be passed in the constructor configuration
    const html5QrCode = new Html5Qrcode(containerId, {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.EAN_13,
      ],
      verbose: false
    });
    scannerRef.current = html5QrCode;

    // 2. Fetch Cameras
    const initializeCamera = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          setCameras(devices);
          // Prefer back camera (environment)
          const backCamera = devices.find(device => 
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('environment')
          );
          const cameraId = backCamera ? backCamera.id : devices[0].id;
          setActiveCameraId(cameraId);
          startScanning(html5QrCode, cameraId);
        } else {
          setPermissionError("No cameras found on this device.");
        }
      } catch (err) {
        setPermissionError("Camera access denied. Please allow permissions.");
      }
    };

    initializeCamera();

    // 3. Cleanup on unmount
    return () => {
      initializedRef.current = false;
      hasDecodedRef.current = false;
      if (html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
        }).catch(err => console.error("Failed to stop scanner", err));
      } else {
          html5QrCode.clear();
      }
    };
  }, []);

  const startScanning = async (scanner: Html5Qrcode, cameraId: string) => {
    try {
        await scanner.start(
            cameraId,
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1, // Square aspect ratio usually fits better in UI
            },
            (decodedText) => {
                // Success
                if (hasDecodedRef.current) return;
                hasDecodedRef.current = true;
                scanner.stop().then(() => {
                     setIsScanning(false);
                     onScanSuccess(decodedText);
                });
            },
            (errorMessage) => {
                // Ignore frame parse errors
            }
        );
        setIsScanning(true);
        setPermissionError(null);
    } catch (err) {
        console.error("Error starting scanner", err);
        setPermissionError("Failed to start video stream.");
        setIsScanning(false);
    }
  };

  const handleSwitchCamera = () => {
    if (!scannerRef.current || cameras.length < 2 || !activeCameraId) return;

    const currentIndex = cameras.findIndex(c => c.id === activeCameraId);
    const nextIndex = (currentIndex + 1) % cameras.length;
    const nextCameraId = cameras[nextIndex].id;

    scannerRef.current.stop().then(() => {
        setActiveCameraId(nextCameraId);
        startScanning(scannerRef.current!, nextCameraId);
    });
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] bg-black rounded-2xl overflow-hidden flex flex-col items-center justify-center">
      
      {/* The Container for Html5Qrcode */}
      <div id={containerId} className="w-full h-full object-cover"></div>

      {/* Permission Error State */}
      {permissionError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center z-20">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Camera Access Required</h3>
            <p className="text-gray-400 text-sm mb-4">{permissionError}</p>
            <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100"
            >
                Reload Page
            </button>
        </div>
      )}

      {/* Loading State */}
      {!isScanning && !permissionError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-20">
              <Loader2 className="h-10 w-10 animate-spin text-brand-500 mb-4" />
              <p className="text-sm text-gray-400">Initializing Camera...</p>
          </div>
      )}

      {/* Custom Overlay (Only visible when scanning) */}
      {isScanning && (
        <>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                {/* Scan Frame */}
                <div className="relative w-64 h-64 border border-white/20 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                    
                    {/* Corner Markers */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brand-500 rounded-tl-sm -ml-[2px] -mt-[2px]"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brand-500 rounded-tr-sm -mr-[2px] -mt-[2px]"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brand-500 rounded-bl-sm -ml-[2px] -mb-[2px]"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brand-500 rounded-br-sm -mr-[2px] -mb-[2px]"></div>

                    {/* Scanning Laser Line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-brand-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-scan-line"></div>
                </div>
            </div>

            {/* Camera Controls */}
            {cameras.length > 1 && (
                <div className="absolute bottom-6 z-30">
                    <button 
                        onClick={handleSwitchCamera}
                        className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-black/60 transition-all active:scale-95"
                    >
                        <RefreshCw size={16} />
                        <span className="text-xs font-medium">Switch Camera</span>
                    </button>
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default Scanner;
