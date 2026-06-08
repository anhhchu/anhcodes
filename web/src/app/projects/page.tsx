import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work — data platform accelerators, Spark ML, and deep learning projects.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-8">
      <Projects />
    </div>
  );
}
