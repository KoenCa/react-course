import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`

const PaginationButton = styled.button<{ active?: boolean }>`
  background-color: ${props =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${props => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`

const PAGE_SIZE = 10

interface PaginationProps {
  count: number
}

export const Pagination = ({ count }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'))

  const pageAmount = Math.ceil(count / PAGE_SIZE)
  const isOnFirstPage = currentPage === 1
  const isOnLastPage = currentPage === pageAmount
  const currentPageItemsBegin = (currentPage - 1) * PAGE_SIZE + 1
  const currentPageItemsEnd = isOnLastPage ? count : currentPage * PAGE_SIZE

  const nextPage = () => {
    const next = isOnLastPage ? currentPage : currentPage + 1

    setSearchParams(prevSearchParams => {
      prevSearchParams.set('page', next.toString())
      return prevSearchParams
    })
  }

  const prevPage = () => {
    const previous = isOnFirstPage ? currentPage : currentPage - 1

    setSearchParams(prevSearchParams => {
      prevSearchParams.set('page', previous.toString())
      return prevSearchParams
    })
  }

  if (pageAmount <= 1) return null

  return (
    <StyledPagination>
      <P>
        Showing <span>{currentPageItemsBegin}</span> to{' '}
        <span>{currentPageItemsEnd}</span> of <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton disabled={isOnFirstPage} onClick={prevPage}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton disabled={isOnLastPage} onClick={nextPage}>
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}
