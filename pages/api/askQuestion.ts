// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { admindb } from '@/firebaseAdmin';
import axios, { AxiosResponse } from 'axios';

type Data = {
    answer: AxiosResponse<any, any> | string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    
    
    const { prompt, chatId, session } = req.body;
        
    if (!prompt) {
        res.status(400).json({ answer: "Please provide a prompt" });
        return;
    }

    if (!chatId) {
        res.status(400).json({ answer: "Please provide a valid chatId" });
        return;
    }

    const response = await axios.post("https://chatgpt-backend-api-fetching.vercel.app/", {
        message: prompt
    })
    

    
    const message: Message = {
        text: response.data.message || "something went wrong while fetching chatGPT response",
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


    res.status(200).json({ answer: response });
}