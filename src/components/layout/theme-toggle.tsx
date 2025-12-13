import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { app_themes } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const AppThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === app_themes.light ? app_themes.dark : app_themes.light);
  };

  const getIcon = () => {
    return resolvedTheme === app_themes.dark ? (
      <Moon className="h-5 w-5" />
    ) : (
      <Sun className="h-5 w-5" />
    );
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      aria-label={`Current theme: ${theme}. Click to change theme.`}
      title={`Current Theme: ${theme}`}
    >
      {getIcon()}
    </Button>
  );
};

const ThemeToggle = dynamic(() => Promise.resolve(AppThemeToggle), {
  ssr: false,
});

export default ThemeToggle;
