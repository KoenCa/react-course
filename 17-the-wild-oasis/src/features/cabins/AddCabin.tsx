import { Button } from '../../ui/Button'
import { Modal } from '../../ui/Modal'
import { CabinForm } from './CabinForm'

export const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CabinForm />
      </Modal.Window>
    </Modal>
  )
}
