import Link from "next/link";
import classes from "./menus.module.css";
import Table from "../../UI/Table/Table";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import {useMemo, useState} from "react";
import Container from "@/UI/Container/Container";
import Modal from "../../UI/Modal/Modal";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const Account = (props) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

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
    router.push("accounts");
  };

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
                  account: row.original.account,
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
  props.accounts.map((account) => {
    menusWithAction.push({...account, action: ["Edit", "Delete"]});
  });

  const data = useMemo(() => menusWithAction, [props.accounts]);

  return (
    <Container>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2>
            Are you sure want to delete{" "}
            <span>{`${currentAccount.account}`}</span> ?
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
