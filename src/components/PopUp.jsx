import { useState, useEffect } from "react";

// Simple popup components
function VirusPopup() {
  return (
    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
      <span className="text-white text-xl">🦠</span>
    </div>
  );
}

function ErrorPopup() {
  return (
    <div className="bg-black text-green-400 p-3 font-mono text-sm border border-green-400">
      <div>ERROR</div>
      <div className="text-red-400">VIRUS DETECTED</div>
    </div>
  );
}

function WarningPopup({ id, onClose }) {
  return (
    <div className="bg-yellow-100 border-2 border-yellow-500 p-3 text-yellow-800 relative">
      <button 
        onClick={() => onClose(id)}
        className="absolute top-1 right-1 w-5 h-5 bg-yellow-600 text-white rounded-full text-xs font-bold hover:bg-yellow-700 flex items-center justify-center"
      >
        ×
      </button>
      <div className="font-bold">⚠️ Warning!</div>
      <div>System Alert</div>
    </div>
  );
}

function PopupSystem() {
  const [popups, setPopups] = useState([]);
  const [spawnSpeed, setSpawnSpeed] = useState(2000);
  const [nextId, setNextId] = useState(0);

  // List of different popup types with their natural dimensions
  const popupTypes = [
    { type: 'image', url: 'https://picsum.photos/200/200', width: 200, height: 200 }, // Square
    { type: 'image', url: 'https://picsum.photos/300/200', width: 300, height: 200 }, // Landscape
    { type: 'image', url: 'https://picsum.photos/350/200', width: 350, height: 200 }, // Wide landscape
    { type: 'image', url: 'https://picsum.photos/200/350', width: 200, height: 350 }, // Portrait
    { type: 'image', url: 'https://picsum.photos/250/250', width: 250, height: 250 }, // Medium square
    { type: 'image', url: 'https://picsum.photos/200/300', width: 200, height: 300 }, // Tall portrait
    { type: 'component', Component: VirusPopup },
    { type: 'component', Component: ErrorPopup },
    { type: 'component', Component: WarningPopup },
  ];

  // Create a new popup at random position
  function createPopup() {
    const popup = popupTypes[Math.floor(Math.random() * popupTypes.length)];
    
    // Use popup dimensions for proper positioning, fallback to 200 for components
    const popupWidth = popup.width || 200;
    const popupHeight = popup.height || 200;
    
    const newPopup = {
      id: nextId,
      x: Math.random() * (window.innerWidth - popupWidth),
      y: Math.random() * (window.innerHeight - popupHeight),
      rotation: Math.random() * 20 - 10,
      ...popup
    };
    
    setPopups(prev => [...prev, newPopup]);
    setNextId(prev => prev + 1);
  }

  // Remove a popup
  function removePopup(id) {
    setPopups(prev => prev.filter(popup => popup.id !== id));
  }

  // Keyboard controls
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === '+') {
        setSpawnSpeed(prev => Math.max(200, prev - 300)); // Faster
      } else if (event.key === '-') {
        setSpawnSpeed(prev => Math.min(5000, prev + 300)); // Slower
      } else if (event.key === ' ') {
        event.preventDefault();
        createPopup(); // Spawn now
      } else if (event.key.toLowerCase() === 'c') {
        setPopups([]); // Clear all
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Auto spawn popups
  useEffect(() => {
    const interval = setInterval(createPopup, spawnSpeed);
    return () => clearInterval(interval);
  }, [spawnSpeed, nextId]);

  return (
    <>
      {/* Show each popup */}
      {popups.map((popup) => (
        <div
          key={popup.id}
          className="fixed z-50 hover:scale-110 transition-transform"
          style={{
            left: popup.x + 'px',
            top: popup.y + 'px',
            transform: `rotate(${popup.rotation}deg)`
          }}
        >
          {popup.type === 'image' ? (
            <img
              src={popup.url}
              className="rounded shadow-lg cursor-pointer"
              style={{
                width: popup.width + 'px',
                height: popup.height + 'px'
              }}
              onClick={() => removePopup(popup.id)}
              alt="popup"
            />
          ) : (
            <popup.Component id={popup.id} onClose={removePopup} />
          )}
        </div>
      ))}

      {/* Simple controls display */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded text-sm">
        <div>Speed: {spawnSpeed}ms</div>
        <div>Count: {popups.length}</div>
        <div className="text-xs mt-2">
          <div>+ faster | - slower</div>
          <div>space = spawn | c = clear</div>
        </div>
      </div>
    </>
  );
}

export { PopupSystem };
