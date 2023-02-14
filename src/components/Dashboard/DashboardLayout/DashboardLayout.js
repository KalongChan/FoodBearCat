import {Fragment, Suspense} from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({children}) => {
  return (
    <Fragment>
      <DashboardHeader />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
    </Fragment>
  );
};
export default Layout;
