import Link from "next/link";
import classes from "./menus.module.css";
import Table from "../../UI/Table/Table";
import axios from "axios";
import {useMemo} from "react";
import Container from "@/UI/Container/Container";
axios.defaults.baseURL = "http://localhost:3000";

const Menus = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({row}) => (
          <Link
            className={classes["edit-btn"]}
            href={`menu/${row.original._id}`}
          >
            {row.original.action}
          </Link>
        ),
      },
    ],
    []
  );

  let menusWithAction = [];
  props.menus.map((menu) => {
    menusWithAction.push({...menu, action: "Edit"});
  });

  const data = useMemo(() => menusWithAction, []);

  return (
    <Container>
      <div className={classes["table-wrapper"]}>
        <div className={classes["page-header"]}>
          <div className={classes["page-title"]}>Menus</div>
          <Link className={classes["add-btn"]} href="add-menu">
            Add
          </Link>
        </div>
        <Table columns={columns} data={[...data]} />
      </div>
    </Container>
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
