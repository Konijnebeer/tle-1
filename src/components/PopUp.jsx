import { useState, useEffect, useRef } from "react";

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
  const [isPaused, setIsPaused] = useState(false);
  const [closedCount, setClosedCount] = useState(0);
  const popupRef = useRef(popups);

  useEffect(() => {
    popupRef.current = popups;
  }, [popups]);

  // List of different popup types with their natural dimensions
  const popupTypes = [
    { type: 'image', url: 'Popups/8ball_1.png', width: 402, height: 120 }, // 8ball_1.png
  { type: 'image', url: 'Popups/8ball_2.png', width: 432, height: 120 }, // 8ball_2.png
  { type: 'image', url: 'Popups/8ball_3.png', width: 326, height: 120 }, // 8ball_3.png
  { type: 'image', url: 'Popups/apple.png', width: 255, height: 120 }, // apple.png
  { type: 'image', url: 'Popups/construct.png', width: 447, height: 120 }, // construct.png
  { type: 'image', url: 'Popups/doom.png', width: 290, height: 120 }, // doom.png
  { type: 'image', url: 'Popups/you.png', width: 171, height: 83 }, // you.png
  { type: 'image', url: 'Popups/me.png', width: 512, height: 120 }, // me.png
  { type: 'image', url: 'Popups/friend.png', width: 216, height: 120 }, // friend.png
  { type: 'image', url: 'Popups/frog.png', width: 265, height: 120 }, // frog.png
  { type: 'image', url: 'Popups/gun.png', width: 239, height: 120 }, // gun.png
  { type: 'image', url: 'Popups/hell.png', width: 266, height: 120 }, // hell.png
  { type: 'image', url: 'Popups/hivemind.png', width: 303, height: 120 }, // hivemind.png
  { type: 'image', url: 'Popups/holy_cow.png', width: 150, height: 120 }, // holy_cow.png
  { type: 'image', url: 'Popups/mona_lisa.png', width: 272, height: 120 }, // mona_lisa.png
  { type: 'image', url: 'Popups/nerd.png', width: 490, height: 120 }, // nerd.png
  { type: 'image', url: 'Popups/my_movie.png', width: 171, height: 120 }, // my_movie.png
  { type: 'image', url: 'Popups/octagon.png', width: 201, height: 120 }, // octagon.png
  { type: 'image', url: 'Popups/question.png', width: 463, height: 120 }, // question.png
  { type: 'image', url: 'Popups/ram.png', width: 397, height: 120 }, // ram.png
  { type: 'image', url: 'Popups/rom.png', width: 566, height: 120 }, // rom.png
  { type: 'image', url: 'Popups/shop.png', width: 325, height: 120 }, // shop.png
  { type: 'image', url: 'Popups/sign.png', width: 201, height: 120 }, // sign.png
  { type: 'image', url: 'Popups/tenna.png', width: 314, height: 120 }, // tenna.png
  { type: 'image', url: 'Popups/wizard.png', width: 285, height: 120 }, // wizard.png
  { type: 'component', Component: VirusPopup },
  { type: 'component', Component: ErrorPopup },
  { type: 'component', Component: WarningPopup },
  ];

  // Create a new popup at random position
  function createPopup() {
    const popupLimit = 50;
    if (popupRef.current.length >= popupLimit) return;
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
    setPopups(prev => {
      const updated = prev.filter(popup => popup.id !== id);
      return updated;
    });
    setClosedCount(prev => prev + 1);
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
      } else if (event.key.toLowerCase() === 'p') {
        setIsPaused(prev => !prev); // Toggle pause
      } else if (event.key.toLowerCase() === 'r') {
        setClosedCount(0); // Reset counter
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Auto spawn popups (only when not paused)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(createPopup, spawnSpeed);
    return () => clearInterval(interval);
  }, [spawnSpeed, nextId, isPaused]);

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
        <div className="flex items-center gap-2">
          <span>Status:</span>
          <span className={isPaused ? 'text-red-400' : 'text-green-400'}>
            {isPaused ? 'PAUSED' : 'RUNNING'}
          </span>
        </div>
        <div>Speed: {spawnSpeed}ms</div>
        <div>Active: {popups.length}</div>
        <div className="text-green-400">Closed: {closedCount}</div>
        <div className="text-xs mt-2 space-y-1">
          <div>+ faster | - slower</div>
          <div>p = pause | space = spawn</div>
          <div>c = clear | r = reset counter</div>
        </div>
      </div>
    </>
  );
}

export { PopupSystem };
