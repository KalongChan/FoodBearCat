import classes from "./Header.module.css";
import {HiOutlineShoppingCart} from "react-icons/hi";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

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

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link href="/">FoodBearCat</Link>
        </div>
        <div className={classes.headerLinks}>
          <Link href="/">Home</Link>
          <span>Foods</span>
          <span>About</span>
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
