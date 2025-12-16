import { ScrollArea } from "../ui/scroll-area";
import Aside from "./aside";
import Navbar from "./navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  return (
    <div>
      <Navbar />
      <div>
        <Aside />
        <main className="lg:ml-128">
          <ScrollArea
            scrollFade
            className="h-full lg:max-h-[calc(100vh-48px)] lg:overflow-y-auto"
          >
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

AppLayout.displayName = "AppLayout";

export default AppLayout;
