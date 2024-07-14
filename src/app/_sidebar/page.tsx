import { useAuth, UserButton, useUser } from "@clerk/nextjs";

export default function UserDetail() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  
  console.log(`userId: ${userId}`)
  
  // In case the user signs out while on the page.
  if (!isLoaded || !userId || !user) {
    return null;
  }

  return (
    <div className="w-full flex flex-wrap text-ellipsis whitespace-nowrap gap-3 items-center mx-3">
      <span className="flex border-2 border-slate-500 hover:bg-opacity-50 rounded-full">
        <UserButton afterSignOutUrl="/sign-in"></UserButton>
      </span>
      <span className="flex select-none">
        {user.username || user.firstName}
      </span>
    </div>
  );
}
