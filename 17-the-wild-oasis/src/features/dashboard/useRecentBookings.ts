import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../services/api/apiBookings";
import { useLastNumberOfDays } from "./hooks/useLastNumberOfDays";

export const useRecentBookings = () => {
  const numDays = useLastNumberOfDays()
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isLoading: isLoadingRecentBookings } = useQuery(
    {
      queryFn: () => getBookingsAfterDate(queryDate),
      queryKey: ["bookings", `last-${numDays}`],
    },
  );

  return { recentBookings, isLoadingRecentBookings };
};
