import Link from "next/link";
import classes from "./menus.module.css";
import Table from "../../UI/Table/Table";
import axios from "axios";
import {useMemo, useState} from "react";
import Container from "@/UI/Container/Container";
axios.defaults.baseURL = "http://localhost:3000";

import Modal from "../../UI/Modal/Modal";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const Menus = (props) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (item) => {
    console.log(item);
    setCurrentItem(item);
    toggleModal();
  };

  const deleteItem = async () => {
    try {
      const response = await axios.delete(`/api/menu/${currentItem.id}`);
      toast.success(response.data.message);
    } catch (e) {
      const errorMessage = `(${e.request.status}) ${e.response.data.message}`;
      toast.error(errorMessage);
    }
    toggleModal();
    router.push("menus");
  };

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
          <div className={classes.actions}>
            <button
              className={classes["edit-btn"]}
              onClick={() => router.push(`menu/${row.original._id}`)}
            >
              {row.original.action[0]}
            </button>
            <button
              className={classes["delete-btn"]}
              // href={`menu/${row.original._id}`}
              onClick={() =>
                openModal({id: row.original._id, name: row.original.name})
              }
            >
              {row.original.action[1]}
            </button>
          </div>
        ),
      },
    ],
    []
  );

  let menusWithAction = [];
  props.menus?.map((menu) => {
    menusWithAction.push({...menu, action: ["Edit", "Delete"]});
  });

  const data = useMemo(() => menusWithAction, [props.menus]);

  const initialState = {
    pageSize: 10,
    pageIndex: 0,
  };

  return (
    <Container>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2>
            Are you sure to delete <span>{`${currentItem.name}`}</span> ?
          </h2>
          <div>
            <button
              className={classes["sub-btn"]}
              onClick={() => toggleModal()}
            >
              Cancel
            </button>
            <button
              className={classes["delete-btn"]}
              onClick={() => deleteItem()}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
      <div className={classes["table-wrapper"]}>
        <div className={classes["page-header"]}>
          <div className={classes["page-title"]}>Menus</div>
          <Link className={classes["add-btn"]} href="add-menu">
            Add
          </Link>
        </div>
        {props.menus ? (
          <Table columns={columns} data={[...data]} />
        ) : (
          <h1>Loading</h1>
        )}
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
    revalidate: 1,
  };
};
