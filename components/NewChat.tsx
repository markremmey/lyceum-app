'use client'

import { PlusIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ChangeEvent, MouseEvent, useState } from "react";

type Props = {
    id: string;
}

function NewChat() {
    const router = useRouter();
    const { data: session } = useSession();
    const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("From onCancelFile");
    };
    
    const onUploadFile = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("From onUploadFile");
    };
    
    

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
    
    const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("From onFileUploadChange");
    };
    
    // ... the other code here
    <input
        className="block w-0 h-0"
        name="file"
        type="file"
        onChange={onFileUploadChange}
    />

    return (
        <div>
            <div onClick={createNewChat} className="border-gray-700 border chatRow">
                <PlusIcon className="h-6 w-6" />
                <p>Start a Book</p>
            </div>


            <form
                className="w-full p-3 border border-gray-500 border-dashed"
                action=""
            >
            <div className="flex flex-col md:flex-row gap-1.5 md:py-4">
              <label className="flex flex-col items-center justify-center flex-grow h-full py-3 transition-colors text-white duration-150 cursor-pointer hover:text-gray-600">  
                <strong className="text-sm font-medium">Select a text file</strong>
                <input className="block w-0 h-0" name="file" type="file" />
              </label>
              <div className="flex mt-4 md:mt-0 md:flex-col justify-center gap-1.5">
                <button
                  disabled={true}
                  className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
                >
                  Cancel file
                </button>
                <button
                  disabled={true}
                  className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
                >
                  Upload file
                </button>
              </div>
            </div>
          </form>

        </div>
    )
}


export default NewChat