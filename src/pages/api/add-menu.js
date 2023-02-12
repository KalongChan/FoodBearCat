import {connectToDatabase} from "../../util/mongodb";

//POST /api/add-menu

async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const data = req.body;
      const {db} = await connectToDatabase();
      const result = db.collection("menus").insertOne(data);
      res.status(200).json({message: "New Menu Added"});
    } else {
      return res.status(400).json({message: "Bad Request"});
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: "Internal Server Error"});
  }
}

export default handler;
