import { Spinner } from '../../ui/Spinner'
import { CabinRow } from './CabinRow'
import { useListCabins } from './useListCabins'
import { Table } from '../../ui/Table'
import { Menus } from '../../ui/Menus'

export const CabinTable = () => {
  const { isLoadingCabins, cabins } = useListCabins()

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
          data={cabins}
          renderRow={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}
