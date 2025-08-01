
import { useEffect, useState } from "react";
import axios from "axios";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";


interface Project {
  _id: string;
  title: string;
  imageUrl?: string;
  liveLink?: string;

  caseStudyId?: { _id: string; } | null;
}

export default function AllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/work`).then((res) => {
      setProjects(res.data.data);
    });
  }, []);

  return (
    <main className="min-h-screen w-full px-6 py-12">
      <h1 className="text-4xl font-orbitron mb-8 text-white font-orbitron text-border-white tracking-widest mt-12 mx-24">All Projects</h1>
      <BentoGrid className="max-w-7xl mx-auto">
        {projects.map((project) => (
          <BentoGridItem
            key={project._id}
            title={project.title}
            imageUrl={project.imageUrl}
            liveLink={project.liveLink}
            
            caseStudyId={project.caseStudyId}
          />
        ))}
      </BentoGrid>
    </main>
  );
}