import {useEffect, useState} from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabase"

export default function dashboard() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [submissions, setSubmissions] = useState([])

    useEffect(() => {
        //function runs once when dashboard page opens
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
        

        //if user is found then store
        if (data?.user) {
            setUser(data.user)
        } else {
        // if no user kick to login
            router.push("/auth")
        }

        setLoading(false)
    }

    getUser()
}, [])

    useEffect(() => {
        if (!user) return

        const fetchSubmissions = async () => {
            const { data, error } = await supabase
                .from("submissions")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", {ascending: false})
            
            if (error) {
                console.error("Fetch error:", error.message)
            } else{
                setSubmissions(data)
            }
        }

        fetchSubmissions()
    }, [user])
    

//optional loading ui
if (loading) return <p>Checking details...</p>

if (!user) return <p>User not found</p> //shows if user isnt found

return (
    <div>
        <h1>Welcome, {user.email}</h1>
        <p>This is your dashboard</p>
    </div>
    )

}