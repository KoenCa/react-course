import styled from 'styled-components'

import { BookingDataBox } from './BookingDataBox'
import { Row } from '../../ui/Row'
import { Heading } from '../../ui/Heading'
import { Tag } from '../../ui/Tag'
import { ButtonGroup } from '../../ui/ButtonGroup'
import { Button } from '../../ui/Button'
import { ButtonText } from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useNavigate, useParams } from 'react-router-dom'
import { useBooking } from './useBooking'
import { Spinner } from '../../ui/Spinner'
import { Empty } from '../../ui/Empty'
import { useCheckout } from '../check-in-out/useCheckout'
import { Modal } from '../../ui/Modal'
import { ConfirmDelete } from '../../ui/ConfirmDelete'
import { useDeleteBooking } from './useDeleteBooking'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

export const BookingDetail = () => {
  const navigate = useNavigate()
  const moveBack = useMoveBack()
  const { bookingId } = useParams()

  const { isLoading, error, booking } = useBooking(Number(bookingId))
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeletingBooking } = useDeleteBooking()

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  if (isLoading) return <Spinner />
  if (!booking || error) return <Empty resourceName={'booking'} />

  const handleCheckInClick = () => {
    navigate(`/checkin/${booking.id}`)
  }

  const handleCheckOutClick = () => {
    checkout(booking.id)
  }

  const handleDeleteClick = () => {
    deleteBooking(booking.id, {
      onSuccess: () => {
        navigate(-1)
      },
    })
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag color={statusToTagName[booking.status]}>
            {booking.status?.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === 'unconfirmed' && (
          <Button onClick={handleCheckInClick}>Check in</Button>
        )}

        {booking.status === 'checked-in' && (
          <Button onClick={handleCheckOutClick} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={handleDeleteClick}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}
