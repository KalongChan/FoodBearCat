import Link from "next/link";
import classes from "./menus.module.css";
import Table from "../../UI/Table/Table";
import axios from "axios";
import {useEffect, useMemo, useState} from "react";
import TableContainer from "@/UI/TableContainer/TableContainer";
import Modal from "../../UI/Modal/Modal";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import Loading from "@/components/Loading/Loading";

const Accounts = (props) => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response = await axios.get(`/api/accounts`, {
        withCredentials: true,
      });
      response = response.data;
      setAccounts(response);
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

  const openModal = (account) => {
    setCurrentAccount(account);
    toggleModal();
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`/api/account/${currentAccount.id}`);
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
        accessor: "username",
      },
      {
        Header: "User Type",
        accessor: "type",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({row}) => (
          <div>
            <button
              className={classes["edit-btn"]}
              onClick={() => router.push(`account/${row.original._id}`)}
            >
              {row.original.action[0]}
            </button>
            <button
              className={classes["delete-btn"]}
              onClick={() =>
                openModal({
                  id: row.original._id,
                  account: row.original.username,
                })
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
  accounts?.map((account) => {
    menusWithAction.push({...account, action: ["Edit", "Delete"]});
  });

  const data = useMemo(() => menusWithAction, [accounts]);

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
            <h2>
              Are you sure want to delete{" "}
              <span>{`${currentAccount.account}`}</span> ?
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
                onClick={() => deleteAccount()}
              >
                Confirm
              </button>
            </div>
          </Modal>
        )}
        <div className={classes["table-wrapper"]}>
          <div className={classes["page-header"]}>
            <div className={classes["page-title"]}>Accounts</div>
            <Link className={classes["add-btn"]} href="add-account">
              Add
            </Link>
          </div>
          <Table columns={columns} data={[...data]} />
        </div>
      </TableContainer>
    );
  }
};

export default Accounts;
