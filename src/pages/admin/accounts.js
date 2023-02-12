import Link from "next/link";
import {useRouter} from "next/router";
import classes from "./menus.module.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const Account = (props) => {
  const router = useRouter();

  return (
    <div className={classes.menu}>
      <div className={classes["menu-addbtn"]}>
        <button onClick={() => router.push("add-account")}>Add</button>
      </div>
      <div className={classes["menu-header"]}>
        <div>id</div>
        <div>Name</div>
        <div>User Type</div>
      </div>
      {props.accounts?.map((account) => (
        <div key={account._id} className={classes["menu-row"]}>
          <div className={classes["menu-item"]}>{account._id}</div>
          <Link
            href={`account/${account._id}`}
            className={classes["menu-item"]}
          >
            {account.name}
          </Link>
          <div className={classes["menu-item"]}>{account.account}</div>
          <div className={classes["menu-item"]}>{account.type}</div>

          <div className={classes["menu-item"]}>
            <button onClick={() => router.push(`account/${account._id}`)}>
              Edit
            </button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Account;

export const getStaticProps = async () => {
  let accounts = null;
  try {
    accounts = await axios.get("/api/accounts");
    accounts = accounts.data;
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
      accounts: accounts,
    },
    revalidate: 10000,
  };
};
