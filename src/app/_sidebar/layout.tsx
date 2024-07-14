'use client'
import { usePathname } from 'next/navigation'

import { Metadata } from "next";
import Link from "next/link";
import UserDetail from "../_sidebar/page";

// export const metadata: Metadata = {
//   title: {
//     default: "DashBoard | Mind Maps",
//     template: "%s",
//   },
//   description: "Mind Maps by Charvit Zalavadiya",
// };




export default function SideBar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="m-1 w-full">
      <div className="w-screen grid grid-cols-5 bg-primaryBackground p-2 text-white overflow-x-hidden h-screen">
        <span className="p-3 col-span-1 w-auto fixed rounded-lg flex h-fit bg-sidebarGradient flex-col select-none tracking-wide text-lg">
          <section className="text-lg font-semibold tracking-wider bg-headingTextGradient h-6 flex items-center justify-center w-full bg-clip-text text-transparent">
            Mind Maps
          </section>

          <span className="w-full h-px rounded-full my-2 bg-dividerGradient"></span>

          <section className="w-full h-14 bg-navBlockBackground rounded-md p-3 text-ellipsis flex-wrap">
            {<UserDetail />}
          </section>

          <section className="w-full h-auto bg-navBlockBackground rounded-md py-2 my-2">
            <ul className="mx-3">
              <Link href="/dashboard/flowcharts">
                <li
                  className={`flex items-center gap-3 my-2 px-3 hover:bg-navBlockBackgroundHover cursor-pointer p-2 rounded-md select-none ${pathname === '/dashboard/flowcharts' ? 'bg-selectedFunctionalityBackgroundColor border border-stone-500' : 'bg-transparent'}`}
                >
                  <span className="material-symbols-rounded">account_tree</span>
                  Flow Charts
                </li>
              </Link>
              <Link href="/dashboard/notes">
              <li className={`flex items-center gap-3 my-2 px-3 hover:bg-navBlockBackgroundHover cursor-pointer p-2 rounded-md select-none ${pathname === '/dashboard/notes' ? 'bg-selectedFunctionalityBackgroundColor border border-stone-500' : 'bg-transparent'}`}>
                <span className="material-symbols-outlined">edit_note</span>
                Notes
              </li>
              </Link>
              <Link href="/dashboard/groups">
              <li className={`flex items-center gap-3 my-2 px-3 hover:bg-navBlockBackgroundHover cursor-pointer p-2 rounded-md select-none ${pathname === '/dashboard/groups' ? 'bg-selectedFunctionalityBackgroundColor border border-stone-500' : 'bg-transparent'}`}>
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
              <Link href="/dashboard/favourites" className={`w-1/2 justify-center align-middle h-auto bg-navBlockBackground select-none rounded-md px-3 py-2 my-0 text-center hover:bg-navBlockBackgroundHover cursor-pointer ${pathname === '/dashboard/favourites' ? 'bg-selectedFunctionalityBackgroundColor border border-stone-500' : 'bg-navBlockBackground'}`}>
              <span className="material-symbols-outlined">
                star
              </span>
              </Link>
            </ul>
          </section>
        </span>

        <main className='col-span-4 mr-3 col-start-2 w-full'>{children}</main>
      </div>
    </div>
  );
}
