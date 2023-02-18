import {getSession} from "next-auth/react";
import {connectToDatabase} from "../../util/mongodb";

//POST /api/add-account

const handler = async (req, res) => {
  const session = await getSession({req});

  if (session && session.admin) {
    try {
      if (req.method === "POST") {
        const data = req.body;
        const {db} = await connectToDatabase();

        const isUserNameExist = await db
          .collection("accounts")
          .find({account: `${data.account}`})
          .count();

        const isEmailExist = await db
          .collection("accounts")
          .find({email: `${data.email}`})
          .count();

        if (isUserNameExist) {
          return res.status(400).json({message: "Duplicate User Name"});
        }

        if (isEmailExist) {
          return res.status(400).json({message: "Duplicate Email"});
        }

        if (!isUserNameExist && !isEmailExist) {
          const result = db.collection("accounts").insertOne(data);
          return res.status(200).json({message: "New Account Added"});
        }
      } else {
        return res.status(400).json({message: "Bad Request"});
      }
    } catch (e) {
      return res.status(500).json({message: "Internal Server Error"});
    }
  }
  return res.status(401).json({message: "Unauthorized"});
};

export default handler;
