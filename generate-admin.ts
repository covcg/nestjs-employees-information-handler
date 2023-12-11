import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const email = process.argv[2];
if (!email) console.error('You need to pass an email as first argument');
const password = process.argv[3];
if (!password) console.error('You need to pass a password as second argument');

argon
  .hash(password)
  .then((hash) => {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });

    return prisma.administrator.create({
      data: {
        email,
        hash,
      },
    });
  })
  .then((admin) => {
    console.log({ admin });
  });
