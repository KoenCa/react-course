import type { Metadata } from "next";
import { getCabin, getCabins } from "@/lib/data-service";
import { Reservation } from "@/components/Reservation";
import { Suspense } from "react";
import { Spinner } from "@/components/Spinner";
import { CabinDetails } from "@/components/Cabin";

type pageProps = PageProps<"/cabins/[cabinId]">;

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function PageCabinDetails({ params }: pageProps) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinDetails cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
