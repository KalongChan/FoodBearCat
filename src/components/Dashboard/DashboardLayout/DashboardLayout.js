import {Fragment, Suspense} from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSession} from "next-auth/react";

const Layout = ({children}) => {
  const {data: session, status} = useSession();
  return (
    <Fragment>
      {session && <DashboardHeader />}
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
