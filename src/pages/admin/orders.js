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
const Orders = () => {
  const {data: session, status} = useSession();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response = await axios.get(`/api/orders/`, {
        withCredentials: true,
      });
      response = response.data;
      setOrders(response);
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
      const response = await axios.delete(`/api/order/${currentItem.id}`);
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
        Header: "Order ID",
        accessor: "_id",
      },
      {
        Header: "Ordered By",
        accessor: "orderedBy",
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount",
      },
      {
        Header: "Status",
        accessor: "status",
      },

      {
        Header: "Action",
        accessor: "action",
        Cell: ({row}) => (
          <div className={classes.actions}>
            <button
              className={classes["edit-btn"]}
              onClick={() => router.push(`order/${row.original._id}`)}
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
  orders?.map((order) => {
    menusWithAction.push({...order, action: ["Edit", "Delete"]});
  });

  const data = useMemo(() => menusWithAction, [orders]);

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
      <Fragment>
        <TableContainer>
          {showModal && (
            <Modal showModal={showModal} setShowModal={setShowModal}>
              <h2 className={classes.test}>
                Are you sure want to delete order{" "}
                <span>{`${currentItem.id}`}</span> ?
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
              <div className={classes["page-title"]}>Orders</div>
              {/* <Link className={classes["add-btn"]} href="add-menu">
                Add
              </Link> */}
            </div>
            {orders ? (
              <Table columns={columns} data={[...data]} />
            ) : (
              <h1>Loading</h1>
            )}
          </div>
        </TableContainer>
      </Fragment>
    );
  }
};

export default Orders;

// export const getStaticProps = async () => {
//   let orders = null;
//   try {
//     orders = await axios.get("/api/orders");
//     orders = orders.data;
//   } catch (e) {
//     if (e.response) {
//       console.log(e.response.status);
//       console.log(e.response.data.message);
//     } else {
//       console.log(e);
//     }
//   }

//   return {
//     props: {
//       orders,
//     },
//     revalidate: 1,
//   };
// };

// export const getServerSideProps = async ({req, params}) => {
//   let orders = null;

//   try {
//     orders = await axios.get(`/api/orders/`, {
//       withCredentials: true,
//       headers: {
//         Cookie: req.headers.cookie,
//       },
//     });
//     orders = orders.data;
//   } catch (e) {
//     if (e.response) {
//       console.log(e.response.status);
//       console.log(e.response.data.message);
//     } else {
//       console.log(e);
//     }
//   }

//   return {
//     props: {
//       orders: orders,
//     },
//   };
// };
