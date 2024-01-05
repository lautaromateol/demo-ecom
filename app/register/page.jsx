"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const Register = () => {

    const router = useRouter()

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(`${process.env.API}/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await response.json()
            if(response.ok){
                toast.success(data.success)
                router.push('/login')
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <main className="flex justify-center">
            <form onSubmit={handleSubmit} className="border p-8 mt-20">
                <h2 className="text-center uppercase font-bold">Register</h2>
                <div className="my-4">
                    <label>Insert your name</label>
                    <input className="block mt-1 outline-none border border-1 border-gray-300" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="my-4">
                    <label>Insert your email</label>
                    <input className="block mt-1 outline-none border border-1 border-gray-300" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="my-4">
                    <label>Insert your password</label>
                    <input className="block mt-1 outline-none border border-1 border-gray-300" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button disabled={!name || !email || !password} className="text-white px-4 py-2 bg-blue-500 mt-2 w-full" type="submit">Register</button>
            </form>
        </main>
    )
}

export default Register
