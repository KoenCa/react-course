import styled from 'styled-components'

import { BookingDataBox } from './BookingDataBox'
import { Row } from '../../ui/Row'
import { Heading } from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import { Button } from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useParams } from 'react-router-dom'
import { useBooking } from './useBooking'
import { Spinner } from '../../ui/Spinner'
import { Empty } from '../../ui/Empty'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

export const BookingDetail = () => {
  const moveBack = useMoveBack()
  const { bookingId } = useParams()

  const { isLoading, error, booking } = useBooking(Number(bookingId))

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  if (isLoading) return <Spinner />
  if (!booking || error) return <Empty resourceName={'booking'} />

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status?.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}
