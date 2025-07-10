import { CiFootball } from "react-icons/ci";

export default function MatchInfo() {
  return (
    <div className="flex justify-between items-center px-5 py-4 text-white">
        <div className="flex flex-row items-center gap-2">
          <span className="text-2xl"><CiFootball/></span>
          <p> NFL</p>
        </div>
        <div className="font-style: italic border-1 border-gray-300 rounded-xl px-[14px] py-[6px] text-[13px]">
          <p><b>PENDING</b></p>
        </div>
      </div>
  );
} 