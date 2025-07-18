import ShinyText from "@/components/reactbits/ShinyText";
import Threads from "@/components/reactbits/Threads";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <>
      <div className="w-full h-[500px] flex items-center justify-center relative ">
        <Threads amplitude={2} distance={0} />
        <div className="absolute z-10 text-center text-white top-0 bottom-0 left-0 right-0 flex flex-row ">
          <div className="flex-1 flex  flex-col justify-center items-center gap-2 w-full max-w-[680px] pl-3 pt-[40px]">
            <ShinyText
              text={`<Innovation Starts Here />`}
              disabled={false}
              speed={3}
              className="text-5xl xl:text-6xl font-extrabold font-orbitron"
            />
            <p className=" text-gray-300 text-sm xl:text-lg font-bold font-orbitron text-center px-10">
              {`We transform your ideas into scalable apps and stunning`}{" "}
              websites — blending design, code, and strategy to build digital
              products that stand out.
            </p>
            <div className="flex justify-center gap-4 items-center mt-4">
              <Button
                variant="default"
                className="font-orbitron border-[1px] border-gray-400/20 bg-neutral-400/20 text-neutral-200 hover:backdrop-blur-md cursor-pointer backdrop-blur-[1px] duration-700 hover:text-neutral-800"
              >
                {" "}
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
