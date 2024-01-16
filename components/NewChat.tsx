'use client'

import { PlusIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
    id: string;
}

function NewChat() {
    const router = useRouter();
    const { data: session } = useSession();
    const createNewChat = async() => {
        const doc = await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats'), 
            {
                userId: session?.user?.email,
                createdAt: serverTimestamp()
            }
        );
        router.push(`/chat/${doc.id}`) // Push to the chat  page
    };
    
    return (
        <div onClick={createNewChat} className="border-gray-700 border chatRow">
            <PlusIcon className="h-6 w-6" />
            <p >New Chat</p>
        </div>
    )
}


export default NewChat