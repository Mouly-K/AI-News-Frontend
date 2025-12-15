function AppContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"@container/main flex flex-1 flex-col gap-2 " + className}>
      {children}
    </div>
  );
}

export default AppContainer;
