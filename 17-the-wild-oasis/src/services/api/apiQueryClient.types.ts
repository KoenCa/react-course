
import "@tanstack/react-query";

type QueryKey = [
  "user" | "cabins" | "settings" | "bookings" | "stays" | 'today-activity',
  ...ReadonlyArray<unknown>,
];

declare module "@tanstack/react-query" {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
  }
}
