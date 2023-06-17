import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 gap-4 px-4 py-8 md:flex-row">
      {children}
    </main>
  );
};

export default Layout;
