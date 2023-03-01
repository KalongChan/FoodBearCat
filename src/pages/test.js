import {useDispatch, useSelector} from "react-redux";
import {removeAllItems} from "../store/cartSlice";

import CartItems from "../components/CartItems/CartItems";
import classes from "../styles/pagesStyles/cart.module.css";
import CartContainer from "@/UI/CartContainer/CartContainer";
import Link from "next/link";
import {Fade} from "react-awesome-reveal";
import Image from "next/image";
import {useSession} from "next-auth/react";
import Loading from "@/components/Loading/Loading";
import {Fragment} from "react";

function test() {
  return <Loading />;
}

export default test;
