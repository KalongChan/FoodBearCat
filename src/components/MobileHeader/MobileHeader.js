import classes from "./MobileHeader.module.css";
import {HiOutlineShoppingCart} from "react-icons/hi";
import {GiHamburgerMenu} from "react-icons/gi";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import MobileSideBar from "@/UI/MobileSideBar/MobileSideBar";

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
          <div className={classes["hamburger-icon"]} onClick={sideBarHandler}>
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
              } ${currentPath === "/cart" ? classes["mobile-active"] : ""}`}
            >
              <HiOutlineShoppingCart />
              <span className={classes["mobile-cart-number"]}>
                {totalCartItems}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <MobileSideBar sideBarHandler={sideBarHandler} showSideBar={showSideBar}>
        <div className={classes["side-bar"]}>
          <ul>
            {session && session.admin && (
              <li
                className={`${
                  currentPath === "/admin" ? classes["mobile-active"] : ""
                }`}
                onClick={() => {
                  router.push("/admin");
                }}
              >
                WebPanel
              </li>
            )}
            <li
              className={`${
                currentPath === "/" ? classes["mobile-active"] : ""
              }`}
              onClick={() => {
                router.push("/");
                // sideBarHandler();
              }}
            >
              Home
            </li>

            <li
              className={`${
                currentPath === "/about" ? classes["mobile-active"] : ""
              }`}
              onClick={() => {
                router.push("/about");
              }}
            >
              About
            </li>
            <li
              onClick={() => {
                router.push("/orders");
              }}
            >
              <span
                className={`${
                  currentPath === "/orders" ? classes["mobile-active"] : ""
                }`}
              >
                Orders
              </span>
            </li>
            {!session && (
              <li
                className={`${
                  currentPath === "/signin" ? classes["mobile-active"] : ""
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
      </MobileSideBar>
    </Fragment>
  );
};
export default MobileHeader;
