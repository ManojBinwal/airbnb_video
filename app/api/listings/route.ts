// In summary, this code defines a serverless POST handler for creating a new listing in a database. It performs the following steps:
      // It retrieves the current user's information using the getCurrentUser function.
      // If no current user is found, it returns an error response using NextResponse.error().
      // It parses the request body as JSON to extract the data for the new listing.
      // It destructures relevant properties from the request body.
      // It iterates through the properties in the request body to check if any required property is missing. If a required property is missing, it returns an error response using NextResponse.error().
      // It uses Prisma to create a new listing in the database. The create function is used with the provided data for the listing.
      // It returns a JSON response containing information about the created listing using NextResponse.json(listing).
// This code snippet demonstrates how to handle POST requests for creating new resources in a database using Prisma and Next.js's serverless functions. It also includes input validation to ensure that required properties are present in the request body.

import { NextResponse } from "next/server";

// Importing libraries and functions
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// The POST handler function
export async function POST(
  request: Request
) {
  // Getting the current user's information
  const currentUser = await getCurrentUser();

  // If no current user is found, return an error response
  if (!currentUser) {
    return NextResponse.error();
  }

  // Parsing the request body as JSON
  const body = await request.json();

  // Destructuring relevant properties from the request body
  const { 
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // Checking if any of the required properties is missing in the request body
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // Creating the new listing in the database using Prisma
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });

  // Returning a JSON response with the created listing's information
  return NextResponse.json(listing);
}
