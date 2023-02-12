import {connectToDatabase} from "../../../util/mongodb";

const handler = async (req, res) => {
  const {db} = await connectToDatabase();

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
};

export default handler;
