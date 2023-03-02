import classes from "./Header.module.css";
import {HiOutlineShoppingCart} from "react-icons/hi";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import MobileHeader from "../MobileHeader/MobileHeader";
import BackToTopButton from "../BackToTopButton/BackToTopButton";

const Header = () => {
  const items = useSelector((state) => state.cart.items);
  const [btnAnimation, setBtnAnimation] = useState(false);
  const [collaps, setCollaps] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 55) {
          setCollaps(true);
        } else {
          setCollaps(false);
        }
      });
    }
  }, []);

  const {data: session, status} = useSession();
  const currentPath = router.pathname;

  return (
    <Fragment>
      <BackToTopButton collaps={collaps} />
      <MobileHeader />
      <div className={classes["main-header"]}>
        {/* Header left */}
        <div className={classes["header-left"]}>
          <div
            className={classes.logo}
            onClick={() => {
              router.push("/");
            }}
          >
            FoodBearCat
          </div>
        </div>
        {/* Header Right */}
        <div className={classes.nav}>
          <ul>
            {session && session.admin && (
              <li
                className={`${
                  currentPath === "/admin" ? classes["active-link"] : ""
                } ${classes["long-header"]}`}
                onClick={() => {
                  router.push("/admin");
                }}
              >
                WebPanel
              </li>
            )}
            <li
              className={`${currentPath === "/" ? classes["active-link"] : ""}`}
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </li>

            <li
              className={`${
                currentPath === "/about" ? classes["active-link"] : ""
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
                  currentPath === "/orders" ? classes["active-link"] : ""
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

            <li
              onClick={() => {
                router.push("/cart");
              }}
              className={`${classes.cart} ${btnAnimation ? classes.bump : ""} ${
                currentPath === "/cart" ? classes["active-link"] : ""
              }`}
            >
              <HiOutlineShoppingCart />
              <span className={classes["cart-number"]}>{totalCartItems}</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`${classes["collapsing-header"]} ${
          collaps ? classes["show-collaps-down"] : ""
        } ${!collaps ? classes["show-collaps-up"] : ""}`}
      >
        <ul>
          {session && session.admin && (
            <li
              className={`${
                currentPath === "/admin" ? classes["active-link"] : ""
              } ${classes["long-header"]}`}
              onClick={() => {
                router.push("/admin");
              }}
            >
              WebPanel
            </li>
          )}
          <li
            className={`${currentPath === "/" ? classes["active-link"] : ""}`}
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </li>

          <li
            className={`${
              currentPath === "/about" ? classes["active-link"] : ""
            }`}
            onClick={() => {
              router.push("/about");
            }}
          >
            About
          </li>
          <li
            className={`${
              currentPath === "/orders" ? classes["active-link"] : ""
            }`}
            onClick={() => {
              router.push("/orders");
            }}
          >
            Orders
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

          <li
            onClick={() => {
              router.push("/cart");
            }}
            className={`${classes.cart} ${btnAnimation ? classes.bump : ""}
           ${currentPath === "/cart" ? classes["collaps-active"] : ""}
           `}
          >
            <HiOutlineShoppingCart />
            <span className={classes["small-cart-number"]}>
              {totalCartItems}
            </span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default Header;
