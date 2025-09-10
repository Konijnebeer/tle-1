import { useState, useEffect, useRef } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Slider from "@radix-ui/react-slider";
import { Textarea } from "./textarea"

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

function CheckboxPopup({ id, onClose }) {
  const [checked, setChecked] = useState(false);

  function handleClose(value) {
    setChecked(value);
    if (value) {
      onClose(id);
    }
  }

  return (
    <div className="bg-white border border-gray-300 p-4 rounded shadow-md relative w-64">
      <div className="font-bold text-black mb-2">📝 Checkbox</div>
      <label className="flex items-center gap-2 cursor-pointer" htmlFor={`checkbox-${id}`}>
        <Checkbox.Root
          id={`checkbox-${id}`}
          checked={checked}
          onCheckedChange={handleClose}
          className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center data-[state=checked]:bg-blue-500"
        >
          <Checkbox.Indicator className="text-black">
            ✓
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className="text-black">I agree to the terms and conditions</span>
      </label>
    </div>
  );
}

function SliderPopup({ id, onClose }) {
  const [value, setValue] = useState([0]);
  const maxVal = 100;

  function handleValueChange(val) {
    setValue(val);
    if (val[0] >= maxVal) {
      onClose(id);
    }
  }

  return (
    <div className="bg-white border border-gray-300 p-4 rounded shadow-md relative w-64">
      <div className="font-bold text-black mb-2">🔊 Volume</div>
      <Slider.Root
        value={value}
        onValueChange={handleValueChange}
        min={0}
        max={maxVal}
        step={1}
        className="w-full h-6 flex items-center"
      >
        <Slider.Track className="bg-gray-200 h-2 rounded w-full">
          <Slider.Range className="bg-blue-500 h-2 rounded" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-blue-500 rounded-full shadow hover:bg-blue-700 focus:outline-none" />
      </Slider.Root>
      <div className="text-sm text-black mt-2">Slide to 100 to close</div>
      <div className="mt-2 text-black text-sm">Value: {value[0]}</div>
    </div>
  );
}

function TextareaPopup({ id, onClose }) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    const newVal = event.target.value;
    setValue(newVal);
    if (newVal.trim().toLowerCase() === "egg") {
      onClose(id);
    }
  }

  return (
    <div className="bg-white border border-gray-300 p-4 rounded shadow-md relative w-64">
      <div className="font-bold text-black mb-2">✏️ Text Box</div>
      <Textarea
        placeholder="Type your message here."
        value={value}
        onChange={handleChange}
        className="w-full h-24 p-2 text-black border rounded"
      />
      <div className="text-sm text-black mt-2">Type "egg" to close</div>
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
    { type: 'image', url: 'Popups/8ball_1.png', width: 350, height: 200 }, // Square
    { type: 'image', url: 'Popups/8ball_2.png', width: 350, height: 200 }, // Landscape
    { type: 'image', url: 'Popups/8ball_3.png', width: 350, height: 200 }, // Wide landscape
    { type: 'image', url: 'Popups/apple.png', width: 250, height: 200 }, // Portrait
    { type: 'image', url: 'Popups/construct.png', width: 450, height: 250 }, // Medium square
    { type: 'image', url: 'Popups/doom.png', width: 300, height: 300 }, // Tall portrait
    { type: 'image', url: 'Popups/you.png', width: 200, height: 200 },
    { type: 'image', url: 'Popups/me.png', width: 500, height: 200 },
    { type: 'image', url: 'Popups/friend.png', width: 200, height: 200 },
    { type: 'image', url: 'Popups/frog.png', width: 250, height: 200 },
    { type: 'image', url: 'Popups/gun.png', width: 250, height: 200 },
    { type: 'image', url: 'Popups/hell.png', width: 250, height: 200 },
    { type: 'image', url: 'Popups/hivemind.png', width: 300, height: 200 },
    { type: 'image', url: 'Popups/holy_cow.png', width: 300, height: 200 },
    { type: 'image', url: 'Popups/mona_lisa.png', width: 300, height: 200 },
    { type: 'image', url: 'Popups/nerd.png', width: 500, height: 200 },
    { type: 'image', url: 'Popups/my_movie.png', width: 200, height: 200 },
    { type: 'image', url: 'Popups/octagon.png', width: 200, height: 200 },
    { type: 'image', url: 'Popups/question.png', width: 400, height: 200 },
    { type: 'image', url: 'Popups/ram.png', width: 400, height: 200 },
    { type: 'image', url: 'Popups/rom.png', width: 500, height: 200 },
    { type: 'image', url: 'Popups/shop.png', width: 350, height: 200 },
    { type: 'image', url: 'Popups/sign.png', width: 200, height: 200 },
    { type: 'image', url: 'Popups/tenna.png', width: 300, height: 200 },
    { type: 'image', url: 'Popups/wizard.png', width: 300, height: 200 },
    { type: 'component', Component: VirusPopup },
    { type: 'component', Component: ErrorPopup },
    { type: 'component', Component: WarningPopup },
    { type: 'component', Component: CheckboxPopup },
    { type: 'component', Component: SliderPopup },
    { type: 'component', Component: TextareaPopup },
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
