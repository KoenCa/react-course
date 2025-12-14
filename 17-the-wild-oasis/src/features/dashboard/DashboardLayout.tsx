import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { Spinner } from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { Stats } from "./Stats";
import { useLastNumberOfDays } from "./hooks/useLastNumberOfDays";
import { useListCabins } from "../cabins/useListCabins";
import { SalesCharts } from "./SalesChart";
import { DurationChart } from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export const DashboardLayout = () => {
  const numberOfDays = useLastNumberOfDays();
  const { recentBookings, isLoadingRecentBookings } = useRecentBookings();
  const { recentStays, confirmedRecentStays, isLoadingRecentStays } =
    useRecentStays();
  const { cabins, isLoadingCabins } = useListCabins();

  if (isLoadingRecentBookings || isLoadingRecentStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedRecentStays}
        numberOfDays={numberOfDays}
        cabinCount={cabins?.length ?? 0}
      />
      <DurationChart confirmedStays={confirmedRecentStays} />
      <SalesCharts bookings={recentBookings} numberOfDays={numberOfDays} />
    </StyledDashboardLayout>
  );
};
