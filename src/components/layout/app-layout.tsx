interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  return <div>{children}</div>;
};

AppLayout.displayName = "AppLayout";

export default AppLayout;
