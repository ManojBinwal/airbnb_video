//These code snippets define two serverless functions, POST and DELETE, which handle favoriting and unfavoriting a listing for a user respectively. These functions seem to interact with a Prisma database for managing user data, specifically the favoriteIds field which presumably holds the IDs of the listings a user has favorited.

// Both functions follow a similar structure:

    // They start by getting the current user's information.
    // If no current user is found, they return an error response using NextResponse.error().
    // They extract the listing ID from the provided parameters and validate it.
    // They create a new array of favoriteIds that includes the favorited listing ID (for POST) or removes the unfavorited listing ID (for DELETE).
    // They update the user's data in the database with the new favoriteIds array.
    // They return a JSON response with the updated user data.

// These functions are meant to be used as serverless API endpoints to handle favoriting and unfavoriting listings for a user.


import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(
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

  // Creating a new array of favorite IDs with the newly favorited listing ID
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  // Updating the user's data in the database to include the new favoriteIds array
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  // Returning a JSON response with the updated user data
  return NextResponse.json(user);
}

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

  // Removing the unfavorited listing ID from the user's favoriteIds array
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  // Updating the user's data in the database to remove the unfavorited listing ID
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  // Returning a JSON response with the updated user data
  return NextResponse.json(user);
}
