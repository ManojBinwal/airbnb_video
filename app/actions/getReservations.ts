// In summary, the getReservations function fetches reservations from the database using the Prisma client. It constructs a query based on the provided parameters, including filtering by listing ID, user ID, and author ID. The function also ensures that relevant date fields, including createdAt, startDate, and endDate, are converted to ISO strings for consistent formatting. If there's any issue during the process, the function throws an error.

import prisma from "@/app/libs/prismadb"; // Importing the Prisma client instance

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

// Defining the async function to fetch reservations based on parameters
export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {}; // Initialize an empty query object to build filters
        
    // Building the query based on provided parameters
    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    // Fetching reservations based on the constructed query
    const reservations = await prisma.reservation.findMany({
      where: query, // Apply the constructed query
      include: {
        listing: true // Include the associated listing information
      },
      orderBy: {
        createdAt: 'desc' // Order reservations by createdAt in descending order
      }
    });

    // Converting relevant date fields to ISO strings for consistent formatting
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations; // Returning the formatted reservations
  } catch (error: any) {
    throw new Error(error); // Throwing an error if something goes wrong
  }
}
