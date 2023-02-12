import Layout from "../components/Layout/Layout";
import DashboardLayout from "../components/Dashboard/DashboardLayout/DashboardLayout";
import {store} from "../store/store";
import {Provider} from "react-redux";
import "../styles/globals.css";

function MyApp({Component, pageProps, ...appProps}) {
  const isLayoutNeeded = appProps.router.pathname.startsWith(`/admin`);
  const LayoutComponent = isLayoutNeeded ? DashboardLayout : Layout;

  return (
    <Provider store={store}>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </Provider>
  );
}

export default MyApp;
