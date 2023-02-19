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
            .collection("orders")
            .findOne({_id: new ObjectId(req.query.id)});
          return res.json(response);
        } catch (e) {
          res.status(400).json({message: e});
        }

      case "PUT":
        try {
          let data = req.body;
          let response = await db.collection("orders").updateOne(
            {_id: new ObjectId(req.query.id)},
            {
              $set: {
                // name: data.name,
                // category: data.category,
                // description: data.description,
                // price: data.price,
                // image: data.image,
                ...data,
              },
            }
          );
          return res.status(200).json({message: "Edit Order Status Success"});
        } catch (e) {
          res.status(400).json({message: e});
        }

      case "DELETE":
        try {
          let response = await db
            .collection("orders")
            .deleteOne({_id: new ObjectId(req.query.id)});
          return res.status(200).json({message: "Delete Order Success"});
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
