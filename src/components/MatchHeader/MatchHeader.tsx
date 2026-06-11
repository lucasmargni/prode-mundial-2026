import { teamDictionary } from "../../utils/teams";
import type { Team } from "../../types/types";

interface MatchHeaderProps {
  localTeam: Team;
  awayTeam: Team;
}

const MatchHeader = ({ localTeam, awayTeam }: MatchHeaderProps) => (
  <div className="flex items-center justify-between text-center bg-bg-main border border-secondary/10 p-4 rounded-xl">
    <div className="flex-1">
      <span
        className="text-3xl block mb-1"
        role="img"
        aria-label={localTeam.name}
      >
        {teamDictionary[localTeam.code]?.flagUrl || "🏳️"}
      </span>
      <p className="text-xs font-bold uppercase tracking-wider text-border-retro">
        {localTeam.name}
      </p>
    </div>
    <div className="px-4 font-black text-xl text-primary tracking-widest">
      VS
    </div>
    <div className="flex-1">
      <span
        className="text-3xl block mb-1"
        role="img"
        aria-label={awayTeam.name}
      >
        {teamDictionary[awayTeam.code]?.flagUrl || "🏳️"}
      </span>
      <p className="text-xs font-bold uppercase tracking-wider text-border-retro">
        {awayTeam.name}
      </p>
    </div>
  </div>
);

export default MatchHeader;
