import { Form } from "react-router-dom"

function SearchOrder() {
  return (
    <Form method="get" action="/order/">
      <input name="orderId" type="text" placeholder="Searh order #" required />
    </Form>
  )
}

export default SearchOrder
