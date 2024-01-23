'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"


function Login() {
    return (
        <div className="bg-[#a8a29e] h-screen flex flex-col justify-center items-center">
            <Image
                width={300}
                src='/laurel.svg' // Laurel Wreath
                height={300}
                alt='logo'
            />
            <button onClick={() => signIn('google')} className="text-black font-bold text-3xl animate-pulse">Sign In to use Lyceum App</button>
        </div>
    )
}

export default Login
