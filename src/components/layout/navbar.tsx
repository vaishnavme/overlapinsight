import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { Text } from "../ui/text";
import { app_name, app_paths } from "@/lib/constants";

const Navbar = () => (
  <nav className="h-12 px-4 border-b flex items-center justify-between">
    <Text
      render={<Link href={app_paths.home} />}
      className="font-serif text-lg font-medium"
    >
      {app_name}
    </Text>
    <ThemeToggle />
  </nav>
);

Navbar.displayName = "Navbar";

export default Navbar;
