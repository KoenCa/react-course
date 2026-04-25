import { CabinList } from "@/components/CabinList";
import { Filter } from "@/components/Filter";
import { Spinner } from "@/components/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cabins",
};

export default async function Cabins({ searchParams }: PageProps<"/cabins">) {
  const { capacity = "all" } = await searchParams;

  return (
    <main>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">Cabins</h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolom ites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense key={capacity} fallback={<Spinner />}>
        <CabinList filter={capacity} />
      </Suspense>
    </main>
  );
}
