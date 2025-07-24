import { useLocation } from "react-router-dom";
import ClickSpark from "@/components/reactbits/ClickSpark";
import Squares from "@/components/reactbits/Squares";
import ScalableHeader from "./components/common/Header";
import FollowCursor from "@/components/ui/DotFollower";
import FloatingAIChat from "./components/common/ChatModel";
import { useState } from "react";
import AI from "./components/common/AIAsistant";
import Footer from "./components/common/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <main className="flex w-full h-full text-white">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="#262626"
        hoverFillColor="#222"
      />
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {!isAdminPage && <ScalableHeader />}
        <FollowCursor />
        <main className="z-10 w-full h-full flex justify-center items-center">
          {children}
        </main>
        {!isAdminPage && <Footer />}
        <AI open={open} setOpen={() => setOpen(true)} />
        <FloatingAIChat open={open} setOpen={() => setOpen(false)} />
      </ClickSpark>
    </main>
  );
}

export default Layout;
