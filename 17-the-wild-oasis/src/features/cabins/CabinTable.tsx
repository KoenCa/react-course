import { Spinner } from '../../ui/Spinner'
import { CabinRow } from './CabinRow'
import { useListCabins } from './useListCabins'
import { Table } from '../../ui/Table'
import { Menus } from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

export const CabinTable = () => {
  const [searchParams] = useSearchParams({ discount: 'all' })
  const { isLoadingCabins, cabins } = useListCabins()

  const filteredCabins = useMemo(() => {
    if (!cabins) return []

    const filterValue = searchParams.get('discount')

    if (filterValue === 'all') return cabins
    if (filterValue === 'no-discount')
      return cabins?.filter(cabin => cabin.discount === 0)
    if (filterValue === 'with-discount')
      return cabins?.filter(cabin => cabin.discount && cabin.discount > 0)
  }, [cabins, searchParams])

  if (isLoadingCabins) return <Spinner />

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          renderRow={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}
