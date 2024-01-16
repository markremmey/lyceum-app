'use client'
import Link from "next/link"
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

type Props = {
    id: string
}

function ChatRow({id}: Props) {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(
        query(
            collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
            orderBy('createdAt', 'asc')
        )
    ) // This is ordering the messages for the chat so that it can display the most recent message.

    useEffect(() => {
        if (!pathname) return;
        
        setActive(pathname.includes(id));
    }, [pathname]);

    const removeChat = async() => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
        router.replace('/');
    }

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}>
            <ChatBubbleLeftIcon className="h-6 w-6 text-white" />
            <p className="flex-1 hidden md:inline-flex truncate">
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
            </p>
            <TrashIcon 
                onClick={removeChat}
                className="h-6 w-6 texlkt-white"
            />
        </Link>
    );
}

export default ChatRow