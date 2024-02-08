import { Outlet } from "react-router-dom";

import GlobalStyles from "~/components/GlobalStyles";

export default function Layout() {
  return (
    <>
      <GlobalStyles />

      <Outlet />
    </>
  );
}
