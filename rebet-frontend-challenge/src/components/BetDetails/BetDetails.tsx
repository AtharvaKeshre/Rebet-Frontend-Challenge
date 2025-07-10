
export default function BetDetails({
  leftSection = { title: "Your Bet", betAmount: "1.00", payout: "2.00" },
  rightSection = { title: "Opponent", betAmount: "1.00", payout: "2.00" },
}) {
  return (
    <div className="flex flex-row justify-between mx-8 items-center mb-4">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-3 ">
          <p className="text-[#7b7b7c] text-md mr-8">Bet Amount</p>
          <p className="text-white text-lg mr-8">{leftSection.betAmount}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-[#7b7b7c] text-md mr-8">Payout</p>
          <p className="text-white text-lg mr-8">{leftSection.payout}</p>
        </div>
      </div>

      <div className="border-l-2 border-[#4e4d58] h-12 mr-8 "></div>

      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-3">
          <p className="text-white text-lg">{rightSection.betAmount}</p>
          <p className="text-[#7b7b7c] text-md ml-8">Bet Amount</p>
        </div>

        <div className="flex flex-row justify-between gap-3">
          <p className="text-white text-lg">{rightSection.payout}</p>
          <p className="text-[#7b7b7c] text-md">Payout</p>
        </div>
      </div>
    </div>
  );
}
