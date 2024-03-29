'use client'

import { useCollection } from "react-firebase-hooks/firestore"
import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
    const { data: session } = useSession();

    const [chats] = useCollection(
        session && collection(db, 'users', session?.user?.email!, 'chats')
    )

    return (
        <div className="p-2 flex flex-col h-screen overflow-hidden">
            <div className="flex-1">
                <div>
                    {/* NewChat */}
                    <NewChat />

                    <div className="hidden sm:inline">
                        <ModelSelection/>
                    </div>

                <div className="flex flex-col space-y-2 my-2">
                    
                    {/* {loading && (
                        <div className="animate-pulse text-center text-white">
                            <p>Loading Chats...</p>
                        </div>
                    )} */}
                    
                    {chats?.docs.map((chat) => (
                        <ChatRow key={chat.id} id={chat.id}/> // users={chat.data().users}
                    ))}                    
                </div>


                </div>    
                
            </div>
            <img 
                onClick={() => signOut()}
                src={session?.user?.image!} 
                alt="Profile Pic" 
                className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
            />
        </div>

    );
}

export default SideBar