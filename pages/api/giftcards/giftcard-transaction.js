import { getSession } from "next-auth/react";
import {
  getCurrentAccountCards,
  saveAccountCards,
} from "../../../config/fileReader";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session && session.user) {
    if (req.method === "GET") {
      const { status } = req.query;
      const getUserAccountStatusCards = getCurrentAccountCards(
        session.user.email,
        status
      );
      if (status !== "received" && status !== "sent") {
        return res.status(400).json({
          message: "Bad Request",
        });
      }
      return res.status(200).json(getUserAccountStatusCards);
    } else if (req.method === "POST") {
      const { giftCardTransact } = req.body;
      saveAccountCards(giftCardTransact);
      return res.status(200).json({
        message: "Card updated successfully",
      });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
