import { prisma } from "../lib/prisma.js";

export const existsUserId = async (id: string) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return existsUser !== null;
};

export const existsUsername = async (username: string) => {
  const existsUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return existsUser !== null;
};

export const createUser = async (username: string) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
    },
  });

  return newUser;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  return user;
};

export const updateCorrectPredictions = async (
  id: string,
  predictions: number,
) => {
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: { correctPredictions: predictions },
  });

  return updatedUser;
};
