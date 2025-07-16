import Lottie from "lottie-react";
import RobotSaludando from "../../../data/RobotSaludando[1].json";
export default function AI({
  open = false,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) {
  if (!open)
    return (
      <div className=" fixed bottom-[20px] right-[-10px] z-50">
        <div className="cursor-pointer" onClick={setOpen}>
          <Lottie
            className="w-[150px]"
            animationData={RobotSaludando}
            loop={true}
          />
        </div>
      </div>
    );
}
