import { app_name } from "@/lib/constants";
import ThemeToggle from "./theme-toggle";
import { Text } from "../ui/text";

const Navbar = () => (
  <nav className="h-12 px-4 border-b flex items-center justify-between">
    <Text className="font-serif text-lg font-medium">{app_name}</Text>
    <ThemeToggle />
  </nav>
);

Navbar.displayName = "Navbar";

export default Navbar;
