import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Client } from "ldapts";
import { signInSchema } from "@/lib/zod";
import { env } from "@/env";
//import fs from 'fs';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // Extract username from email if needed (assuming email might be username@domain)
          const username = email.includes("@") ? email.split("@")[0] : email;

          // Configure LDAP client
          const client = new Client({
            url: `ldaps://${env.INTERNAL_DOMAIN}`,
            timeout: 5000, // 5 seconds
            tlsOptions: {
              rejectUnauthorized: false,
              //ca: [fs.readFileSync(env.LDAPS_CERT_FILE)],
            },
          });

          try {
            // Attempt to bind with the provided credentials
            // For Active Directory, bind using the userPrincipalName or sAMAccountName@domain
            await client.bind(`${username}@${env.INTERNAL_DOMAIN}`, password);

            // If bind succeeds, search for user details
            const [dom1, dom2] = env.INTERNAL_DOMAIN.split(".");
            const { searchEntries } = await client.search(
              `dc=${dom1},dc=${dom2}`,
              {
                filter: `(sAMAccountName=${username})`,
                attributes: [
                  "cn",
                  "mail",
                  "sAMAccountName",
                  "objectSid",
                  "displayName",
                ],
                scope: "sub",
              },
            );

            // Unbind after operations
            await client.unbind();

            // If user found, return user object
            if (searchEntries.length > 0) {
              const user = searchEntries[0]!;
              return {
                id: user.sAMAccountName ?? username,
                name: user.displayName ?? user.cn,
                email: user.mail ?? email,
              };
            }

            return null;
          } catch (error) {
            // Log only limited error info for security
            console.error("LDAP authentication error:", error.message);
            await client.unbind().catch(() => {}); // Ensure unbind happens even on error
            return null;
          }
        } catch (error) {
          // Handle parsing errors or other exceptions
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;
