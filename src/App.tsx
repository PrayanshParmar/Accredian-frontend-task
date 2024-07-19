import Dashborad from "@/components/dashborad/dashboard";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <div className="w-full h-full">
        <Dashborad />
        <Toaster />
      </div>
    </>
  );
}

export default App;
