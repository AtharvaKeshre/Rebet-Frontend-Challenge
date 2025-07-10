"use client";
import { useState, useMemo } from "react";
import UserHeader from "../UserHeader/UserHeader";
import MatchInfo from "../MatchInfo/MatchInfo";
import TeamCard from "../TeamCard/TeamCard";
import BetDetails from "../BetDetails/BetDetails";
import ActionBar from "../ActionBar/ActionBar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

// Constants
const BORDER_GRADIENTS = {
  default: `linear-gradient(to right, rgba(252, 66, 51, 0.5) 0%, rgba(252, 66, 51, 0.5) 25%, rgba(255, 238, 146, 1) 50%, rgba(252, 66, 51, 0.5) 75%, rgba(252, 66, 51, 0.5) 100%)`,
  left: `linear-gradient(to right, rgba(98, 22, 49, 1) 0%, rgba(98, 22, 49, 1) 25%, rgba(218, 73, 108, 1) 50%, rgba(98, 22, 49, 1) 75%, rgba(98, 22, 49, 1) 100%)`,
  right: `linear-gradient(to right, rgba(26, 80, 62, 1) 0%, rgba(26, 80, 62, 1) 25%, rgba(64, 198, 134, 1) 50%, rgba(26, 80, 62, 1) 75%, rgba(26, 80, 62, 1) 100%)`
} as const;

const DEFAULT_TEAM_1 = {
  name: "CIN Bengals",
  logo: "/logo_1.png",
  status: "Under",
  score: "-50"
} as const;

const DEFAULT_TEAM_2 = {
  name: "Dallas Cowboys",
  logo: "/logo_2.png",
  status: "Over",
  score: "+50"
} as const;

type Team = {
  name: string;
  logo: string;
  status: string;
  score: string;
};

type DragState = {
  isDragingLeft: boolean;
  isDragingRight: boolean;
  isDragging: boolean;
};

interface BetCardProps {
  matchDate?: string;
  matchTime?: string;
  odds?: string;
  team1?: Team;
  team2?: Team;
}

export default function BetCard({
  matchDate = "09 DEC",
  matchTime = "08:15 PM",
  odds = "1 : 1",
  team1 = DEFAULT_TEAM_1,
  team2 = DEFAULT_TEAM_2
}: BetCardProps) {
  const [dragState, setDragState] = useState<DragState>({
    isDragingLeft: false,
    isDragingRight: false,
    isDragging: false
  });

  // Memoized border gradient calculation
  const borderGradient = useMemo(() => {
    if (dragState.isDragingLeft) return BORDER_GRADIENTS.left;
    if (dragState.isDragingRight) return BORDER_GRADIENTS.right;
    return BORDER_GRADIENTS.default;
  }, [dragState.isDragingLeft, dragState.isDragingRight]);

  return (
    <div className={`${poppins.variable} font-sans`}>
      <div 
        className="p-[1px] rounded-2xl w-[500px] h-[600px] transition-all duration-200 ease-out"
        style={{ backgroundImage: borderGradient }}
      >
        <div className="bg-gradient-to-b from-[#6a381b] to-gray-950 rounded-[1rem] w-full h-full flex flex-col">
          <UserHeader />
          
          <div className="flex-1 flex flex-col">
            <MatchInfo />
            
            <div className="flex items-start justify-between mx-4 flex-1">
              {/* Team 1 */}
              <div className="flex-1 flex justify-center">
                <TeamCard
                  name={team1.name}
                  logo={team1.logo}
                  status={team1.status}
                  score={team1.score}
                />
              </div>
              
              {/* Center Section - Date, Time, Odds */}
              <div className="flex-1 flex flex-col items-center justify-center mt-3">
                {/* Date & Time */}
                <div className="text-center mb-6">
                  <p className="font-semibold text-amber-600 text-lg">{matchDate}</p>
                  <p className="text-white text-sm">{matchTime}</p>
                </div>
                
                {/* Odds Section */}
                <div className="flex flex-col items-center">
                  <p className="font-medium text-amber-600 text-sm mb-2">ODDS</p>
                  
                  {/* Odds Display with Gradient Border */}
                  <div className="p-[1px] rounded-full bg-gradient-to-b from-[rgba(255,238,146,1)] via-[rgba(252,66,51,0.5)] to-[rgba(252,66,51,0.5)]">
                    <div className="bg-gradient-to-b from-[#fa4231] via-[#fc6932] to-[#fca035] rounded-full flex items-center px-[15px] py-0.5">
                      <p className="text-black font-bold text-xl italic">{odds}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Team 2 */}
              <div className="flex-1 flex justify-center">
                <TeamCard
                  name={team2.name}
                  logo={team2.logo}
                  status={team2.status}
                  score={team2.score}
                />
              </div>
            </div>
          </div>
          
          <BetDetails />
          <ActionBar onDragStateChange={setDragState} />
        </div>
      </div>
    </div>
  );
}