import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

/**
 * Важное примечание для стабильности на Windows + Удаленный MySQL:
 * 1. Используем семейство адресов IPv4 (family: 4), чтобы избежать резолва ::1 (localhost IPv6).
 * 2. Увеличиваем таймауты подключения до 60 секунд, так как удаленный shared-хостинг часто задерживает handshake.
 * 3. Настраиваем пул соединений для оптимизации повторных запросов.
 */

const dbConfig = {
  host: process.env.DB_HOST || '108.165.32.191',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'j82717825_mingle',
  password: process.env.DB_PASSWORD || 'asmcs~Gr3Mqp',
  database: process.env.DB_NAME || 'j82717825_mngl',
  connectionLimit: 15,     // Увеличиваем пул для параллельных запросов (стриминг, очередь, история)
  connectTimeout: 60000,   // 60 секунд на установку TCP соединения
  acquireTimeout: 60000,   // 60 секунд на получение соединения из пула
  idleTimeout: 60000,      // Держим idle-соединения дольше, чтобы не пересоздавать их
  family: 4,               // Форсируем IPv4
};

const adapter = new PrismaMariaDb(dbConfig);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Инициализация Prisma v7 с использованием Driver Adapter
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
