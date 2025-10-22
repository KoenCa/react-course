import { useState } from 'react'
import { Button } from '../../ui/Button'
import { Modal } from '../../ui/Modal'
import { CabinForm } from './CabinForm'

export const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpenModal(show => !show)}>
        Add new cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  )
}
