import Link from "next/link";
import { ReservationCard } from "@/components/ReservationCard";

export const metadata: Metadata = {
  title: "Reservations",
};

export default function Reservations() {
  const bookings = [];

  return (
    <main>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link href="/cabins" className="underline text-accent-500">
            Luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard key={booking.id} booking={booking} />
          ))}
        </ul>
      )}
    </main>
  );
}
