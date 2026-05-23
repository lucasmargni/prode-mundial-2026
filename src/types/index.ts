export type TournamentStage =
  | "GRUPOS"
  | "16VOS"
  | "8VOS"
  | "CUARTOS"
  | "SEMIFINAL"
  | "TERCER_PUESTO"
  | "FINAL";

/* L -> gana local, E -> empate, V -> gana visitante */
export type PredictionChoice = "L" | "E" | "V";

export interface Team {
  id: string;
  name: string;
  flagUrl: string;
  code: string;
}

export interface Match {
  id: string;
  stage: TournamentStage;
  localTeam: Team;
  awayTeam: Team;
  date: string;
  isFinished: boolean;

  realGoalsLocal?: number;
  realGoalsAway?: number;
  realResult?: PredictionChoice;
}

export interface UserPrediction {
  matchId: string;
  userId: string;
  choice: PredictionChoice;

  isCorrect?: boolean;
}

export interface StageStatus {
  id: TournamentStage;
  name: string;
  isAvailable: boolean;
  lockDate: string; /* Primer partido de la etapa que determina el límite para votar */
}

export interface RankingUser {
  id: string;
  username: string;
  avatarUrl?: string;
  totalPoints: number;
  correctPredictions: number;
}
