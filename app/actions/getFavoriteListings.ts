// This code snippet defines an asynchronous function named getFavoriteListings, which is responsible for fetching the user's favorite listings from the database using Prisma. The function takes care of ensuring that the favorite listings are returned in a safe format for further usage in the application.

//In summary, the getFavoriteListings function uses the Prisma client to query the database for the user's favorite listings. It retrieves the current user's information using the getCurrentUser function and then uses the user's favoriteIds to filter the favorite listings. The function also ensures that the createdAt field of each favorite listing is converted to a string for consistent formatting. If there's any issue during the process, the function throws an error.

'use-client';

import prisma from "@/app/libs/prismadb"; // Importing the Prisma client instance
import getCurrentUser from "./getCurrentUser"; // Importing the getCurrentUser function

// Defining the async function to fetch user's favorite listings
export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser(); // Fetching the current user's information

    if (!currentUser) {
      return []; // If no user is logged in, return an empty array
    }

    // Fetching favorite listings that match the user's favoriteIds
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])] // Filtering by favoriteIds
        }
      }
    });

    // Converting createdAt to a string to ensure consistent format
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites; // Returning the safe formatted favorite listings
  } catch (error: any) {
    throw new Error(error); // Throwing an error if something goes wrong
  }
}
