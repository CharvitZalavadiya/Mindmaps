import { Metadata } from "next";
import SideBar from "@/app/_sidebar/layout";

export const metadata: Metadata = {
  title: {
    default: "Groups | Mind Maps",
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
    <html>
      <body className="w-screen">
        {<SideBar children={children} />}
      </body>
    </html>
  );
}
