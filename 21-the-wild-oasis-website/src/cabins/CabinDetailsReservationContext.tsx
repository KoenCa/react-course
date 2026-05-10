"use client";

import { createContext, Dispatch, ReactNode, use, useState } from "react";
import { DateRange } from "react-day-picker";

export interface CabinDetailsReservationContext {
  range: DateRange | undefined;
  setRange: Dispatch<DateRange | undefined>;
  resetRange: () => void;
}

const CabinDetailsReservationContext =
  createContext<CabinDetailsReservationContext>({
    range: undefined,
    setRange: () => undefined,
    resetRange: () => undefined,
  });

const initialState = {
  from: undefined,
  to: undefined,
};

function CabinDetailsReservationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <CabinDetailsReservationContext.Provider
      value={{ range, setRange, resetRange }}
    >
      {children}
    </CabinDetailsReservationContext.Provider>
  );
}

function useCabinDetailsReservation() {
  const context = use(CabinDetailsReservationContext);

  if (context === undefined)
    throw new Error(
      "CabinDetailsReservationContext was used outside CabinDetailsReservationProvider",
    );

  return context;
}

export { CabinDetailsReservationProvider, useCabinDetailsReservation };
