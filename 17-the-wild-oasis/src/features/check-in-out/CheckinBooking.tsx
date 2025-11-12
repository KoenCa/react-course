import styled from 'styled-components'
import { BookingDataBox } from '../bookings/BookingDataBox'

import { Row } from '../../ui/Row'
import { Heading } from '../../ui/Heading'
import { ButtonGroup } from '../../ui/ButtonGroup'
import { Button } from '../../ui/Button'
import { ButtonText } from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import { useParams } from 'react-router-dom'
import { Empty } from '../../ui/Empty'
import { Spinner } from '../../ui/Spinner'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../ui/Checkbox'
import { formatCurrency } from '../../utils/helpers'
import { useCheckin } from './useCheckin'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

export const CheckinBooking = () => {
  const moveBack = useMoveBack()
  const { bookingId } = useParams()

  const [confirmPaid, setConfirmPaid] = useState<boolean>(false)

  const { isLoading, error, booking } = useBooking(Number(bookingId))

  // When the booking is loaded, we set the default state of the checkbox
  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false)
  }, [booking?.isPaid])

  const { checkin, isCheckingIn } = useCheckin()

  if (isLoading) return <Spinner />
  if (!booking || error) return <Empty resourceName={'booking'} />

  const { Guests, totalPrice, numGuests, hasBreakfast, numNights } = booking

  function handleCheckin() {
    if (!confirmPaid || !booking) return

    checkin(booking.id)
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="payment-confirmation"
          checked={confirmPaid}
          disabled={booking.isPaid || isCheckingIn || false}
          onChange={() => setConfirmPaid(confirm => !confirm)}
        >
          I confirm that {Guests?.fullName} has paid the total amount of{' '}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}
