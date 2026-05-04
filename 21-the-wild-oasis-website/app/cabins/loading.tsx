import { Spinner } from "@/src/shared/components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data</p>
    </div>
  );
}
