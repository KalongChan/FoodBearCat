import {useDispatch, useSelector} from "react-redux";

import OrdersItems from "../components/OrdersItems/OrdersItems";
import classes from "../styles/pagesStyles/cart.module.css";
import CartContainer from "@/UI/CartContainer/CartContainer";
import Link from "next/link";
import {Fade} from "react-awesome-reveal";
import Image from "next/image";
import {connectToDatabase} from "../util/mongodb";
import {getSession} from "next-auth/react";

const orders = ({orders}) => {
  const dispatch = useDispatch();

  const hasOrders = orders.length !== 0;

  return (
    <Fade>
      {!hasOrders && (
        <div className={classes.empty}>
          <Image
            src="/img/shopping_cart_woman.png"
            alt=""
            height={400}
            width={400}
          ></Image>
          <h2>Your Cart is Empty</h2>
        </div>
      )}
      {hasOrders && (
        <div className={classes.cart}>
          <CartContainer>
            <div className={classes["cart-title"]}>
              <h2>My orders</h2>
            </div>

            {orders.map((item, index) => (
              <OrdersItems
                index={index + 1}
                key={item._id}
                id={item._id}
                orderTime={item.orderTime}
                items={item.items}
                totalAmount={item.totalAmount}
                status={item.status}
              />
            ))}

            <div className={classes["check-out-group"]}>
              <Link
                href="/"
                className={`${classes["back-button"]} ${classes["check-out-btn"]}`}
              >
                Order More
              </Link>
              <Link
                href="/checkout"
                className={`${classes.button} ${classes["check-out-btn"]}`}
              >
                Check Out
              </Link>
            </div>
          </CartContainer>
        </div>
      )}
    </Fade>
  );
};

export default orders;

export const getServerSideProps = async ({req, res}) => {
  const session = await getSession({req});

  const {db} = await connectToDatabase();
  let menus = await db.collection("menus").find().toArray();
  menus = JSON.parse(JSON.stringify(menus));
  let categories = await db.collection("categories").find().toArray();
  categories = JSON.parse(JSON.stringify(categories));

  const response = await db
    .collection("orders")
    .find({orderedBy: session.id})
    .toArray();

  const orders = await JSON.parse(JSON.stringify(response));

  return {
    props: {
      orders,
    },
  };
};
