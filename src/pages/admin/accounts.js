import Link from "next/link";
import classes from "./menus.module.css";
import Table from "../../UI/Table/Table";
import axios from "axios";
import {useMemo} from "react";
import Container from "@/UI/Container/Container";
axios.defaults.baseURL = "http://localhost:3000";

const Account = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "account",
      },
      {
        Header: "User Type",
        accessor: "type",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({row}) => (
          <Link
            className={classes["edit-btn"]}
            href={`account/${row.original._id}`}
          >
            {row.original.action}
          </Link>
        ),
      },
    ],
    []
  );

  let menusWithAction = [];
  props.accounts.map((account) => {
    menusWithAction.push({...account, action: "Edit"});
  });

  const data = useMemo(() => menusWithAction, []);

  return (
    <Container>
      <div className={classes["table-wrapper"]}>
        <div className={classes["page-header"]}>
          <div className={classes["page-title"]}>Accounts</div>
          <Link className={classes["add-btn"]} href="add-menu">
            Add
          </Link>
        </div>
        <Table columns={columns} data={[...data]} />
      </div>
    </Container>
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
