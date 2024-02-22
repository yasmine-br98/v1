import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//Use prisma to read and write data in DB

export default prisma;
