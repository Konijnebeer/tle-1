import { PopupSystem } from "./components/PopUp";
import { Card, CardContent, CardHeader } from "./components/card";
import GlowText from "./components/GlowText";

function App() {
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

export default App;
