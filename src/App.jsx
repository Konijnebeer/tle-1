import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const images = [
  'Popups/you.png',
  'Popups/me.png',
  'Popups/8ball_1.png',
  'Popups/8ball_2.png',
  'Popups/8ball_3.png',
  'Popups/apple.png',
  'Popups/construct.png',
  'Popups/doom.png',
  'Popups/friend.png',
  'Popups/frog.png',
  'Popups/gun.png',
  'Popups/hell.png',
  'Popups/hivemind.png',
  'Popups/holy_cow.png',
  'Popups/mona_lisa.png',
  'Popups/my_movie.png',
  'Popups/nerd.png',
  'Popups/octagon.png',
  'Popups/question.png',
  'Popups/ram.png',
  'Popups/rom.png',
  'Popups/shop.png',
  'Popups/sign.png',
  'Popups/tenna.png',
  'Popups/wizard.png',
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function getRandomPosition() {
  const top = Math.floor(Math.random() * 80); 
  const left = Math.floor(Math.random() * 80); 
  return { top: `${top}%`, left: `${left}%` };
}

export default function App() {
  const [imageSrc, setImageSrc] = useState(getRandomImage());
  const [position, setPosition] = useState(getRandomPosition());

  const handleImageLoad = () => {
    setImageSrc(getRandomImage());
    setPosition(getRandomPosition());
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <h1>Random Image</h1>
      <img src={imageSrc} alt="" style={{ maxWidth: '100%', position: 'absolute', top: position.top, left: position.left }}
      onClick={() => setImageSrc(null)} />
    </div>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
