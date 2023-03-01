import {connectToDatabase} from "../../../util/mongodb";
import {ObjectId} from "bson";
import {getSession} from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({req});
  const {db} = await connectToDatabase();

  if (session && session.admin) {
    switch (req.method) {
      case "GET":
        try {
          let response = await db
            .collection("accounts")
            .findOne({_id: new ObjectId(req.query.id)});
          return res.json(response);
        } catch (e) {
          res.status(400).json({message: e});
        }

      case "PUT":
        try {
          let data = req.body;

          const updateAccount = async () => {
            let response = await db.collection("accounts").updateOne(
              {_id: new ObjectId(req.query.id)},
              {
                $set: {
                  username: data.username,
                  //   password: data.password,
                  type: data.type,
                },
              }
            );
            return res.status(200).json({message: "Edit Account Success"});
          };

          const currentAccount = await db
            .collection("accounts")
            .findOne({_id: new ObjectId(req.query.id)});

          const checkAccountDuplicate =
            (await db
              .collection("accounts")
              .find({username: `${data.username}`})
              .count()) !== 0;

          if (currentAccount.username === data.username) {
            return updateAccount();
          }

          if (checkAccountDuplicate) {
            return res.status(400).json({message: "Duplicate Account"});
          }

          return updateAccount();
        } catch (e) {
          res.status(400).json({message: e});
        }

      case "DELETE":
        try {
          let response = await db
            .collection("accounts")
            .deleteOne({_id: new ObjectId(req.query.id)});
          return res.status(200).json({message: "Delete Account Success"});
        } catch (e) {
          res.status(400).json({message: e});
        }

      default:
        return res.status(405).json({message: "Method not allowed"});
    }
  }
  return res.status(401).json({message: "Unauthorized"});
};

export default handler;
