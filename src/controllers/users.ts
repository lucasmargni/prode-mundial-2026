import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const existsUserId = async (id: string) => {
  const existsUser = await prisma.user.findUnique({
    where: { id },
  });
  return existsUser !== null;
};

export const existsUsername = async (username: string) => {
  const existsUser = await prisma.user.findUnique({
    where: { username },
  });
  return existsUser !== null;
};

export const createUser = async (username: string, password: string) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);

  const totalUsersCount = await prisma.user.count();

  const initialRankingPosition = totalUsersCount + 1;

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPass,
      rankingPosition: initialRankingPosition,
    },
    select: {
      id: true,
      username: true,
      correctPredictions: true,
      rankingPosition: true,
      createdAt: true,
    },
  });

  return newUser;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      correctPredictions: true,
      rankingPosition: true,
      createdAt: true,
    },
  });
  return users;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      correctPredictions: true,
      rankingPosition: true,
      createdAt: true,
    },
  });
  return user;
};

export const updateUserData = async (
  id: string,
  data: { correctPredictions?: number; rankingPosition?: number },
) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: data,
    select: {
      id: true,
      username: true,
      correctPredictions: true,
      rankingPosition: true,
      createdAt: true,
    },
  });
  return updatedUser;
};

export const verifyUserCredentials = async (
  username: string,
  textPassword: string,
) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return null;

  const isPasswordCorrect = await bcrypt.compare(textPassword, user.password);

  if (isPasswordCorrect) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return null;
};

/* Verificar si un usuario es administrador */
export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "ADMIN";
};
