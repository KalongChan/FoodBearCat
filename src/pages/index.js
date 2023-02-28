import CustomerReviews from "@/components/CustomerReviews/CustomerReviews";
import {Fragment} from "react";

import Banner from "../components/Banner/Banner";
import Info from "../components/Info/Info";
import Menu from "../components/Menu/Menu";
import {connectToDatabase} from "../util/mongodb";

export default function Home(props) {
  return (
    <Fragment>
      <Banner />
      <Info />
      <Menu menus={props?.menus} categories={props?.categories} />
      <CustomerReviews />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const {db} = await connectToDatabase();
  let menus = await db.collection("menus").find().toArray();
  menus = JSON.parse(JSON.stringify(menus));
  let categories = await db.collection("categories").find().toArray();
  categories = JSON.parse(JSON.stringify(categories));

  return {
    props: {
      menus,
      categories,
    },
    revalidate: 10,
  };
};
