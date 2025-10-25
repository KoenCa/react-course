import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import styled from 'styled-components'

const StyledModal = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  display: grid;
  place-content: center;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`

const ModalContext = createContext<{
  openName: string
  open: (opensWindowName: string) => void
  close: () => void
}>()

const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState('')

  const open = setOpenName
  const close = () => setOpenName('')

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}

const Open = ({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement<{ onClick: () => void }>
  opens: string
}) => {
  const { open } = useContext(ModalContext)

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  })
}

const Window = ({
  children,
  name,
}: {
  children: ReactElement<{ onCloseModal: () => void }>
  name: string
}) => {
  const { openName, close } = useContext(ModalContext)

  if (name !== openName) return null

  return createPortal(
    <Overlay onClick={close}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export { Modal }
