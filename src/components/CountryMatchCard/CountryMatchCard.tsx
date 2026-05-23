import type { Team } from "../../types/types";

interface CountryMatchCardProps {
  team: Team;
}

export const CountryMatchCard = ({ team }: CountryMatchCardProps) => {
  return (
    <div className="flex flex-col items-center text-center font-black w-24 sm:w-32 px-1 shrink-0">
      <span className="text-3xl h-8 [image-rendering:pixelated] select-none">
        {team.flagUrl}
      </span>
      <span className="text-xs sm:text-sm tracking-tight uppercase break-words w-full line-clamp-2 mt-0.5 leading-none flex items-center justify-center">
        {team.name}
      </span>
    </div>
  );
};

export default CountryMatchCard;
