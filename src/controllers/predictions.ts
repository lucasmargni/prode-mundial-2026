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
  const ops = predictions.map((pred) =>
    prisma.prediction.upsert({
      where: {
        userId_matchId: {
          userId,
          matchId: pred.matchId,
        },
      },
      update: {
        choice: pred.choice,
      },
      create: {
        userId,
        matchId: pred.matchId,
        choice: pred.choice,
      },
    }),
  );

  await prisma.$transaction(ops);
  return true;
};
