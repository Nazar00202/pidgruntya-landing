import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Transformation } from "./components/Transformation";
import { Services } from "./components/Services";
import { Flagship } from "./components/Flagship";
import { Equipment } from "./components/Equipment";
import { Audience } from "./components/Audience";
import { Geography } from "./components/Geography";
import { FAQ } from "./components/FAQ";
import { LeadForm } from "./components/LeadForm";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <TrustStrip />
        <Transformation />
        <Services />
        <Flagship />
        <Equipment />
        <Audience />
        <Geography />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
