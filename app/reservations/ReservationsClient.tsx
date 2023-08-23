// In this code:

      // The ReservationsClient component receives a list of reservations (reservations) and the current user (currentUser) as props.

      // Inside the component, it defines the router using the useRouter hook from Next.js.

      // The onCancel function is defined using the useCallback hook. This function is used to cancel a guest reservation. It sends a DELETE request to the /api/reservations/:id endpoint using Axios. If the request is successful, it displays a success toast message and refreshes the page using router.refresh(). If there's an error, it displays an error toast message.

      // The component then maps through the reservations and renders a ListingCard for each reservation. It passes relevant data including the reservation ID, the onCancel function, and some additional properties to the ListingCard component.

      // The ListingCard component will presumably display details about the reservation, the associated listing, and provide a button to cancel the reservation.


'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types"
;
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
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
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default ReservationsClient;