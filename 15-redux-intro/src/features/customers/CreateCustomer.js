import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    if (!fullName || !nationalId) return

    dispatch(createCustomer(fullName, nationalId))
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <form className="inputs" onSubmit={handleSubmit}>
        <div>
          <label>Customer full name</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            required
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button type="submit">Create new customer</button>
      </form>
    </div>
  );
}

export default Customer;
