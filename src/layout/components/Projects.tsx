import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function Projects() {
  return (
    <BentoGrid className="max-w-7xl mx-auto p-3">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          // description={item.description}
          // header={item.header}
          // icon={item.icon}
          imageUrl={item.imageUrl}
          liveLink={item.liveLink}
          caseStudyLink={item.caseStudyLink}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

{
  /*image url and other links will be provided after review*/
}

export const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <div className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://media.istockphoto.com/id/599965448/photo/silhouette-of-wind-turbine-morning-view-from-tamilnadu-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=Aiscw7XoHUhkcZAPpXUDIXAfjhh9vw6r_GL0cHtHVxI=",
    caseStudyLink: "/case-studies/project1",
    liveLink: "",
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <div className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://media.istockphoto.com/id/1213223956/photo/north-and-south-america-red-connection-lines-copy-space-global-business-pandemic-computer.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q-whmH1WA1gkn9eOZEkwt22SI4lXevs-Oa5J9hrcrHc=",
    caseStudyLink: "/case-studies/project2",
    liveLink: "",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <div className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2FsbHBhcGVyfGVufDB8fDB8fHww",
    caseStudyLink: "/case-studies/project3",
    liveLink: "",
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <div className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://media.istockphoto.com/id/1372200846/photo/electricity-transmission-towers-with-orange-glowing-wires-against-night-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=FQsOUVLK16Y1mm6xUJl9iPxlthqcFgjyI7kxjQjTkZA=",
    caseStudyLink: "/case-studies/project4",
    liveLink: "",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <div className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lsaG91ZXR0ZXxlbnwwfHwwfHx8MA%3D%3D",
    caseStudyLink: "/case-studies/project5",
    liveLink: "",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <div className="h-4 w-4 text-neutral-500" />,
    imageUrl: "https://images.unsplash.com/photo-1443916568596-df5a58c445e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGpveXxlbnwwfHwwfHx8MA%3D%3D",
    caseStudyLink: "/case-studies/project6",
    liveLink: "",
  },
];
