import { useState, useEffect } from "react";
import { PopupSystem } from "./components/PopUp";
import { Card, CardContent, CardHeader } from "./components/card";
import GlowText from "./components/GlowText";
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
    <>
      <main className="flex justify-center items-center min-h-screen relative">
        <Card className="w-full max-w-6xl max-h-[80vh] aspect-square p-10 bg-gray-900 before:border-[3px] before:bg-linear-120 before:from-gray-950 before:via-gray-700 before:to-gray-950/50">
          <CardHeader>
            <GlowText className="text-4xl font-bold text-center relative mx-80 bg-linear-[110deg,blue_35%,red_35%,red_66%,yellow_60%,yellow_100%] before:bg-linear-[120deg,blue_35%,red_35%,red_66%,yellow_66%,yellow_99%]">
              Start Working
            </GlowText>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      </main>
      <PopupSystem />
    </>
  );
}
