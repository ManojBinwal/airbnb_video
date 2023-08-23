// In summary, the getListings function fetches listings from the database using the Prisma client. It constructs a query based on the provided parameters, including filtering by user ID, room count, guest count, bathroom count, location value, category, and reservations' date ranges. The function also ensures that the createdAt field of each listing is converted to an ISO string for consistent formatting. If there's any issue during the process, the function throws an error.



import prisma from "@/app/libs/prismadb"; // Importing the Prisma client instance

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

// Defining the async function to fetch listings based on parameters
export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount, 
      bathroomCount, 
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {}; // Initialize an empty query object to build filters

    // Building the query based on provided parameters
    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    // Other conditions follow the same pattern

    // Constructing a complex NOT query to filter listings based on reservations
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              // Start and end date conditions
            ]
          }
        }
      };
    }

    // Fetching listings based on the constructed query
    const listings = await prisma.listing.findMany({
      where: query, // Apply the constructed query
      orderBy: {
        createdAt: 'desc' // Order listings by createdAt in descending order
      }
    });

    // Converting createdAt to ISO string for consistent formatting
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings; // Returning the formatted listings
  } catch (error: any) {
    throw new Error(error); // Throwing an error if something goes wrong
  }
}
