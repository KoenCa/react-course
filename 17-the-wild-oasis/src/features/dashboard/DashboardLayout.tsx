import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { Spinner } from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export const DashboardLayout = () => {
  const { recentBookings, isLoadingRecentBookings } = useRecentBookings();
  const { recentStays, confirmedRecentStays, isLoadingRecentStays } =
    useRecentStays();

  if (isLoadingRecentBookings || isLoadingRecentStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Statistics</div>
      <div>Chart staty duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};
