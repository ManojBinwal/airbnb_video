//By using this approach, the code ensures that there's a single instance of the Prisma Client, which helps manage database connections efficiently and avoids creating unnecessary duplicate connections. It also provides a way to access the Prisma Client instance from anywhere in your application without the need to import it each time.

import { PrismaClient } from "@prisma/client";

// Declare a global variable to hold the PrismaClient instance.
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a new PrismaClient instance if not already created, and store it in the global variable.
const client = globalThis.prisma || new PrismaClient();

// If the environment is not in production, assign the PrismaClient instance to the global variable.
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

// Export the PrismaClient instance.
export default client;

