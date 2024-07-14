import { Metadata } from "next";
import SideBar from "@/app/_sidebar/layout";

export const metadata: Metadata = {
  title: {
    default: "Notes | Mind Maps",
    template: "%s",
  },
  description: "Mind Maps by Charvit Zalavadiya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="w-full">
        {<SideBar children={children} />}
      </main>
  );
}
