import { getSession } from "next-auth/react";
import {
  getCardById,
  removeCard as removeCardFromFileSystem,
  updateCardInFileSystem,
} from "../../../server/fileReader";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session && session.user) {
    if (req.method === "DELETE") {
      const { id } = req.query;
      removeCardFromFileSystem(id);
      res.status(200).json({
        message: "Card deleted successfully",
      });
    }
    if (req.method === "PUT") {
      const { card } = req.body;
      const { id } = req.query;

      const updatedCard = {
        ...card,
        id,
      };
      updateCardInFileSystem(updatedCard);
      res.status(200).json({
        message: "Card updated successfully",
        card: updatedCard,
      });
    } else {
      const { id } = req.query;
      const card = getCardById(id);
      return res.status(200).json({
        card,
      });
    }
  } else if (req.method === "GET") {
    const { id } = req.query;
    const card = getCardById(id);
    return res.status(200).json({
      card,
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
