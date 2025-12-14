import styled from "styled-components";
import { DashboardBox } from "./DashboardBox";
import { Heading } from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import type { Database } from "../../services/supabase/database.types";
import { eachDayOfInterval } from "date-fns/fp";
import { format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  min-height: fit-content;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

interface SalesCharts {
  bookings?: {
    created_at: Database["public"]["Tables"]["Bookings"]["Row"]["created_at"];
    totalPrice: Database["public"]["Tables"]["Bookings"]["Row"]["totalPrice"];
    extrasPrice: Database["public"]["Tables"]["Bookings"]["Row"]["extrasPrice"];
  }[];
  numberOfDays: number;
}

export const SalesCharts = ({ bookings, numberOfDays }: SalesCharts) => {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numberOfDays - 1),
    end: new Date(),
  });

  const chartData = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales:
        bookings
          ?.filter((booking) => isSameDay(date, booking.created_at))
          .reduce((acc, cur) => acc + (cur.totalPrice ?? 0), 0) ?? 0,
      extrasSales:
        bookings
          ?.filter((booking) => isSameDay(date, booking.created_at))
          .reduce((acc, cur) => acc + (cur.extrasPrice ?? 0), 0) ?? 0,
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer minHeight={300} height="100%" width="100%">
        <AreaChart data={chartData}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <CartesianGrid strokeDasharray="4" />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};
