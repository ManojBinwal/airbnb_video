//Overall, this code handles an incoming POST request to create a new user. It hashes the provided password using bcrypt for security, creates a new user record in the database using Prisma, and responds with a JSON object representing the newly created user.

import { NextResponse } from "next/server"; // Importing the NextResponse object from the "next/server" module.
import bcrypt from "bcrypt"; // Importing the bcrypt library for password hashing.

import prisma from "@/app/libs/prismadb"; // Importing the Prisma client instance.

export async function POST(
  request: Request, // The incoming HTTP request object.
) {
  const body = await request.json(); // Parsing the JSON body of the request.
  const { 
    email,
    name,
    password,
   } = body; // Destructuring values from the request body.

   const hashedPassword = await bcrypt.hash(password, 12); // Hashing the provided password.

   // Creating a new user in the database using Prisma.
   const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user); // Returning a JSON response containing the newly created user object.
}
