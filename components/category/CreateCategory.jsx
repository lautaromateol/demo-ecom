"use client";
import { useCategoryContext } from "@/context/CategoryContext";
import toast from "react-hot-toast";

const CreateCategory = ()=> {

    const {name, setName, updatingCategory, setUpdatingCategory, createCategory, updateCategory, deleteCategory} = useCategoryContext()

    return(
        <div>
            <input type="text" 
            value={updatingCategory ? updatingCategory.name : name} 
            onChange={(e) => updatingCategory ? setUpdatingCategory({...updatingCategory, name: e.target.value}) : setName(e.target.value)}
            className="border-b border-b-2 focus:outline-none focus:border-blue-200 border-gray-200 bg-gray-100 my-2 w-full"/>
            <button className="mt-5 px-4 py-2 rounded-full bg-blue-500 text-white m-2" 
            onClick={
                (e)=> {
                    e.preventDefault()
                    if(!updatingCategory && !name){
                        toast.error("You have to provide a name")
                        return
                    }
                    if(name && name.length > 20){
                        toast.error("The tag name is too long. Max length: 20 caracters")
                    }
                    updatingCategory ? updateCategory() : createCategory()
                }
            }>
                {updatingCategory ? 'Update' : 'Create'}
            </button>
            {updatingCategory && (
                <>
                <button className="mt-5 px-4 py-2 rounded-full bg-red-500 text-white m-2" onClick={(e)=> {
                    e.preventDefault()
                    deleteCategory()
                }}>
                    Delete
                </button>
                <button className="mt-5 px-4 py-2 rounded-full bg-black text-white m-2" onClick={()=> setUpdatingCategory(null)}>
                    Clear
                </button>
                    </>
            )}
        </div>
    )
}

export default CreateCategory