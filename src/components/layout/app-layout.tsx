import Navbar from "./navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

AppLayout.displayName = "AppLayout";

export default AppLayout;
