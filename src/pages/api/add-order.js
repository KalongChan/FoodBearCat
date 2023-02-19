import {connectToDatabase} from "../../util/mongodb";

//POST /api/add-order

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const data = req.body;
      const {db} = await connectToDatabase();
      const result = db.collection("orders").insertOne(data);
      return res.status(200).json({message: "New Order Added"});
    } else {
      return res.status(400).json({message: "Bad Request"});
    }
  } catch (e) {
    return res.status(500).json({message: "Internal Server Error"});
  }
};

export default handler;
