import { SideNavigation } from "@/components/SideNavigation";

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />

      <div>{children}</div>
    </div>
  );
}
