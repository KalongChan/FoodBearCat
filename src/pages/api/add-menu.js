import {getSession} from "next-auth/react";
import {connectToDatabase} from "../../util/mongodb";

//POST /api/add-menu

const handler = async (req, res) => {
  const session = await getSession({req});

  if (session && session.admin) {
    try {
      if (req.method === "POST") {
        const data = req.body;
        const {db} = await connectToDatabase();
        const result = db.collection("menus").insertOne(data);
        return res.status(200).json({message: "New Menu Added"});
      } else {
        return res.status(400).json({message: "Bad Request"});
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({message: "Internal Server Error"});
    }
  }
  return res.status(401).json({message: "Unauthorized"});
};

export default handler;
