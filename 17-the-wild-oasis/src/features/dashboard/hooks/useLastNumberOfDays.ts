import { useSearchParams } from "react-router-dom";

/**
 * @returns amount of days from the 'last' search param
 */
export const useLastNumberOfDays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  return numDays
}
