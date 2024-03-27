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
            if (response.ok) {
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
        <section>
            <div className="flex items-center justify-center">
                <div className="w-full bg-white rounded-lg shadow-none md:shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <p className="text-lg text-main font-medium uppercase tracking-wider mb-8">Create your account</p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label for="name" className="block mb-2 text-sm text-primary uppercase">Your complete name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:border-primary block w-full p-2.5" required />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm text-primary uppercase ">Your email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:border-primary block w-full p-2.5" required />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm text-primary uppercase">Create password</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-primary sm:text-sm rounded-lg focus:border-primary block w-full p-2.5" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-main hover:bg-tint border focus:border-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
