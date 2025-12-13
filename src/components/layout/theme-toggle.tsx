import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { app_themes } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const AppThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const themes = [app_themes.system, app_themes.light, app_themes.dark];
    const currentIndex = themes.indexOf(theme || app_themes.system);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case app_themes.light:
        return <Sun className="h-5 w-5" />;
      case app_themes.dark:
        return <Moon className="h-5 w-5" />;
      case app_themes.system:
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <Button
      onClick={cycleTheme}
      variant="ghost"
      size="icon"
      aria-label={`Current theme: ${theme}. Click to cycle to next theme.`}
      title={`Current: ${theme}`}
    >
      {getIcon()}
    </Button>
  );
};

const ThemeToggle = dynamic(() => Promise.resolve(AppThemeToggle), {
  ssr: false,
});

export default ThemeToggle;
