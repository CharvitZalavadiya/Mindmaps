"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";

export default function SideBar() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  const pathname = usePathname();

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
            <UserButton afterSignOutUrl="/sign-in"></UserButton>
          </span>
          <span className="flex select-none">
            {user.username || user.firstName}
          </span>
        </div>
      </section>

      <section className="w-full h-auto text-nowrap bg-navBlockBackground rounded-md py-2 my-2">
        <ul className="mx-3">
          <Link href="/flowcharts">
            <li
              className={`flex items-center gap-3 my-2 px-3 hover:bg-navBlockBackgroundHover cursor-pointer p-2 rounded-md select-none ${
                pathname === "/flowcharts"
                  ? "bg-selectedFunctionalityBackgroundColor border border-stone-500"
                  : "bg-transparent"
              }`}
            >
              <span className="material-symbols-rounded">account_tree</span>
              Flow Charts
            </li>
          </Link>
          <Link href="/notes">
            <li
              className={`flex items-center gap-3 my-2 px-3 hover:bg-navBlockBackgroundHover cursor-pointer p-2 rounded-md select-none ${
                pathname === "/notes"
                  ? "bg-selectedFunctionalityBackgroundColor border border-stone-500"
                  : "bg-transparent"
              }`}
            >
              <span className="material-symbols-outlined">edit_note</span>
              Notes
            </li>
          </Link>
          <Link href="/groups">
            <li
              className={`flex items-center gap-3 my-2 px-3 hover:bg-navBlockBackgroundHover cursor-pointer p-2 rounded-md select-none ${
                pathname === "/groups"
                  ? "bg-selectedFunctionalityBackgroundColor border border-stone-500"
                  : "bg-transparent"
              }`}
            >
              <span className="material-symbols-outlined">groups</span>
              Groups
            </li>
          </Link>
        </ul>
      </section>

      <section>
        <ul className="flex">
          <span className="material-symbols-outlined w-1/2 h-auto bg-navBlockBackground rounded-md px-3 py-3 my-0 mr-3 text-center hover:bg-navBlockBackgroundHover cursor-pointer">
            search
          </span>
          <Link
            href="/favourites"
            className={`w-1/2 justify-center align-middle h-auto bg-navBlockBackground select-none rounded-md px-3 py-2 my-0 text-center hover:bg-navBlockBackgroundHover cursor-pointer ${
              pathname === "/favourites"
                ? "bg-selectedFunctionalityBackgroundColor border border-stone-500"
                : "bg-navBlockBackground"
            }`}
          >
            <span className="material-symbols-outlined">star</span>
          </Link>
        </ul>
      </section>
    </span>
  );
}
