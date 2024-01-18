"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { priceRanges } from "@/utils/filterData";
import { useCategoryContext } from "@/context/CategoryContext";
import { useTagContext } from "@/context/TagContext";
import { useProductContext } from "@/context/ProductContext";
import Link from "next/link";
import Stars from "./Stars";

const ProductFilter = ({ searchParams }) => {

    const pathname = '/shop'
    const { minPrice, maxPrice, ratings, category, tag, developer } = searchParams

    const { fetchCategoriesPublic, categories } = useCategoryContext()

    const { fetchTagsPublic, tags } = useTagContext()

    const { developers, fetchDevelopers } = useProductContext()

    const router = useRouter()

    const handleRemoveFilter = (filterName) => {
        const updatedSearchParams = { ...searchParams }

        if (typeof filterName === "string") {
            delete updatedSearchParams[filterName]
            if(filterName === "category") delete updatedSearchParams.tag
        }

        if (Array.isArray(filterName)) {
            filterName?.forEach((name) => {
                delete updatedSearchParams[name]
            })
        }

        updatedSearchParams.page = 1

        const queryString = new URLSearchParams(updatedSearchParams).toString()
        const newUrl = `${pathname}?${queryString}`
        router.push(newUrl)
    }

    useEffect(() => {
        fetchCategoriesPublic()
        fetchTagsPublic()
        fetchDevelopers()
    }, [])

    return (
        <div className="p-4">
            <p className="text-lg font-bold">Filter Products</p>
            <Link href="/shop" className="text-red-500">Clear Filters</Link>
            <p className="mt-4 bg-indigo-100 text-black p-2">Price</p>
            <div className="flex flex-wrap items-center p-2 mx-1">
                {priceRanges?.map((range) => {
                    const url = {
                        pathname,
                        query: {
                            ...searchParams,
                            minPrice: range?.min,
                            maxPrice: range?.max,
                            page: 1,
                        },
                    };
                    const isActive =
                        minPrice === String(range?.min) && maxPrice === String(range?.max);
                    return (
                        <div key={range?.label} className="mr-2 mb-2">
                            <Link
                                href={url}
                                className={`inline-block shadow-lg uppercase px-3 py-1 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'border text-black'
                                    }`}
                            >
                                {range?.label}
                            </Link>
                            {isActive && (
                                <span
                                    onClick={() => handleRemoveFilter(['minPrice', 'maxPrice'])}
                                    className="text-red-600 font-bold cursor-pointer ml-1"
                                >
                                    X
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="mt-4 bg-indigo-100 text-black p-2">Ratings</p>
            <div className="flex flex-wrap items-center p-2 mx-1">
                {[5, 4, 3, 2, 1]?.map((rating) => {
                    const url = {
                        pathname,
                        query: {
                            ...searchParams,
                            ratings: rating,
                            page: 1,
                        },
                    };
                    const isActive = String(rating) === String(ratings)
                    return (
                        <div key={rating} className="mr-2 mb-2">
                            <Link
                                href={url}
                                className={`inline-block shadow-lg px-3 py-2 rounded-full ${isActive && 'bg-blue-600'}
                                    }`}
                            >
                                <Stars rating={rating} />
                            </Link>
                            {isActive && (
                                <span
                                    onClick={() => handleRemoveFilter("ratings")}
                                    className="text-red-600 font-bold cursor-pointer ml-1"
                                >
                                    X
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="mt-4 bg-indigo-100 text-black p-2">Categories</p>
            <div className="flex flex-wrap overflow-y-scroll max-h-[200px] items-center p-2 mx-1">
                {categories?.map((c) => {
                    const url = {
                        pathname,
                        query: {
                            ...searchParams,
                            category: c?._id,
                            page: 1,
                        },
                    };
                    const isActive = String(c?._id) === String(category)
                    return (
                        <div key={c?._id} className="mr-2 mb-2">
                            <Link
                                href={url}
                                className={`inline-block shadow-lg px-3 py-2 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'border'}
                                    }`}
                            >
                                {c?.name}
                            </Link>
                            {isActive && (
                                <span
                                    onClick={() => handleRemoveFilter("category")}
                                    className="text-red-600 font-bold cursor-pointer ml-1"
                                >
                                    X
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
            {category && (
                <>
                    <p className="mt-4 bg-indigo-100 text-black p-2">Tags</p>
                    <div className="flex flex-wrap overflow-y-scroll max-h-[200px] items-center p-2 mx-1">
                        {tags?.filter((t) => t?.parent === category)?.map((t) => {
                            const url = {
                                pathname,
                                query: {
                                    ...searchParams,
                                    tag: t?._id,
                                    page: 1,
                                },
                            };
                            const isActive = String(t?._id) === String(tag)
                            return (
                                <div key={t?._id} className="mr-2 mb-2">
                                    <Link
                                        href={url}
                                        className={`inline-block shadow-lg px-3 py-2 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'border'}
                                    }`}
                                    >
                                        {t?.name}
                                    </Link>
                                    {isActive && (
                                        <span
                                            onClick={() => handleRemoveFilter("tag")}
                                            className="text-red-600 font-bold cursor-pointer ml-1"
                                        >
                                            X
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            <p className="mt-4 bg-indigo-100 text-black p-2">Developers</p>
            <div className="flex flex-wrap overflow-y-scroll max-h-[200px] items-center p-2 mx-1">
                {developers?.map((d, index) => {
                    const url = {
                        pathname,
                        query: {
                            ...searchParams,
                            developer: d,
                            page: 1,
                        },
                    };
                    const isActive = String(developer) === String(d)
                    return (
                        <div key={index} className="mr-2 mb-2">
                            <Link
                                href={url}
                                className={`inline-block shadow-lg px-3 py-2 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'border'}
                                    }`}
                            >
                                {d}
                            </Link>
                            {isActive && (
                                <span
                                    onClick={() => handleRemoveFilter("developer")}
                                    className="text-red-600 font-bold cursor-pointer ml-1"
                                >
                                    X
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )

}

export default ProductFilter;

