import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/api/apiBookings";

export const useTodayActivity = () => {
  const { data: activities, isLoading: isLoadingTodayActivity } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoadingTodayActivity };
};
