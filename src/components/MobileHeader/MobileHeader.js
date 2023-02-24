import classes from "./MobileHeader.module.css";
import {HiOutlineShoppingCart} from "react-icons/hi";
import {GiHamburgerMenu} from "react-icons/gi";
import Link from "next/link";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

const MobileHeader = () => {
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

  return (
    <Fragment>
      <div className={classes["mobile-header"]}>
        {/* Header left */}
        <div className={classes["hamburger-menu"]}>
          <div
            className={classes.logo}
            onClick={() => {
              router.push("/");
            }}
          >
            <GiHamburgerMenu />
          </div>
        </div>
        {/* Header Right */}
        <div className={classes.nav}>
          <ul>
            {session && session.admin && (
              <li
                onClick={() => {
                  router.push("/admin");
                }}
              >
                WebPanel
              </li>
            )}
            <li
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </li>

            <li
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
              Orders
            </li>
            {!session && (
              <li
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
                  signOut;
                }}
              >
                Logout
              </li>
            )}

            <li
              onClick={() => {
                router.push("/cart");
              }}
              className={`${classes.cart} ${btnAnimation ? classes.bump : ""}`}
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
              onClick={() => {
                router.push("/admin");
              }}
            >
              WebPanel
            </li>
          )}
          <li
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </li>

          <li
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
            Orders
          </li>
          {!session && (
            <li
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
                signOut;
              }}
            >
              Logout
            </li>
          )}

          <li
            onClick={() => {
              router.push("/cart");
            }}
            className={`${classes.cart} ${btnAnimation ? classes.bump : ""}`}
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
export default MobileHeader;
