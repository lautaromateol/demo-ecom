import Link from "next/link"

const Pagination = ({totalPages, currentPage, pathname})=> {
    return(
        <div className="mt-5">
                <nav className="flex justify-center">
                    <ul className="flex">
                        {Array.from({ length: totalPages }, (_, index ) => {
                            const page = index + 1
                            return(
                                <li className={`mx-2 px-3 py-1 rounded-full ${currentPage === page ? "bg-blue-600" : "bg-blue-300"} text-white`} key={page}>
                                    <Link href={`${pathname}?page=${page}`}
                                    as={`${pathname}?page=${page}`}
                                    >
                                        {page}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
    )
}

export default Pagination;