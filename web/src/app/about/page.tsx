import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "Anh Chu — Solutions Architect at Databricks. Experience, skills, and how to get in touch.",
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
    </>
  );
}
