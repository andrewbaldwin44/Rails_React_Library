import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthForm from "~/components/Auth/AuthForm";
import FourOhFour from "~/routes/FourOhFour";
import Home from "~/routes/Home";
import Layout from "~/routes/Layout";
import Library from "~/routes/Library";
import Profile from "~/routes/Profile";
import RequireAuth from "~/routes/RequireAuth";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<AuthForm isAccountCreated />} />
          <Route path="sign-up" element={<AuthForm />} />
          <Route path="profile" element={<Profile />} />
          <Route element={<RequireAuth />}>
            <Route path="library" element={<Library />} />
          </Route>
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
