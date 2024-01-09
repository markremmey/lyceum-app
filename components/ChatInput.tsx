'use client';

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent } from "react";
import { useState } from "react";

type Props = {
    chatId: string
}

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState(''); // This is the message that the user is typing in the input box.
    const {data: session} = useSession();
    const model = 'davinci';

    // Event Handler
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            }
        }
        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
            // Toast notification to say that the fetch was successful
        })
    }

    return  (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm"> 
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <input 
                    className= "bg-transparent text-white focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Type message here..."
                />
                <button disabled={!prompt || !session} type="submit">
                    <PaperAirplaneIcon className="h-6 w-6 text-blue-500" />
                </button>
            </form>
        </div>
    );
}

export default ChatInput;