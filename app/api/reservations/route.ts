
//Overall, this code handles an incoming POST request, validates the input data, updates a listing with a new reservation, and returns the updated information in a JSON response.


import { NextResponse } from "next/server"; 
import prisma from "@/app/libs/prismadb"; 
import getCurrentUser from "@/app/actions/getCurrentUser"; 

export async function POST(
  request: Request, // The incoming HTTP request object.
) {
  const currentUser = await getCurrentUser(); // Calling the getCurrentUser function to get the current user.

  if (!currentUser) { // If no current user is found, return an error response.
    return NextResponse.error();
  }

  const body = await request.json(); // Parsing the JSON body of the request.
  const { 
    listingId,
    startDate,
    endDate,
    totalPrice
   } = body; // Destructuring values from the request body.

   if (!listingId || !startDate || !endDate || !totalPrice) { // Checking if all required data is present.
    return NextResponse.error(); // If any required data is missing, return an error response.
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId // Updating a listing with the given listingId.
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id, // Assigning the user ID to the reservation.
          startDate,
          endDate,
          totalPrice,
        }
      }
    }
  });

  return NextResponse.json(listingAndReservation); // Returning a JSON response containing the updated listing and reservation information.
}
