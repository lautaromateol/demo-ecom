"use client"
import { useEffect } from "react"
import { useEditionContext } from "@/context/EditionContext"

const EditionsList = () => {

    const {fetchEditions, editions, setUpdatingEdition} = useEditionContext()

    useEffect(()=> {
        fetchEditions()
    }, [])

    return (
        <div className="p-8 my-5">
        {editions?.map((e) => (
            <button className="px-3 py-2 border border-2 m-2 rounded-full hover:bg-gray-200" onClick={()=> setUpdatingEdition(e)}>{e.console}</button>
        ))}
    </div>
  )
}

export default EditionsList;