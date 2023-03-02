import classes from "./MobileHeader.module.css";
import {
  HiOutlineShoppingCart,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import {AiOutlineHome} from "react-icons/ai";
import {BsBag} from "react-icons/bs";
import {GrLogin, GrUserAdmin} from "react-icons/gr";
import {GiHamburgerMenu} from "react-icons/gi";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
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
                <span className={classes["side-bar-icon"]}>
                  <GrUserAdmin />
                </span>
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
              <span className={classes["side-bar-icon"]}>
                <AiOutlineHome />
              </span>
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
              <span className={classes["side-bar-icon"]}>
                <HiOutlineInformationCircle />
              </span>
              About
            </li>
            <li
              className={`${
                currentPath === "/orders" ? classes["mobile-active-link"] : ""
              }`}
              onClick={() => {
                router.push("/orders");
                sideBarHandler();
              }}
            >
              <span className={classes["side-bar-icon"]}>
                <BsBag />
              </span>
              Orders
            </li>
            <li
              className={`${
                currentPath === "/cart" ? classes["mobile-active-link"] : ""
              }`}
              onClick={() => {
                router.push("/cart");
                sideBarHandler();
              }}
            >
              <span className={classes["side-bar-icon"]}>
                <HiOutlineShoppingCart />
              </span>
              Cart
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
                <span className={classes["side-bar-icon"]}>
                  <GrLogin />
                </span>
                Login
              </li>
            )}
            {session && (
              <li
                onClick={() => {
                  signOut();
                }}
              >
                <span className={classes["side-bar-icon"]}>
                  <GrLogin />
                </span>
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
