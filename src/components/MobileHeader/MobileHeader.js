import classes from "./MobileHeader.module.css";
import {HiOutlineShoppingCart} from "react-icons/hi";
import {GiHamburgerMenu} from "react-icons/gi";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import MobileSideBar from "@/UI/SideBarBackdrop/SideBarBackdrop";
import SideBarBackdrop from "@/UI/SideBarBackdrop/SideBarBackdrop";

const MobileHeader = () => {
  const {data: session, status} = useSession();
  const items = useSelector((state) => state.cart.items);
  const [btnAnimation, setBtnAnimation] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;
  const totalCartItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    setBtnAnimation(true);
    setTimeout(() => {
      setBtnAnimation(false);
    }, 300);
  }, [totalCartItems]);

  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <Fragment>
      <div className={classes["mobile-header"]}>
        <div className={classes["hamburger-menu"]}>
          <div
            className={`${classes["hamburger-icon"]} ${
              showSideBar ? classes["hamburger-icon-active"] : ""
            }`}
            onClick={sideBarHandler}
          >
            <GiHamburgerMenu />
          </div>
          <div
            className={classes.logo}
            onClick={() => {
              router.push("/");
            }}
          >
            FoodBearCat
          </div>
        </div>
        <div className={classes["mobile-nav"]}>
          <ul>
            <li
              onClick={() => {
                router.push("/cart");
              }}
              className={`${classes["mobile-cart"]} ${
                btnAnimation ? classes.bump : ""
              } ${currentPath === "/cart" ? classes["active-link"] : ""}`}
            >
              <HiOutlineShoppingCart />
              <span className={classes["mobile-cart-number"]}>
                {totalCartItems}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mobile-side-bar">
        <SideBarBackdrop
          sideBarHandler={sideBarHandler}
          showSideBar={showSideBar}
        />
        <div
          className={`${classes["side-bar-main"]} ${
            showSideBar ? classes["side-bar-active"] : ""
          }`}
        >
          <ul>
            {session && session.admin && (
              <li
                className={`${
                  currentPath === "/admin" ? classes["mobile-active-link"] : ""
                }`}
                onClick={() => {
                  router.push("/admin");
                  sideBarHandler();
                }}
              >
                WebPanel
              </li>
            )}
            <li
              className={`${
                currentPath === "/" ? classes["mobile-active-link"] : ""
              }`}
              onClick={() => {
                router.push("/");
                sideBarHandler();
              }}
            >
              Home
            </li>

            <li
              className={`${
                currentPath === "/about" ? classes["mobile-active-link"] : ""
              }`}
              onClick={() => {
                router.push("/about");
                sideBarHandler();
              }}
            >
              About
            </li>
            <li
              onClick={() => {
                router.push("/orders");
                sideBarHandler();
              }}
            >
              <span
                className={`${
                  currentPath === "/orders" ? classes["mobile-active-link"] : ""
                }`}
              >
                Orders
              </span>
            </li>
            <li
              onClick={() => {
                router.push("/cart");
                sideBarHandler();
              }}
            >
              <span
                className={`${
                  currentPath === "/cart" ? classes["mobile-active-link"] : ""
                }`}
              >
                Cart
              </span>
            </li>
            {!session && (
              <li
                className={`${
                  currentPath === "/signin" ? classes["mobile-active-link"] : ""
                }`}
                onClick={() => {
                  router.push("/signin");
                  sideBarHandler();
                }}
              >
                Login
              </li>
            )}
            {session && (
              <li
                onClick={() => {
                  signOut();
                  sideBarHandler();
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
export default MobileHeader;
