import classes from "./DashboardHeader.module.css";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

const DashboardHeader = () => {
  const items = useSelector((state) => state.cart.items);
  const router = useRouter();

  const {data: session, status} = useSession();
  const currentPath = router.pathname;

  return (
    <Fragment>
      {/* <MobileHeader /> */}
      <div className={classes["main-header"]}>
        {/* Header left */}
        <div className={classes["header-left"]}>
          <div
            className={classes.logo}
            onClick={() => {
              router.push("/admin");
            }}
          >
            FoodBearCat WebPanel
          </div>
        </div>
        {/* Header Right */}
        <div className={classes.nav}>
          <ul>
            <li
              className={`${
                currentPath === "/" ? classes["active-link"] : ""
              } ${classes["long-header"]}`}
              onClick={() => {
                router.push("/");
              }}
            >
              HomePage
            </li>

            <li
              className={`${
                currentPath.includes("menu") ? classes["active-link"] : ""
              }`}
              onClick={() => {
                router.push("/admin/menus");
              }}
            >
              Menus
            </li>
            <li
              onClick={() => {
                router.push("/admin/accounts");
              }}
            >
              <span
                className={`${
                  currentPath.includes("account") ? classes["active-link"] : ""
                }`}
              >
                Accounts
              </span>
            </li>

            <li
              onClick={() => {
                router.push("/admin/orders");
              }}
            >
              <span
                className={`${
                  currentPath.includes("order") ? classes["active-link"] : ""
                }`}
              >
                Orders
              </span>
            </li>
            {!session && (
              <li
                className={`${
                  currentPath === "/signin" ? classes["active-link"] : ""
                }`}
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Login
              </li>
            )}
            {session && (
              <li
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default DashboardHeader;
