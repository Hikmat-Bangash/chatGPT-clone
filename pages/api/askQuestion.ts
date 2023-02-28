// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Query from '@/lib/QueryApi';

import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { admindb } from '@/firebaseAdmin';

type Data = {
    answer: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    
    
    const { prompt, chatId, model, session } = req.body;
    
    console.log(req.body)
    
    if (!prompt) {
        res.status(400).json({ answer: "Please provide a prompt" });
        return;
    }

    if (!chatId) {
        res.status(400).json({ answer: "Please provide a valid chatId" });
        return;
    }
    //chatGPT QUERY
    const response = await Query(prompt, chatId, model);

    
    const message: Message = {
        text: response || "something went wrong while fetching chatGPT response",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "chatGPT",
            name: "ChatGPT",
            avatar: "https://links.papareact.com/89k",
        },
    };

    await admindb
        .collection('users')
        .doc(session?.user?.email)
        .collection("chats")
        .doc(chatId)
        .collection('messages')
        .add(message);

//   console.log(message.text)

    res.status(200).json({ answer: message.text });
}