import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import AutomationWorkflow from "@/components/AutomationWorkflow";
import Projects from "@/components/Projects";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <AutomationWorkflow />
      <Projects />
      <WhyUs />
      <Process />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}
