import classes from "./Header.module.css";
import {HiOutlineShoppingCart} from "react-icons/hi";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {signIn, signOut, useSession} from "next-auth/react";

const Header = () => {
  const items = useSelector((state) => state.cart.items);
  const [btnAnimation, setBtnAnimation] = useState(false);
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

  const {data: session, status} = useSession();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link href="/">FoodBearCat</Link>
        </div>
        <div className={classes.headerLinks}>
          {session && session.admin && <Link href="/admin">WebPanel</Link>}
          <Link href="/">Home</Link>

          <Link href="/orders">Orders</Link>
          <span>About</span>
          {!session && <Link href="/signin">Login</Link>}
          {session && <span onClick={signOut}>Logout</span>}
          {/* <span onClick={signIn}>SignIN</span> */}
          <Link
            href="/cart"
            className={`${classes.cart} ${btnAnimation ? classes.bump : ""}`}
          >
            <HiOutlineShoppingCart />
            <span className={classes["cart-number"]}>{totalCartItems}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
