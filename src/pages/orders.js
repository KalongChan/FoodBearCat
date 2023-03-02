import OrdersItems from "../components/OrdersItems/OrdersItems";
import classes from "../styles/pagesStyles/cart.module.css";
import CartContainer from "@/UI/CartContainer/CartContainer";
import Fade from "react-reveal/Fade";
import Image from "next/image";
import {connectToDatabase} from "../util/mongodb";
import {getSession, useSession} from "next-auth/react";
import {useRouter} from "next/router";

const Orders = ({orders}) => {
  const router = useRouter();
  const currentSession = useSession();
  const hasOrders = orders.length !== 0;

  if (currentSession.status === "loading") {
    return <div></div>;
  }

  return (
    <Fade>
      {currentSession.status === "unauthenticated" && (
        <div className={classes.cart}>
          <CartContainer>
            <div className={classes["cart-title"]}>
              <h2>My orders</h2>
            </div>
            <div className={classes["not-login"]}>
              <h3>
                Please <span onClick={() => router.push("/signin")}>login</span>{" "}
                to view your order history
              </h3>
              <div>
                <Image
                  src="/img/internet_nidankai_ninsyou_man.png"
                  alt=""
                  width={640}
                  height={560}
                  layout="responsive"
                ></Image>
              </div>
            </div>
          </CartContainer>
        </div>
      )}

      {!hasOrders && currentSession.status === "authenticated" && (
        <div className={classes.empty}>
          <Image
            src="/img/kaimono_kago.png"
            alt=""
            height={400}
            width={400}
          ></Image>
          <h2>You haven't placed any orders yet</h2>
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
          </CartContainer>
        </div>
      )}
    </Fade>
  );
};

export default Orders;

export const getServerSideProps = async ({req, res}) => {
  const session = await getSession({req});

  const {db} = await connectToDatabase();
  const response = await db
    .collection("orders")
    .find({orderedBy: session?.id})
    .toArray();

  const orders = await JSON.parse(JSON.stringify(response));

  return {
    props: {
      orders,
    },
  };
};
