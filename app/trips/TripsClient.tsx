// The code defines a React component called TripsClient that is responsible for displaying a list of reservations. It allows users to cancel their reservations. The component imports necessary libraries, components, and types. It uses hooks like useState, useCallback, and the Next.js useRouter hook.

// The TripsClient component receives two props: an array of reservations and an optional currentUser. It displays a title and subtitle, arranges reservation cards in a responsive grid layout, and provides a cancellation function for each reservation.

// When a user initiates a cancellation, the component sends a DELETE request to an API endpoint using Axios. Success and error toast messages are displayed accordingly. The component also ensures that cancellation is disabled during the deletion process.

'use client';

// Import necessary libraries and components
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

// Define the props interface for the TripsClient component
interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

// Define the TripsClient component
const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  // Initialize the router for navigation
  const router = useRouter();
  // Initialize the state to keep track of the reservation being deleted
  const [deletingId, setDeletingId] = useState('');

  // Define the onCancel function using the useCallback hook
  const onCancel = useCallback((id: string) => {
    // Set the deletingId to the current reservation's id
    setDeletingId(id);

    // Send a DELETE request to the API to cancel the reservation
    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        // Display a success toast message
        toast.success('Reservation cancelled');
        // Refresh the router to update the UI
        router.refresh();
      })
      .catch((error) => {
        // Display an error toast message if the request fails
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        // Reset the deletingId state after the request completes
        setDeletingId('');
      });
  }, [router]);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {/* Map through reservations and render a ListingCard for each */}
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

// Export the TripsClient component as the default export of this module
export default TripsClient;




