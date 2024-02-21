"use client"
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

const TagContext = createContext()

export const useTagContext = () => {
    return useContext(TagContext)
}

const TagProvider = ({ children }) => {

    const [name, setName] = useState("")

    const [parent, setParent] = useState("")

    const [tags, setTags] = useState(null)

    const [updatingTag, setUpdatingTag] = useState(null)

    const createTag = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/tag`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, parent })
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Tag created")
                setName("")
                setParent("")
                setTags([data, ...tags])
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred. Try again")
        }
    }

    const fetchTags = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/tag`)
            const data = await response.json()
            if (response.ok) {
                setTags(data)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred fetching the data. Try again.")
        }
    }

    const fetchTagsPublic = async () => {
        try {
            const response = await fetch(`${process.env.API}/tags`)
            const data = await response.json()
            if (response.ok) {
                setTags(data)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("An error has ocurred fetching the data. Try again.")
        }
    }

    const updateTag = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/tag/${updatingTag?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatingTag)
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Tag updated successfully.")
                setTags(
                    tags.map((t) => (
                        t._id !== data._id ? t : data
                    ))
                )
                setUpdatingTag(null)
                setParent("")
            }
        } catch (error) {
            toast.error("An error has ocurred updating the tag. Try again.")
        }
    }

    const deleteTag = async () => {
        try {
            const response = await fetch(`${process.env.API}/admin/tag/${updatingTag?._id}`, {
                method: "DELETE"
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Tag deleted successfully.")
                setTags(
                    tags.filter((t) => (
                        t._id !== data._id
                    ))
                )
                setUpdatingTag(null)
            }
        } catch (error) {
            toast.error("An error has ocurred deleting the tag. Try again.")
        }
    }

    return (
        <TagContext.Provider value={{
            name,
            setName,
            parent,
            setParent,
            tags,
            setTags,
            updatingTag,
            setUpdatingTag,
            createTag,
            updateTag,
            fetchTags,
            fetchTagsPublic,
            deleteTag
        }}>
            {children}
        </TagContext.Provider>

    )
}

export default TagProvider