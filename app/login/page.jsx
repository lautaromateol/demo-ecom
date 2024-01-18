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
        <main className="grid place-items-center">
            <form onSubmit={handleSubmit} className="p-8 bg-slate-900 rounded-md">
                <h2 className="text-center text-2xl text-white uppercase font-bold">Login</h2>
                <div className="my-4">
                    <label className="text-white font-bold">EMAIL</label>
                    <input className="block mt-1 focus:outline-none focus:text-sm border-b-2 border-gray-300 rounded-md w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="my-4">
                    <label className="text-white font-bold">PASSWORD</label>
                    <input className="block mt-1 focus:outline-none focus:text-sm border-b-2 border-gray-300 rounded-md w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button disabled={!email || !password} className="font-bold px-4 py-2 bg-white my-1 w-full rounded-md" type="submit">
                    Login
                </button>
                <p className="my-1 text-white font-bold text-center">OR</p>
                <a onClick={() => signIn("google", {callbackUrl: '/'})} className="block font-bold text-white text-center px-4 py-2 bg-red-600 my-1 w-full cursor-pointer rounded-md">
                    Continue with Google
                </a>
            </form>
        </main>
    )
}

export default Login