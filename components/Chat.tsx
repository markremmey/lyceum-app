import React from "react";

type Props = {
    chatId: string
}

function Chat({ chatId }: Props) {
    return (
        <div className="flex-1"> Hello from Chat Component </div>
    )
}

export default Chat;