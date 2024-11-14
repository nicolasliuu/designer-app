import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  // In production, create a new PrismaClient only if it doesn't already exist
  prisma = globalThis.prismaGlobal ?? new PrismaClient({
    log: ["error"], // Only log errors in production
  });
  globalThis.prismaGlobal = prisma; // Save instance to avoid recreating
} else {
  // In development, recreate PrismaClient for each request to avoid issues with Hot Reloading
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient({
      log: ["query", "warn", "error"], // Log more details for development
    });
  }
  prisma = globalThis.prismaGlobal;
}

export default prisma;
