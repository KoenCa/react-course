"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type CapacityFilter = "all" | "small" | "medium" | "large";

export function CabinListFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity");

  const possibleFilters = [
    { filter: "all", buttonText: <>All cabins</> },
    { filter: "small", buttonText: <>1&mdash;3 guest(s)</> },
    { filter: "medium", buttonText: <>4&mdash;7 guests</> },
    { filter: "large", buttonText: <>8&mdash;12 guests</> },
  ];

  const handleFilter = (filter: "all" | "small" | "medium" | "large") => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("capacity", filter);

    router.replace(`${pathName}?${updatedSearchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex border border-primary-800">
      {possibleFilters.map((possibleFilter) => (
        <FilterButton
          key={possibleFilter.filter}
          filter={possibleFilter.filter}
          activeFilter={activeFilter}
          handleFilter={handleFilter}
        >
          {possibleFilter.buttonText}
        </FilterButton>
      ))}
    </div>
  );
}

function FilterButton({
  filter,
  activeFilter,
  handleFilter,
  children,
}: {
  filter: CapacityFilter;
  activeFilter: CapacityFilter | null;
  handleFilter: (filter: CapacityFilter) => void;
  children: ReactNode;
}) {
  const isActive = activeFilter === filter;

  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 hover:cursor-pointer ${isActive ? "bg-primary-700" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
