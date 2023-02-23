import classes from "./Header.module.css";
import {HiOutlineShoppingCart} from "react-icons/hi";
import Link from "next/link";
import {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {signIn, signOut, useSession} from "next-auth/react";

const Header = () => {
  const items = useSelector((state) => state.cart.items);
  const [btnAnimation, setBtnAnimation] = useState(false);
  const [collaps, setCollaps] = useState(false);
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
        if (window.pageYOffset > 80) {
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
      <div className={classes["main-header"]}>
        {/* Header left */}
        <div className={classes["header-left"]}>
          <div className={classes.logo}>
            <Link href="/">FoodBearCat</Link>
          </div>
        </div>
        {/* Header Right */}
        <div className={classes.nav}>
          <ul>
            <li>
              {session && session.admin && <Link href="/admin">WebPanel</Link>}
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/orders">Orders</Link>
            </li>
            <li>About</li>
            <li>
              <Link href="/orders">Orders</Link>
            </li>
            <li>
              {!session && <Link href="/signin">Login</Link>}
              {session && <span onClick={signOut}>Logout</span>}
            </li>
            <li>
              <Link
                href="/cart"
                className={`${classes.cart} ${
                  btnAnimation ? classes.bump : ""
                }`}
              >
                <HiOutlineShoppingCart />
                <span className={classes["cart-number"]}>{totalCartItems}</span>
              </Link>
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
          <li>
            {session && session.admin && <Link href="/admin">WebPanel</Link>}
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/orders">Orders</Link>
          </li>
          <li>About</li>
          <li>
            <Link href="/orders">Orders</Link>
          </li>
          <li>
            {!session && <Link href="/signin">Login</Link>}
            {session && <span onClick={signOut}>Logout</span>}
          </li>
          <li>
            <Link
              href="/cart"
              className={`${classes.cart} ${btnAnimation ? classes.bump : ""}`}
            >
              <HiOutlineShoppingCart />
              <span className={classes["small-cart-number"]}>
                {totalCartItems}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default Header;
