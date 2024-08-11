import Navbar from "@/components/shared/NavBar/Navbar";
import FirtsBlock from "./components/FirtsBlock";
import SliderBrands from "./components/SliderBrands.tsx/SliderBrands";
import Feature from "./components/Features/Feature";
import OurFleet from "./components/OurFleet/OurFleet";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <FirtsBlock />
      <SliderBrands />
      <Feature />
      <OurFleet />
    </div>
  );
}
