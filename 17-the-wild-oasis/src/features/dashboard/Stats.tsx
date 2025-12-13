import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import type { Database } from "../../services/supabase/database.types";
import { Stat } from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { useLastNumberOfDays } from "./hooks/useLastNumberOfDays";

interface Stats {
  bookings?: {
    created_at: Database["public"]["Tables"]["Bookings"]["Row"]["created_at"];
    totalPrice: Database["public"]["Tables"]["Bookings"]["Row"]["totalPrice"];
    extrasPrice: Database["public"]["Tables"]["Bookings"]["Row"]["extrasPrice"];
  }[];
  confirmedStays?: (Database["public"]["Tables"]["Bookings"]["Row"] & {
    Guests: {
      fullName: Database["public"]["Tables"]["Guests"]["Row"]["fullName"];
    } | null;
  })[];
  numDays: number;
  cabinCount: number;
}

export const Stats = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: Stats) => {
  const numBookings = bookings?.length ?? 0;

  const totalSales =
    bookings?.reduce((acc, cur) => acc + (cur.totalPrice ?? 0), 0) ?? 0;

  const totalCheckIns = confirmedStays?.length;

  // Number of checked in nights / all available nights (number of days * number of cabins)
  const occupation = Math.round(
    ((confirmedStays?.reduce((acc, cur) => acc + (cur?.numNights ?? 0), 0) ??
      0) /
      (numDays * cabinCount)) *
      100,
  );

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Occupancy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupation}%`}
      />
    </>
  );
};
