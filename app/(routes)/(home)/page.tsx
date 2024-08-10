import Navbar from "@/components/shared/NavBar/Navbar";
import FirtsBlock from "./components/FirtsBlock";
import SliderBrands from "./components/SliderBrands.tsx/SliderBrands";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <FirtsBlock />
      <SliderBrands />
    </div>
  );
}
