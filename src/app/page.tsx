import Image from "next/image";
import { Banner } from "./atoms/banner";
import Experience from "./atoms/experience";
import Header from "./atoms/header";
import './globals.css'

export default function Home() {
  return (
    <main>
      <div>
        <Header/>
        <Banner/>
        <Experience/>
      </div>
    </main>
  );
}
