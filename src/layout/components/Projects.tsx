import { useEffect, useState } from "react";
import axios from "axios";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

// 1. Update the interface
interface Project {
  _id: string;
  title: string;
  imageUrl?: string;
  liveLink?: string;
  isSelected?: boolean;
  caseStudyId?: { _id: string; } | null;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/work").then((res) => {
      const selected = res.data.data.filter((item: Project) => item.isSelected);
      setProjects(selected);
    });
  }, []);

  return (
    <section>
      <BentoGrid>
        {projects.map((item) => (
          <BentoGridItem
            key={item._id}
            title={item.title}
            imageUrl={item.imageUrl}
            liveLink={item.liveLink}
            caseStudyId={item.caseStudyId}
          />
        ))}
      </BentoGrid>
    </section>
  );
}