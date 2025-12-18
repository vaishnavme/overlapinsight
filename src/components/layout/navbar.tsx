import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { Text } from "../ui/text";
import { app_name, app_paths } from "@/lib/constants";
import Image from "next/image";

const Navbar = () => (
  <nav className="h-12 px-2 sm:px-4 border-b flex items-center justify-between">
    <div className="flex items-center gap-x-1">
      <Link href={app_paths.home}>
        <Image
          src="/overlapinsight.png"
          alt={`${app_name} logo`}
          width={24}
          height={24}
          quality={100}
        />
      </Link>

      <Text
        render={<Link href={app_paths.home} />}
        className="font-serif text-lg font-medium"
      >
        {app_name}
      </Text>
    </div>
    <ThemeToggle />
  </nav>
);

Navbar.displayName = "Navbar";

export default Navbar;
