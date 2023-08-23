// Overall, this code retrieves the user session using NextAuth.js, queries the Prisma database to find the current user's data based on the session's email, and formats the user data for consistent presentation.

import { getServerSession } from "next-auth/next"; 
import { authOptions } from "@/pages/api/auth/[...nextauth]"; 
import prisma from "@/app/libs/prismadb";

// Function to get the user session using next-auth's getServerSession.
export async function getSession() {
  return await getServerSession(authOptions); // Retrieve and return the user session.
}

// Function to get the current user's data.
export default async function getCurrentUser() {
  try {
    const session = await getSession(); // Get the user session using the previously defined function.

    if (!session?.user?.email) {
      return null; // Return null if the user session doesn't contain an email.
    }

    // Query the Prisma database to find the current user based on the email from the session.
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string, // Cast the email as a string.
      }
    });

    if (!currentUser) {
      return null; // Return null if the user is not found in the database.
    }

    // Format and return the current user's data with modified date strings.
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null; // Return null if an error occurs during the process.
  }
}
