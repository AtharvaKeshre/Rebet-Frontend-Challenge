import Image from "next/image";

type TeamCardProps = {
  name: string;
  logo: string;
  status: string;
  score: string;
};

export default function TeamCard({ name, logo, status, score }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={70}
        height={70}
        className="w-[70px] h-[70px] rounded-full bg-black object-center object-contain"
      />
      <div className="text-md font-medium text-center text-white">{name}</div>
      <div className="relative w-[150px] mt-8">
        
        <div 
          className="rounded-xl p-[1px] w-full"
          style={{
            background: 'linear-gradient(to right, #393845, #6a7282, #393845)'
          }}
        >
          <div className="bg-[#393845] rounded-xl px-6 py-1 flex flex-col items-center">
            <p className="text-white text-sm font-medium">{status}</p>
            <p className="text-amber-600 text-sm font-semibold">{score}</p>
          </div>
        </div>
      </div>
    </div>
  );
}