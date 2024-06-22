import { BoxComponent } from "./components/BoxComponent";
import Image from "next/image";
import { LandingPage } from "./components/LandingPage";

export default function Home() {
  return (
    <BoxComponent>
      <LandingPage></LandingPage>
    </BoxComponent>
  );
}
