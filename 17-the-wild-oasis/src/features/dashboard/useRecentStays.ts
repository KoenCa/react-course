import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/api/apiBookings";
import { useLastNumberOfDays } from "./hooks/useLastNumberOfDays";

export const useRecentStays = () => {
  const numDays = useLastNumberOfDays();
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentStays, isLoading: isLoadingRecentStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedRecentStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { recentStays, confirmedRecentStays, isLoadingRecentStays };
};
