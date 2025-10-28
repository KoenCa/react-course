interface EmptyProps {
  resourceName: string
}

export const Empty = ({ resourceName }) => {
  return <p>No {resourceName} could be found.</p>
}
