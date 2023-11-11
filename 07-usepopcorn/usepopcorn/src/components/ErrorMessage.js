export function ErrorMessage({ errorMsg }) {
  return (
    <p className="error">
      <span role="img">⛔️</span>
      {errorMsg}
    </p>
  );
}
