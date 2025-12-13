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
        <main className="lg:ml-128 p-4">
          <ScrollArea
            scrollFade
            className="h-full max-h-[calc(100vh-48px)] overflow-y-auto"
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
