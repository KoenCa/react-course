import {
  getBookedDatesByCabinId,
  getSettings,
} from "@/src/shared/lib/data-service";
import { CabinDetailsReservationCalendar } from "./CabinDetailsReservationCalendar";
import { CabinDetailsReservationForm } from "./CabinDetailsReservationForm";

export async function CabinDetailsReservation({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-100">
      <CabinDetailsReservationCalendar
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <CabinDetailsReservationForm cabin={cabin} />
    </div>
  );
}
