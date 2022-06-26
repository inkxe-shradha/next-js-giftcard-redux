import { getSession } from "next-auth/react";
import { checkedLoginUserAccessStatus } from "../../../components/utils/sharedutils";
import { saveCardList } from "../../../file-reader/fileReader";
export default async function handler(req, res) {
  if (req.method === "POST" || req.method === "PUT") {
    const session = await getSession({ req });
    if (session && session.user) {
      if (!checkedLoginUserAccessStatus(session.user.email)) {
        res.status(200).json({
          message: "You are not authorized to perform this action",
        });
      } else {
        const cardList = req.body.cardList;
        saveCardList(cardList);
        res.status(200).json({
          message: "Card list saved successfully",
        });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(400).json({
      message: "Bad Request",
    });
  }
}
