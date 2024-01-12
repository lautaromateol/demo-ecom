"use client"
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

const EditionContext = createContext()

export const useEditionContext = () => {
    return useContext(EditionContext)
}

const EditionProvider = ({ children }) => {

    const [console, setConsole] = useState("")

    const [editions, setEditions] = useState(null)

    const [updatingEdition, setUpdatingEdition] = useState(null)

    const createEdition = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/edition`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ console })
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Edition created")
                setConsole("")
                setEditions([data, ...editions])
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchEditions = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/edition`)
            const data = await response.json()
            if (response.ok) {
                setEditions(data)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred fetching the data. Try again.")
        }
    }

    const updateEdition = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/edition/${updatingEdition?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatingEdition)
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Edition updated")
                setEditions(
                    editions.map((e) => (
                        e._id !== data._id ? e : data
                    ))
                )
                setUpdatingEdition(null)
            }
        } catch (error) {
            toast.error("An error has ocurred updating the edition. Try again.")
        }
    }

    const deleteEdition = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/edition/${updatingEdition?._id}`, {
                method: "DELETE"
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Edition deleted")
                setEditions(
                    editions.filter((e) => (
                        e._id !== data._id
                    ))
                )
                setUpdatingEdition(null)
            }
        } catch (error) {
            toast.error("An error has ocurred deleting the edition. Try again.")
        }
    }

    return (
        <EditionContext.Provider value={{
            console,
            setConsole,
            editions,
            setEditions,
            updatingEdition,
            setUpdatingEdition,
            createEdition,
            updateEdition,
            fetchEditions,
            deleteEdition
        }}>
            {children}
        </EditionContext.Provider>

    )
}

export default EditionProvider;