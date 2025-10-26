import styled from 'styled-components'
import type { Database } from '../../services/supabase/database.types'
import { formatCurrency } from '../../utils/helpers'
import { CabinForm } from './CabinForm'
import { useDeleteCabin } from './useDeleteCabin'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { useCreateCabin } from './useCreateCabin'
import { Modal } from '../../ui/Modal'
import { ConfirmDelete } from '../../ui/ConfirmDelete'
import { Table } from '../../ui/Table'
import { Menus } from '../../ui/Menus'

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

interface CabinRowProps {
  cabin: Database['public']['Tables']['Cabins']['Row']
}

export const CabinRow = ({ cabin }: CabinRowProps) => {
  const {
    id: cabinId,
    name,
    description,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin

  const { createCabin } = useCreateCabin()
  const { isDeleting, deleteCabin } = useDeleteCabin()

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    })
  }

  return (
    <Table.Row>
      <Img src={image || undefined} />

      <Cabin>{name}</Cabin>

      <div>Fits up to {maxCapacity}</div>

      <Price>{regularPrice ? formatCurrency(regularPrice || 0) : '/'}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount || 0)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CabinForm cabinToUpdate={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  )
}
