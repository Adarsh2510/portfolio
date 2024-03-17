import Image from "next/image";
import { Banner } from "./atoms/banner";
import Header from "./atoms/header";
import './globals.css'

export default function Home() {
  return (
    <main>
      <div>
        <Header/>
        <Banner/>
      </div>
    </main>
  );
}
