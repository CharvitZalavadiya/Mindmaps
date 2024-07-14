import { Metadata } from "next";
import SideBar from "../_sidebar/layout";

export const metadata: Metadata = {
  title: {
    default: "Home | Mind Maps",
    template: "%s",
  },
  description: "Mind Maps by Charvit Zalavadiya",
};

export default function navbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="w-full">
        <SideBar children={children}/>
      </main>
  );
}
