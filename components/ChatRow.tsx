import Link from "next/link"
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
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
    )

    useEffect(() => {
        if (!pathname) return;
        
        setActive(pathname.includes(id));
    }, [pathname]);

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}>
            <ChatBubbleLeftIcon className="h-6 w-6 text-white" />
            <p className="flex-1 truncate">
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
            </p>
            <TrashIcon className="h-6 w-6 text-white" />
        </Link>
    );
}

export default ChatRow