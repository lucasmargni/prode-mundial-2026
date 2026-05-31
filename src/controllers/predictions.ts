import { prisma } from "../lib/prisma.js";

export const getUserPredictions = async (userId?: string | null) => {
  const whereClause = userId ? { userId } : {};

  const savedPredictions = await prisma.prediction.findMany({
    where: whereClause,
    select: {
      userId: true,
      matchId: true,
      choice: true,
    },
  });
  return savedPredictions;
};

export const saveUserPredictions = async (
  userId: string,
  predictions: Array<{ matchId: string; choice: string }>,
) => {
  if (predictions.length === 0) return true;

  // Procesamos en lotes de 10 para no saturar las conexiones de la bd
  const BATCH_SIZE = 10;

  for (let i = 0; i < predictions.length; i += BATCH_SIZE) {
    const batch = predictions.slice(i, i + BATCH_SIZE);

    const ops = batch.map((pred) =>
      prisma.prediction.upsert({
        where: {
          userId_matchId: { userId, matchId: pred.matchId },
        },
        update: { choice: pred.choice },
        create: { userId, matchId: pred.matchId, choice: pred.choice },
      }),
    );

    await prisma.$transaction(ops);
  }

  return true;
};
