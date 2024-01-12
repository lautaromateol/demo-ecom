import { useEditionContext } from "@/context/EditionContext"

const CreateEdition = () => {

    const { console, setConsole, updatingEdition, setUpdatingEdition, createEdition, updateEdition, deleteEdition } = useEditionContext()

    return (
        <div className="my-5">
            <input type="text"
                value={updatingEdition ? updatingEdition.console : console}
                className="border-b border-b-2 focus:outline-none focus:border-blue-200 border-gray-200 my-2 w-full"
                placeholder="Console name"
                onChange={(e) => updatingEdition ? setUpdatingEdition({ ...updatingEdition, console: e.target.value }) : setConsole(e.target.value)}
            />
            <div className="flex justify-between">
                <button 
                className="mt-5 px-4 py-2 bg-blue-500 text-white m-2"
                onClick={(e) => {
                    e.preventDefault()
                    updatingEdition ? updateEdition() : createEdition()
                }}>
                    {updatingEdition ? "Update" : "Create"}
                </button>
                {updatingEdition && (
                    <>
                        <button className="mt-5 px-4 py-2 bg-red-500 text-white m-2" onClick={(e) => {
                            e.preventDefault()
                            deleteEdition()
                        }}>
                            Delete
                        </button>
                        <button className="mt-5 px-4 py-2 bg-black text-white m-2" onClick={() => setUpdatingEdition(null)}>
                            Clear
                        </button>
                    </>
                )}
            </div>
        </div>
    )

}

export default CreateEdition;