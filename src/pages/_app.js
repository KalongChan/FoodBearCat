import Layout from "../components/Layout/Layout";
import DashboardLayout from "../components/Dashboard/DashboardLayout/DashboardLayout";
import {store} from "../store/store";
import {Provider} from "react-redux";
import {SessionProvider} from "next-auth/react";
import "../styles/globals.css";
import Head from "next/head";
import {Fragment} from "react";

function MyApp({Component, session, pageProps, ...appProps}) {
  const isLayoutNeeded = appProps.router.pathname.startsWith(`/admin`);
  const LayoutComponent = isLayoutNeeded ? DashboardLayout : Layout;

  const pathName = () => {
    let currentPath = appProps.router.pathname;

    if (appProps.router.pathname.startsWith(`/admin`)) {
      return "| WebPanel";
    }
    if (currentPath === "/") {
      return "";
    }

    let formattedPath =
      "| " +
      currentPath.replace("/", "").charAt(0).toUpperCase() +
      currentPath.slice(2);
    return formattedPath;
  };

  return (
    <Fragment>
      <Head>
        <title>{`FoodBearCat ${pathName()}`}</title>
      </Head>
      <Provider store={store}>
        <SessionProvider session={session}>
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </SessionProvider>
      </Provider>
    </Fragment>
  );
}

export default MyApp;
