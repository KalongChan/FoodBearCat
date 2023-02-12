import {connectToDatabase} from "../../../util/mongodb";

const handler = async (req, res) => {
  const {db} = await connectToDatabase();

  switch (req.method) {
    case "GET":
      try {
        let categories = await db.collection("categories").find().toArray();
        categories = JSON.parse(JSON.stringify(categories));
        return res.json(categories);
      } catch (e) {
        res.status(405).json({message: e});
      }

    default:
      return res.status(400).json({message: "Bad Request"});
  }
};

export default handler;
