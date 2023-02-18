import {connectToDatabase} from "../../../util/mongodb";
import {getSession} from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({req});
  const {db} = await connectToDatabase();

  if (session && session.admin) {
    switch (req.method) {
      case "GET":
        try {
          let accounts = await db.collection("accounts").find().toArray();
          accounts = JSON.parse(JSON.stringify(accounts));
          return res.json(accounts);
        } catch (e) {
          res.status(405).json({message: e});
        }

      default:
        return res.status(400).json({message: "Bad Request"});
    }
  }
  return res.status(401).json({message: "Unauthorized"});
};

export default handler;
