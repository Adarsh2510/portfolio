import Image from "next/image";
import Banner from "./components/banner";
import Experience from "./components/experience";
import Header from "./components/header";
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
