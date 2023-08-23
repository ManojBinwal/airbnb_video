//This code sets up an authentication system using the NextAuth library. It configures multiple authentication providers, including GitHub, Google, and custom credentials-based authentication. The custom credentials-based authentication checks user credentials against a Prisma-managed database, using bcrypt to securely compare passwords. The authentication system is configured to use JWT (JSON Web Tokens) for session management. Debug mode is enabled during development, and the authentication pages are customized to redirect to the home page for sign-in. The configuration is encapsulated within the authOptions object, which is used to initialize NextAuth.

// Importing required modules and dependencies.
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Importing the Prisma client instance.
import prisma from "@/app/libs/prismadb";

// Configuration options for authentication.
export const authOptions: AuthOptions = {
  // Using PrismaAdapter to connect NextAuth with Prisma.
  adapter: PrismaAdapter(prisma),

  // Defining authentication providers.
  providers: [
    // GitHub authentication provider.
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    // Google authentication provider.
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // Custom credentials-based authentication provider.
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      // Custom authorization logic for credentials.
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // Fetch user based on the provided email.
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        // Compare provided password with stored hashed password.
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user; // Return user object if credentials are valid.
      }
    })
  ],

  // Customizing authentication pages.
  pages: {
    signIn: '/', // Redirect to the home page for sign-in.
  },

  // Enabling debug mode in development environment.
  debug: process.env.NODE_ENV === 'development',

  // Configuring session strategy.
  session: {
    strategy: "jwt",
  },

  // Secret used for signing cookies and tokens.
  secret: process.env.NEXTAUTH_SECRET,
};

// Initializing NextAuth with the provided configuration.
export default NextAuth(authOptions);
