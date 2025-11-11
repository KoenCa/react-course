import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { createPortal } from 'react-dom'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled from 'styled-components'
import { useClickOutside } from '../hooks/useClickOutside'

interface Position {
  x: number
  y: number
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const StyledList = styled.ul<{ position: Position }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${props => props.position.x}px;
  top: ${props => props.position.y}px;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`

const MenuContext = createContext<{
  openId: number | null
  position: Position | null
  close: () => void
  open: Dispatch<SetStateAction<number | null>>
  setPosition: ({ x, y }: Position) => void
}>()

const Menus = ({ children }: { children: ReactNode }) => {
  const [openId, setOpenId] = useState<number | null>(null)
  const [position, setPosition] = useState<Position | null>(null)

  const close = () => setOpenId(null)
  const open = setOpenId

  return (
    <MenuContext.Provider
      value={{ openId, position, close, open, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export const Toggle = ({ id }: { id: number }) => {
  const { openId, close, open, setPosition } = useContext(MenuContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = e.target.closest('button').getBoundingClientRect()

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    })

    openId == null || openId !== id ? open(id) : close()
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

export const List = ({ id, children }: { id: number; children: ReactNode }) => {
  const { openId, position, close } = useContext(MenuContext)
  const isListOpen = openId === id
  const elRef = useClickOutside<HTMLUListElement>(close, isListOpen)

  if (openId !== id) return null

  return createPortal(
    <StyledList ref={elRef} position={position}>
      {children}
    </StyledList>,
    document.body
  )
}

export const Button = ({
  icon,
  onClick,
  children,
}: {
  icon: ReactNode
  onClick?: () => void
  children: ReactNode
}) => {
  const { close } = useContext(MenuContext)

  const handleClick = () => {
    onClick?.()
    close()
  }

  return (
    <li onClick={handleClick}>
      <StyledButton>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export { Menus }
