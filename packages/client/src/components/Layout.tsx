import { PropsWithChildren } from "react";
import "react-loading-skeleton/dist/skeleton.css";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row">
        {children}
      </main>
    </>
  );
};

export default Layout;
