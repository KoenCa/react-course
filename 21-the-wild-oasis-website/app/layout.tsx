import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "The Wild Oasis",
};

export default function Root({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
