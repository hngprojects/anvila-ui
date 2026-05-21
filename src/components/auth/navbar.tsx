import Link from "next/link";
import { Logo } from "@/components/icons";

export const AuthNavBar = () => {
  return (
    <header className="flex h-16 w-full items-center bg-background px-6 sm:px-10 max-[700px]:invisible">
      <div className="mx-auto flex w-full max-w-[960px] items-center">
        <Link
          href="/"
          className="flex items-center gap-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-brand"
        >
          <Logo />
          <span className="text-base font-bold tracking-tight text-zinc-900">Anvila</span>
        </Link>
      </div>
    </header>
  );
};
