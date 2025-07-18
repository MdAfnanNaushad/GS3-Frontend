// src/pages/all-projects.tsx
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { items } from "@/layout/components/Projects";

export default function AllProjects() {
  return (
    <main className="min-h-screen w-full flex flex-col m-8 px-4 py-10">
      <h1 className="text-4xl font-orbitron text-border-white mb-6 mt-6">All Projects</h1>
      <BentoGrid className="max-w-7xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            imageUrl={item.imageUrl}
            liveLink={item.liveLink}
            caseStudyLink={item.caseStudyLink}
          />
        ))}
      </BentoGrid>
      <h1 className="text-4xl font-orbitron text-border-white mb-6 mt-6 text-end">More Projects to come Soon..</h1>
    </main>
  );
}
