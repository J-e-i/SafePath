// "use client";

// import { useState } from "react";
// import Button from "./ui/Button";
// import Modal from "./ui/Modal";

// export default function SOSButton() {
//   const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
//   const [isActivated, setIsActivated] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.warn("Location access denied:", error.message);
//         }
//       );
//     }
//   };

//   const handleSOSClick = () => {
//     setIsSOSModalOpen(true);
//     setIsActivated(true);
//     getCurrentLocation();
//     setTimeout(() => setIsActivated(false), 2000);
//   };

//   const handleEmergencyCall = () => {
//     window.location.href = "tel:9092739875";
//   };

//   const handleShareLocation = () => {
//     if (currentLocation) {
//       const locationUrl = `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
//       if (navigator.share) {
//         navigator.share({
//           title: "Emergency Location",
//           text: "I need help! My current location:",
//           url: locationUrl,
//         });
//       } else {
//         navigator.clipboard.writeText(`Emergency! My location: ${locationUrl}`);
//         alert("Location copied to clipboard");
//       }
//     }
//   };

//   const handleAlertContacts = () => {
//     const message = currentLocation
//       ? `EMERGENCY ALERT! I need help at: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`
//       : "EMERGENCY ALERT! I need help immediately!";

//     if (navigator.share) {
//       navigator.share({
//         title: "Emergency Alert",
//         text: message,
//       });
//     } else {
//       navigator.clipboard.writeText(message);
//       alert("Emergency message copied to clipboard");
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={handleSOSClick}
//         className={`fixed bottom-24 right-4 w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 ${
//           isActivated ? "animate-pulse scale-110" : "hover:scale-105"
//         }`}
//       >
//         <i className="ri-alarm-warning-fill text-2xl"></i>
//       </button>

//       <Modal
//         isOpen={isSOSModalOpen}
//         onClose={() => setIsSOSModalOpen(false)}
//         title="Emergency SOS"
//         maxWidth="sm"
//       >
//         <div className="space-y-4">
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
//                 <i className="ri-alarm-warning-line text-white"></i>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-red-900">
//                   Emergency Alert Activated
//                 </h3>
//                 <p className="text-sm text-red-700">
//                   Choose your emergency action below
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3">
//             <Button
//               onClick={handleEmergencyCall}
//               variant="danger"
//               className="w-full flex items-center justify-center space-x-2"
//             >
//               <i className="ri-phone-line"></i>
//               <span>Call Emergency Services (100)</span>
//             </Button>

//             <Button
//               onClick={handleShareLocation}
//               variant="outline"
//               className="w-full flex items-center justify-center space-x-2 border-red-300 text-red-600 hover:bg-red-50"
//             >
//               <i className="ri-map-pin-line"></i>
//               <span>Send Current GPS Location</span>
//             </Button>

//             <Button
//               onClick={handleAlertContacts}
//               variant="outline"
//               className="w-full flex items-center justify-center space-x-2 border-red-300 text-red-600 hover:bg-red-50"
//             >
//               <i className="ri-contacts-line"></i>
//               <span>Alert Emergency Contacts</span>
//             </Button>
//           </div>

//           {currentLocation && (
//             <div className="bg-gray-50 rounded-lg p-3">
//               <p className="text-sm text-gray-600">
//                 <strong>Current Location:</strong>
//                 <br />
//                 {currentLocation.lat.toFixed(6)},{" "}
//                 {currentLocation.lng.toFixed(6)}
//               </p>
//             </div>
//           )}

//           <div className="pt-4 border-t">
//             <Button
//               onClick={() => setIsSOSModalOpen(false)}
//               variant="secondary"
//               className="w-full"
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }

'use client';

import { useState } from 'react';
import Button from './ui/Button';
import Modal from './ui/Modal';

export default function SOSButton() {
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Location access denied:', error.message);
        }
      );
    }
  };

  const handleSOSClick = () => {
    setIsSOSModalOpen(true);
    setIsActivated(true);
    getCurrentLocation();
    setTimeout(() => setIsActivated(false), 2000);
  };

  const handleEmergencyCall = () => {
    const emergencyNumber = '909273';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    window.alert(
      `Calling Emergency Number (${emergencyNumber})...\nTap the green button in your dialer to proceed.` +
      (!isMobile ? '\n\n[Warning: This device may not support phone calls!]' : '')
    );

    window.open(`tel:${emergencyNumber}`, '_self');
  };

  const handleShareLocation = () => {
    if (currentLocation) {
      const locationUrl = `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
      if (navigator.share) {
        navigator.share({
          title: 'Emergency Location',
          text: 'I need help! My current location:',
          url: locationUrl
        });
      } else {
        navigator.clipboard.writeText(`Emergency! My location: ${locationUrl}`);
        alert('Location copied to clipboard');
      }
    }
  };

  const handleAlertContacts = () => {
    const message = currentLocation 
      ? `EMERGENCY ALERT! I need help at: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`
      : 'EMERGENCY ALERT! I need help immediately!';
    
    if (navigator.share) {
      navigator.share({
        title: 'Emergency Alert',
        text: message
      });
    } else {
      navigator.clipboard.writeText(message);
      alert('Emergency message copied to clipboard');
    }
  };

  const handleMasterSOS = () => {
    handleEmergencyCall();
    handleShareLocation();
    handleAlertContacts();
    alert("🚨 Panic triggered! Emergency actions initiated.");
  };

  return (
    <>
      <button
        onClick={handleSOSClick}
        className={`fixed bottom-24 right-4 w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 ${
          isActivated ? 'animate-pulse scale-110' : 'hover:scale-105'
        }`}
      >
        <i className="ri-alarm-warning-fill text-2xl"></i>
      </button>

      <Modal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        title="Emergency SOS"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <i className="ri-alarm-warning-line text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-red-900">Emergency Alert Activated</h3>
                <p className="text-sm text-red-700">Choose your emergency action below</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleEmergencyCall}
              variant="danger"
              className="w-full flex items-center justify-center space-x-2"
            >
              <i className="ri-phone-line"></i>
              <span>Call Emergency Services (911)</span>
            </Button>

            <Button
              onClick={handleShareLocation}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              <i className="ri-map-pin-line"></i>
              <span>Send Current GPS Location</span>
            </Button>

            <Button
              onClick={handleAlertContacts}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              <i className="ri-contacts-line"></i>
              <span>Alert Emergency Contacts</span>
            </Button>

            <Button
              onClick={handleMasterSOS}
              variant="danger"
              className="w-full flex items-center justify-center space-x-2 mt-2 font-bold text-lg"
            >
              <i className="ri-error-warning-line"></i>
              <span>Panic Button – Trigger All</span>
            </Button>
          </div>

          {currentLocation && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                <strong>Current Location:</strong><br/>
                {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
              </p>
            </div>
          )}

          <div className="pt-4 border-t">
            <Button
              onClick={() => setIsSOSModalOpen(false)}
              variant="secondary"
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}