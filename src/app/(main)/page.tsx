import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {


  return (
    <div className="flex items-center justify-around h-screen">
      <span className="text-5xl bg-headingTextGradient font-bold tracking-wider bg-clip-text text-transparent">Mind Maps</span>
      <span>
        <Link href="/sign-in">
        <Button className="bg-authButtonGradientBackground rounded-mdRadius px-10 font-smWeight text-smFont text-white tracking-wider mr-10">
          SIGN IN
        </Button>
        </Link>
        <Link href="/sign-up">
        <Button className="bg-authButtonGradientBackground rounded-mdRadius px-10 font-smWeight text-smFont text-white tracking-wider">
          SIGN UP
        </Button>
        </Link>
      </span>
    </div>
  );
}
