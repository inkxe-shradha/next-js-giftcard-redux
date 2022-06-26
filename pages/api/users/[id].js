import { getSession } from "next-auth/react";
import { updateUserDetails } from "../../../server/fileReader";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session && session.user) {
    if (req.method === "PUT") {
      const userId = req.query.id;
      const { user } = req.body;
      updateUserDetails(userId, user);
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
