import Layout from "../components/Layout/Layout";
import DashboardLayout from "../components/Dashboard/DashboardLayout/DashboardLayout";
import {store} from "../store/store";
import {Provider} from "react-redux";
import {SessionProvider} from "next-auth/react";
import "../styles/globals.css";

function MyApp({Component, session, pageProps, ...appProps}) {
  const isLayoutNeeded = appProps.router.pathname.startsWith(`/admin`);
  const LayoutComponent = isLayoutNeeded ? DashboardLayout : Layout;

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
