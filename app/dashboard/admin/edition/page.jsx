"use client"
import CreateEdition from "@/components/edition/CreateEdition"
import EditionsList from "@/components/edition/EditionsList"

const Editions = () => {

    return (
        <div className="container">
            <div className="mx-auto max-w-4xl p-4">
                <p className="text-2xl my-10">Create edition</p>
                <CreateEdition />
                <p className="text-2xl my-10">Edition's list</p>
                <EditionsList />
            </div>
        </div>
    )
}

export default Editions;