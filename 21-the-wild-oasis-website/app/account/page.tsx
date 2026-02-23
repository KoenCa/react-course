import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your account",
};

export default function Account() {
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, Koen
    </h2>
  );
}
