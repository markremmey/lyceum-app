import { PlusIcon } from "@heroicons/react/24/outline"

function NewChat() {
    return (
        <div className="border-gray-700 border chatRow">
            <PlusIcon className="h-6 w-6" />
            <p >New Chat</p>
        </div>
    )
}


export default NewChat