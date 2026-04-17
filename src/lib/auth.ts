import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      canMakePlaylistsPublic: { type: "boolean", defaultValue: false, returned: true },
      isReadOnly: { type: "boolean", defaultValue: false, returned: true },
      loginCount: { type: "number", defaultValue: 0, returned: false },
      lastLoginAt: { type: "date", returned: true },
      lastPlayedTrackId: { type: "string", returned: true },
      lastPlayedPlaylistId: { type: "string", returned: true },
      totalPlayTime: { type: "number", defaultValue: 0, returned: true }
    }
  },
  plugins: [
    admin()
  ],
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          try {
            await prisma.user.update({
              where: { id: session.userId },
              data: {
                loginCount: { increment: 1 },
                lastLoginAt: new Date()
              }
            });
          } catch (e) {
            console.error("Failed to update user login track:", e);
          }
        }
      }
    }
  }
});

export type Session = typeof auth.$Infer.Session;
