"use client"
import { useEffect } from "react"
import { useTagContext } from "@/context/TagContext"

const TagsList = () => {

    const {fetchTags, tags, setUpdatingTag} = useTagContext()

    useEffect(()=> {
        fetchTags()
    }, [])

    return (
        <div className="my-5">
        {tags?.map((t) => (
            <button className="px-3 py-2 border border-2 m-2 hover:bg-gray-200" onClick={()=> setUpdatingTag(t)}>{t.name}</button>
        ))}
    </div>
  )
}

export default TagsList