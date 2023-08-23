// In summary, the getListingById function fetches a specific listing by its ID using the Prisma client. It also includes additional details about the associated user of the listing, such as their createdAt, updatedAt, and emailVerified fields. The function ensures that the date and boolean values are consistently formatted as strings. If there's any issue during the process, the function throws an error.


import prisma from "@/app/libs/prismadb"; // Importing the Prisma client instance

interface IParams {
  listingId?: string;
}

// Defining the async function to fetch a listing by its ID
export default async function getListingById(
  params: IParams
) {
  try {
    const { listingId } = params; // Extracting the listingId from the params

    // Fetching the listing by its unique ID, including associated user details
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true // Including the associated user details
      }
    });

    if (!listing) {
      return null; // If no listing is found, return null
    }

    // Formatting createdAt, user.createdAt, user.updatedAt, and user.emailVerified
    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified:
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error); // Throwing an error if something goes wrong
  }
}
