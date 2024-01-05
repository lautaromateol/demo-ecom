"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"

const Login = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
        })

        if(result?.error){
            toast.error(result?.error)
        } else {
            toast.success("Login successful")
            router.push(callbackUrl)
        }

    }

    return (
        <main className="flex justify-center">
            <form onSubmit={handleSubmit} className="border p-8 mt-20">
                <h2 className="text-center uppercase font-bold">Login</h2>
                <div className="my-4">
                    <label>Email</label>
                    <input className="block mt-1 outline-none border border-1 border-gray-300" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="my-4">
                    <label>Password</label>
                    <input className="block mt-1 outline-none border border-1 border-gray-300" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button disabled={!email || !password} className="text-white px-4 py-2 bg-blue-500 mt-2 w-full" type="submit">
                    Login
                </button>
                <button onClick={() => signIn("google", {callbackUrl: '/'})} className="text-white px-4 py-2 bg-red-500 mt-2 w-full">
                    Sign in with Google
                </button>
            </form>
        </main>
    )
}

export default Login