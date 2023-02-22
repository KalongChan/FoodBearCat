import classes from "./OrderComplete.module.css";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {removeAllItems} from "@/store/cartSlice";

const OrderComplete = () => {
  const dispatch = useDispatch();
  dispatch(removeAllItems());

  return (
    <div className={classes["order-complete"]}>
      <Image
        src="/img/party_cracker_kamifubuki.png"
        alt=""
        height={400}
        width={400}
      ></Image>
      <h2>Your order has been placed</h2>
    </div>
  );
};

export default OrderComplete;
