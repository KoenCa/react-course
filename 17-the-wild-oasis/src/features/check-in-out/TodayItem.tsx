import styled from "styled-components";
import type { Database } from "../../services/supabase/database.types";
import { Tag } from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import { Button } from "../../ui/Button";
import { Link } from "react-router-dom";
import { CheckoutButton } from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

interface TodayItem {
  activity?: Database["public"]["Tables"]["Bookings"]["Row"] & {
    Guests: {
      fullName: Database["public"]["Tables"]["Guests"]["Row"]["fullName"];
      nationality: Database["public"]["Tables"]["Guests"]["Row"]["nationality"];
      countryFlag: Database["public"]["Tables"]["Guests"]["Row"]["countryFlag"];
    } | null;
  };
}

export const TodayItem = ({ activity }: TodayItem) => {
  const { id, status, Guests, numNights } = activity ?? {};

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag color="green">Arriving</Tag>}
      {status === "checked-in" && <Tag color="blue">Departing</Tag>}

      <Flag
        src={Guests?.countryFlag ?? ""}
        alt={`Flag of ${Guests?.nationality}`}
      />
      <Guest>{Guests?.fullName}</Guest>
      <div>{numNights}</div>

      {status === "unconfirmed" && (
        <Button
          variation="primary"
          size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};
