import Image from "next/image";

export default function UserHeader() {
  return (
    <div className="relative rounded-t-2xl overflow-hidden p-4 bg-gradient-to-r from-[#6a7282] via-[#393845] to-[#393845] flex items-center justify-between">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(130deg, #393845 20%, #504f5d 50%, #393845 70%)`,
        }}
      ></div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#393845] via-gray-500 to-[#393845] z-10" />

      <div className="flex justify-between items-center w-full relative z-20">
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

        <div className="flex w-9 h-9 items-center bg-[#25252e] rounded-full  ml-10 relative">
          <span className="text-lg text-white font-semibold italic ml-[5px]">
            VS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-lg text-white font-medium">You</span>
            <span className="text-lg text-amber-600">Waiting...</span>
          </div>
          <div>
            <Image
              src="/avatar_1.png"
              alt="You avatar"
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
