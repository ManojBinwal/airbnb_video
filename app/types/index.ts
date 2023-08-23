
//These types provide a way to handle data from the database while ensuring that sensitive date and time fields are represented in a safer way as strings. It's often a good practice to use these safer types when exposing data from your backend API to your frontend to prevent potential security issues and inconsistencies.

import { Listing, Reservation, User } from "@prisma/client";

// Define a type to represent a safer version of the "Listing" type.
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string; // Modify the "createdAt" field to be represented as a string.
};

// Define a type to represent a safer version of the "Reservation" type.
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string; // Modify the "createdAt" field to be represented as a string.
  startDate: string; // Modify the "startDate" field to be represented as a string.
  endDate: string; // Modify the "endDate" field to be represented as a string.
  listing: SafeListing; // Reference the safer "SafeListing" type for the "listing" field.
};

// Define a type to represent a safer version of the "User" type.
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string; // Modify the "createdAt" field to be represented as a string.
  updatedAt: string; // Modify the "updatedAt" field to be represented as a string.
  emailVerified: string | null; // Modify the "emailVerified" field to be nullable and represented as a string or null.
};
