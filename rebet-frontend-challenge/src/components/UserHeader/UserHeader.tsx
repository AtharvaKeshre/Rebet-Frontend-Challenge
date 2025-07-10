import Image from "next/image";

export default function UserHeader() {
  return (
    <div className="relative rounded-t-2xl overflow-hidden bg-[#393845] px-2">
      {/* Gradient Bottom Border - Light at corners and center */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#393845] via-gray-500   to-[#393845]" />

      {/* Main Header */}
      <div className="flex justify-between items-center p-4 relative z-10">
        <div className="flex items-center gap-4">
          <Image
            src="/avatar_1.png"
            alt="Lat avatar"
            width={45}
            height={45}
            className="rounded-full bg-white w-[45px] h-[45px] object-cover"
          />
          <span className="text-lg text-white font-medium">Lat</span>
        </div>

        {/* todo: add the gradient */}
        {/* <div
          className="absolute bottom-[-40px] left-32 w-22 h-22 rounded-full overflow-hidden"
          style={{
            background: "radial-gradient(circle, #f3f4f6 0%, #393845 100%)",
          }}
        ></div> */}
        <div className="flex w-10 h-10 items-center bg-[#25252e] rounded-full  ml-10">
          <span className="text-xl text-white font-semibold italic ml-[5px]">VS</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-lg text-white font-medium">You</span>
            <span className="text-lg text-amber-600">Waiting...</span>
          </div>
          <div>
            <Image
              src="/avatar_1.png"
              alt="Lat avatar"
              width={45}
              height={45}
              className="rounded-full bg-white w-[45px] h-[45px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
