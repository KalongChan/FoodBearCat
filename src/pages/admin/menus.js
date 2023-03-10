import Link from "next/link";
import classes from "./menus.module.css";
import Table from "../../UI/Table/Table";
import axios from "axios";
import {Fragment, useEffect, useMemo, useState} from "react";
import TableContainer from "@/UI/TableContainer/TableContainer";

import Modal from "../../UI/Modal/Modal";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import Loading from "@/components/Loading/Loading";
const Menus = (props) => {
  const {data: session, status} = useSession();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response = await axios.get(`/api/menus/`, {
        withCredentials: true,
      });
      response = response.data;
      setMenus(response);
    } catch (e) {
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data.message);
      } else {
        console.log(e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (item) => {
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
    fetchData();
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
              // onClick={() => console.log(row.original._id)}
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
  menus?.map((menu) => {
    menusWithAction.push({...menu, action: ["Edit", "Delete"]});
  });

  const data = useMemo(() => menusWithAction, [menus]);

  const initialState = {
    pageSize: 10,
    pageIndex: 0,
  };

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (!session.admin) {
      router.push("/");
      return;
    }
  }, [session]);

  if (loading && session && session.admin) {
    return <Loading />;
  }

  if (session && session.admin) {
    return (
      <TableContainer>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            <h2 className={classes.test}>
              Are you sure want to delete <span>{`${currentItem.name}`}</span> ?
            </h2>
            <div style={{whiteSpace: "nowrap"}}>
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
          {menus ? (
            <Table columns={columns} data={[...data]} />
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </TableContainer>
    );
  }
};

export default Menus;
