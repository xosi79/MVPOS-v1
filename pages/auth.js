import { useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function AuthPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const router = useRouter()
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleAuth = async (e) => {
        e.preventDefault()
        setMessage(null)
        setLoading(true)

        let result
        if (isLogin) {
            result = await supabase.auth.signInWithPassword({ email, password})
        } else {
            result = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName
                    }
                }
            })
        }

        const { error } = result
        if (error) {
            setMessage(error.message)
        } else {
            setMessage("Check email to confirm account")
        }
        if (error?.message.includes("Emai not confirmed")) {
            setMessage("You need to confirm your email before logging in")
        } else {
            setMessage(error.message)
        }
        
        setLoading(false)
        return
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded space-y-4">
            <h1 className="text-2x1 font-bold text-center">
                {isLogin ? "Login" : "Sign up"}
            </h1>
            <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </>
                )}
            
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <div className="flex justify-center">
                    <button 
                    type="button"
                    onClick={() => setIsLogin(!isLogin)} 
                    className="p-2 border-1 rounded">
                        Switch to {isLogin ? "Sign up" : "Login"}
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded"
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>
            {message && <p className="text-red-500 text-sm text-center">{message}</p>}
        </div>
    )
}