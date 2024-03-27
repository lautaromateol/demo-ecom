"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import toast from "react-hot-toast"

const Login = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
        })

        if (result?.error) {
            toast.error(result?.error)
        } else {
            router.push(callbackUrl)
        }

    }

    return (
        <section>
            <div className="flex items-center justify-center">
                <div className="w-full bg-white rounded-lg shadow-none md:shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-lg text-main font-medium uppercase tracking-wider mb-8">Sign in to your account</h1>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm text-primary uppercase">Your email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:border-primary block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm text-primary uppercase">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:border-primary block w-full p-2.5" required/>
                            </div>
                            <div className="flex items-center justify-center">
                                <Link href="/forgot-password" className="text-sm font-medium text-main hover:underline">Forgot password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-main hover:bg-tint focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center border focus:border-primary">Sign in</button>
                            <div>
                                <a onClick={()=> signIn("google", {callbackUrl})} className="text-white w-full cursor-pointer bg-red-500 hover:bg-red-600 border focus:border-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Continue with Google<div></div></a>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/register" className="font-medium text-main hover:underline">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login