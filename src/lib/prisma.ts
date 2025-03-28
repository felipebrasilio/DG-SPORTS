import { PrismaClient } from '@prisma/client';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_KEY || randomBytes(32);
const iv = randomBytes(16);

// Funções de criptografia para dados sensíveis
export const encrypt = (text: string): { encryptedData: string; iv: string } => {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
  };
};

export const decrypt = (encryptedData: string, ivHex: string): string => {
  const decipher = createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Configuração do Prisma com middleware para criptografia
const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    log: ['error'],
    errorFormat: 'minimal',
  });

  prisma.$use(async (params, next) => {
    // Criptografar dados sensíveis antes de salvar
    if (params.action === 'create' || params.action === 'update') {
      if (params.model === 'Usuario' && params.args.data.senha) {
        const { encryptedData, iv } = encrypt(params.args.data.senha);
        params.args.data.senha = encryptedData;
        params.args.data.senhaIv = iv;
      }
    }

    // Descriptografar dados sensíveis ao buscar
    const result = await next(params);
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      if (params.model === 'Usuario' && result?.senha && result?.senhaIv) {
        result.senha = decrypt(result.senha, result.senhaIv);
      }
    }

    return result;
  });

  return prisma;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };