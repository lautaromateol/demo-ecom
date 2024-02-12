"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import UserOrders from "@/components/user/UserOrders";
import UserReviews from "@/components/user/UserReviews";
import toast from "react-hot-toast";

const UserDashboard = () => {

    const { data } = useSession()

    const [orders, setOrders] = useState([])

    const [loading, setLoading] = useState(true)

    const [reviews, setReviews] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const page = searchParams.get("page")

    async function getReviews (page) {
        try {
            const response = await fetch(`${process.env.API}/user/product/reviews?page=${page}`, {
                method: "GET"
            })
            const data = await response.json()
            if (response.ok) {
                setReviews(data.reviews)
                setCurrentPage(data.currentPage)
                setTotalPages(data.totalPages)
                setLoading(false)
            } else {
                setLoading(false)
                console.log(data.error)
                toast.error("Error fetching the reviews. Try again later.")
            }
        } catch (error) {
            console.log(error)
            toast.error("Error fetching the reviews. Try again.")
        }
    }

    async function getOrders() {
        const response = await fetch(`${process.env.API}/user/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        if (response.ok) {
            setOrders(data)
        } else {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
        getReviews(page)
    }, [])

    return (
        <>
            {loading ?
                <div className="flex items-center justify-center min-h-screen">
                    LOADING
                </div>
                :
                <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                            <div className="text-center dark:text-white">
                                <img
                                    src={data.user.image || "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"}
                                    alt="User Profile"
                                    className="w-24 h-24 rounded-full mx-auto mb-4 dark:text-white"
                                />
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    {data.user.name}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{data.user.email}</p>
                            </div>

                            <Breadcrumb
                                items={[
                                    {
                                        href: '',
                                        title: <HomeOutlined />,
                                    },
                                    {
                                        title: 'User Profile',
                                    },
                                ]}
                            />


                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Contact Information
                                </h3>
                                <ul className="mt-2 text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center mb-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M3 9a3 3 0 016 0 3 3 0 016 0 3 3 0 016 0 3 3 0 016 0 3 3 0 016 0 3 3 0 016 0M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                        {data.user.email}
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Shopping History
                                </h3>
                                <UserOrders orders={orders} />
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Reviews History
                                </h3>
                                <UserReviews reviews={reviews} totalPages={totalPages} currentPage={currentPage} pathname={pathname}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default UserDashboard;

