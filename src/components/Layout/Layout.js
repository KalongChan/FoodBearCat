import {Fragment, useEffect} from "react";
import Header from "../Header/Header";
import {getLocalStorageData} from "@/store/cartSlice";
import {store} from "../../store/store";
import Footer from "../Footer/Footer";

const Layout = ({children}) => {
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      store.dispatch(
        getLocalStorageData(JSON.parse(localStorage.getItem("cart")))
      );
    }
  }, []);

  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};
export default Layout;
