import Link from "next/link";
import {useRouter} from "next/router";
import classes from "./menus.module.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const Menus = (props) => {
  const router = useRouter();

  return (
    <div className={classes.menu}>
      <div className={classes["menu-addbtn"]}>
        <button onClick={() => router.push("add-menu")}>Add</button>
      </div>
      <div className={classes["menu-header"]}>
        <div>id</div>
        <div>Name</div>
        <div>Category</div>
        <div>Description</div>
        <div>Price</div>
        <div>Actions</div>
      </div>
      {props.menus?.map((menu) => (
        <div key={menu._id} className={classes["menu-row"]}>
          <div className={classes["menu-item"]}>{menu._id}</div>
          <Link href={`item/${menu._id}`} className={classes["menu-item"]}>
            {menu.name}
          </Link>
          <div className={classes["menu-item"]}>
            {menu.description.split(" ").splice(0, 5) + "....."}
          </div>
          <div className={classes["menu-item"]}>{menu.category}</div>
          <div className={classes["menu-item"]}>{menu.price}</div>
          <div className={classes["menu-item"]}>
            <button onClick={() => router.push(`menu/${menu._id}`)}>
              Edit
            </button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Menus;

export const getStaticProps = async () => {
  let menus = null;
  try {
    menus = await axios.get("/api/menus");
    menus = menus.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data.message);
    } else {
      console.log(e);
    }
  }

  return {
    props: {
      menus,
    },
    revalidate: 10000,
  };
};
