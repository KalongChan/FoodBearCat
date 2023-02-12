import {connectToDatabase} from "../../../util/mongodb";
import {ObjectId} from "bson";

const handler = async (req, res) => {
  const {db} = await connectToDatabase();

  switch (req.method) {
    case "GET":
      try {
        let response = await db
          .collection("menus")
          .findOne({_id: new ObjectId(req.query.id)});
        return res.json(response);
      } catch (e) {
        res.status(400).json({message: e});
      }

    case "PUT":
      try {
        let data = req.body;
        let response = await db.collection("menus").updateOne(
          {_id: new ObjectId(req.query.id)},
          {
            $set: {
              name: data.name,
              category: data.category,
              description: data.description,
              price: data.price,
              image: data.image,
            },
          }
        );
        return res.status(200).json({message: "Edit Menu Success"});
      } catch (e) {
        res.status(400).json({message: e});
      }

    case "DELETE":
      try {
        let response = await db
          .collection("menus")
          .deleteOne({_id: new ObjectId(req.query.id)});
        return res.status(200).json({message: "Delete Menu Success"});
      } catch (e) {
        res.status(400).json({message: e});
      }

    default:
      return res.status(405).json({message: "Method not allowed"});
  }
};

//     if (req.method === "POST") {
//       const data = req.body;
//       const {db} = await connectToDatabase();
//       const result = db.collection("menus").insertOne(data);
//       res.status(201).json({message: "New Menu Added"});
//     }

//     if (req.method === "POST") {
//       const data = req.body;
//       const {db} = await connectToDatabase();
//       const result = db.collection("menus").insertOne(data);
//       res.status(201).json({message: "New Menu Added"});
//     } else {
//       return res.status(400).json({message: "Bad Request"});
//     }
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({message: "Internal Server Error"});
//   }

export default handler;
