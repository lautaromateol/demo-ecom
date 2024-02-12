import ProductReviews from "@/components/product/ProductReviews";
import Pagination from "@/components/product/Pagination";

const UserReviews = ({ reviews, currentPage, totalPages, pathname }) => {


    return (
        <>
            {reviews ?
                <div className="mt-5">
                    <ProductReviews reviews={reviews} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pathname={pathname}
                    />
                </div>
                :
                <div className="flex justify-center items-center">
                    No Reviews
                </div>
            }
        </>

    )
}

export default UserReviews;