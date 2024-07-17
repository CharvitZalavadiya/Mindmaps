"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

// Define navLinks outside the component to prevent recreation on each render
const navLinks = [
  {
    href: "/flowcharts",
    icon: "account_tree",
    label: "Flow Charts",
    iconType: "rounded",
  },
  {
    href: "/notes",
    icon: "edit_note",
    label: "Notes",
    iconType: "outlined",
  },
  {
    href: "/groups",
    icon: "groups",
    label: "Groups",
    iconType: "outlined",
  },
  {
    href: "/favourites",
    icon: "star",
    label: "Favourites",
    iconType: "outlined",
  },
];

export default function SideBar() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const pathname = usePathname();
  const [userDisplayName, setUserDisplayName] = useState("");

  useEffect(() => {
    if (user) {
      setUserDisplayName(user.username || user.firstName || "");
    }
  }, [user]);

  console.log(`userId: ${userId}`);

  // In case the user signs out while on the page.
  if (!isLoaded || !userId || !user) {
    return null;
  }

  return (
    <span className="p-3 rounded-lg flex h-fit bg-sidebarGradient flex-col select-none tracking-wide text-lg">
      <section className="text-lg font-semibold tracking-wider bg-headingTextGradient h-6 flex items-center justify-center w-full bg-clip-text text-transparent">
        Mind Maps
      </section>

      <span className="w-full h-px rounded-full my-2 bg-dividerGradient"></span>

      <section className="w-full h-14 bg-navBlockBackground rounded-md p-3 text-ellipsis flex-wrap">
        <div className="w-full flex flex-wrap text-ellipsis whitespace-nowrap gap-3 items-center mx-3">
          <span className="flex border-2 border-slate-500 hover:bg-opacity-50 rounded-full">
            <UserButton afterSignOutUrl="/sign-in" />
          </span>
          <span className="flex select-none">
            {userDisplayName}
          </span>
        </div>
      </section>

      <section className="w-full h-auto text-nowrap bg-navBlockBackground rounded-md py-2 my-2">
        <ul className="mx-3">
          {navLinks.map(({ href, icon, label, iconType }) => (
            <Link key={href} href={href}>
              <li
                className={`flex items-center gap-3 my-2 px-3 hover:bg-navBlockBackgroundHover cursor-pointer p-2 rounded-md select-none ${
                  pathname === href
                    ? "bg-selectedFunctionalityBackgroundColor border border-stone-500"
                    : "bg-transparent"
                }`}
              >
                <span className={`material-symbols-${iconType}`}>{icon}</span>
                {label}
              </li>
            </Link>
          ))}
        </ul>
      </section>

    </span>
  );
}
