import Navbar from "@/components/shared/NavBar/Navbar";
import FirtsBlock from "./components/FirtsBlock";
import SliderBrands from "./components/SliderBrands.tsx/SliderBrands";
import Feature from "./components/Features/Feature";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <FirtsBlock />
      <SliderBrands />
      <Feature />
    </div>
  );
}
