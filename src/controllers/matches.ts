import { prisma } from "../lib/prisma.js";

/* Obtener todos los partidos */
export const getAllMatches = async (stage?: string | null) => {
  // Si viene la stage la agregamos al filtro, si no, pasamos un objeto vacío para traer todo
  const whereClause = stage ? { stage } : {};

  const matches = await prisma.match.findMany({
    where: whereClause,
    orderBy: {
      date: "asc",
    },
  });
  return matches;
};

/* Obtener los detalles de un partido por id */
export const getMatchById = async (id: string) => {
  const match = await prisma.match.findUnique({
    where: { id },
  });
  return match;
};

/* Crear un nuevo partido en la base de datos */
export const createMatch = async (data: {
  id: string;
  stage: string;
  localTeamCode: string;
  awayTeamCode: string;
  date: string;
}) => {
  const newMatch = await prisma.match.create({
    data: {
      id: data.id,
      stage: data.stage,
      localTeamCode: data.localTeamCode,
      awayTeamCode: data.awayTeamCode,
      date: new Date(data.date),
    },
  });
  return newMatch;
};
