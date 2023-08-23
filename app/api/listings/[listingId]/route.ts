// In summary, this code defines a serverless DELETE handler for deleting a listing based on the provided listing ID. It performs the following steps:
    // It retrieves the current user's information using the getCurrentUser function.
    // If no current user is found, it returns an error response using NextResponse.error().
    // It extracts the listing ID from the provided parameters.
    // It validates the listing ID to ensure it's a non-empty string.
    // It uses Prisma to delete the listing from the database. The deleteMany function is used with a where clause to specify the listing's ID and the current user's ID for added security.
    // It returns a JSON response containing information about the deleted listing using NextResponse.json(listing).
// This code snippet demonstrates how to handle DELETE requests for deleting resources from a database, utilizing Prisma for database interaction and Next.js's serverless functions for handling the API endpoint.

import { NextResponse } from "next/server";

// Importing functions and libraries
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Defining the parameters expected in the request
interface IParams {
  listingId?: string;
}

// The DELETE handler function
export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  // Getting the current user's information
  const currentUser = await getCurrentUser();

  // If no current user is found, return an error response
  if (!currentUser) {
    return NextResponse.error();
  }

  // Extracting the listing ID from the provided parameters
  const { listingId } = params;

  // Validating the listing ID
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  // Deleting the listing from the database using Prisma
  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  // Returning a JSON response with the deleted listing's information
  return NextResponse.json(listing);
}
