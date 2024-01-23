import type { NextApiRequest, NextApiResponse } from "next";
import query from "@/lib/queryApi"
import { adminDb } from "@/firebaseAdmin";
import admin from "firebase-admin";

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "Missing prompt" });
    return;
  };

  if (!chatId) {
    res.status(400).json({ answer: "Missing chatId" });
    return;
  };
  

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "Lyceum was unable to find an answer!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "/laurel.svg",
    }
  }

  await adminDb
  .collection('users')
  .doc(session?.user?.email)
  .collection("chats")
  .doc(chatId)
  .collection("messages")
  .add(message)

  res.status(200).json({ answer: message.text })
}