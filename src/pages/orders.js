import OrdersItems from "../components/OrdersItems/OrdersItems";
import classes from "../styles/pagesStyles/cart.module.css";
import CartContainer from "@/UI/CartContainer/CartContainer";
import Fade from "react-reveal/Fade";
import Image from "next/image";
import {connectToDatabase} from "../util/mongodb";
import {getSession, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {Fragment} from "react";

const Orders = ({orders}) => {
  const router = useRouter();
  const currentSession = useSession();
  const hasOrders = orders.length !== 0;

  if (currentSession.status === "loading") {
    return <div></div>;
  }

  return (
    <Fragment>
      <Fade>
        {currentSession.status === "unauthenticated" && (
          <div className={classes.cart}>
            <CartContainer>
              <div className={classes["cart-title"]}>
                <h2>My orders</h2>
              </div>
              <div className={classes["not-login"]}>
                <h3>
                  Please{" "}
                  <span onClick={() => router.push("/signin")}>login</span> to
                  view your order history
                </h3>
                <div>
                  <Image
                    src="/img/internet_nidankai_ninsyou_man.png"
                    alt=""
                    width={320}
                    height={280}
                  ></Image>
                </div>
              </div>
            </CartContainer>
          </div>
        )}
      </Fade>

      <Fade>
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
      </Fade>

      <Fade>
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
    </Fragment>
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
