import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import Services        from "@/components/Services";
import Gallery         from "@/components/Gallery";
import About           from "@/components/About";
import Advantages      from "@/components/Advantages";
import Contact         from "@/components/Contact";
import Footer          from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Advantages />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
