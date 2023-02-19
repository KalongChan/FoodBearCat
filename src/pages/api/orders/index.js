import {connectToDatabase} from "../../../util/mongodb";

const handler = async (req, res) => {
  const {db} = await connectToDatabase();

  switch (req.method) {
    case "GET":
      try {
        let response = await db.collection("orders").find().toArray();
        return res.json(response);
      } catch (e) {
        res.status(400).json({message: e});
      }

    default:
      return res.status(400).json({message: "Bad Request"});
  }
};

export default handler;
