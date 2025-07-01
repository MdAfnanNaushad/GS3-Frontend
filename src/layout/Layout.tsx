import ClickSpark from "@/components/reactbits/ClickSpark";
import Squares from "@/components/reactbits/Squares";
import ScalableHeader from "./components/common/Header";
import FollowCursor from "@/components/ui/DotFollower";
import FloatingAIChat from "./components/common/ChatModel";
import { useState } from "react";
import AI from "./components/common/AIAsistant";

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <main className="flex w-full h-full text-white ">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
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
        <ScalableHeader />
        <FollowCursor />
        <main className="z-10 w-full h-full flex justify-center items-center">
          {children}
        </main>
        <AI open={open} setOpen={() => setOpen(true)} />
        <FloatingAIChat open={open} setOpen={() => setOpen(false)} />
      </ClickSpark>
    </main>
  );
}

export default Layout;
