export function calculateAverageRating(ratings) {
    let totalRating = 0
    for (const ratingObj of ratings) {
        totalRating += ratingObj.rating
    }
    const averageRating = totalRating / ratings.length
    return averageRating
}

export function logo() {
    return (
        <span className="text-2xl text-green-500 font-bold">SupEcom</span>
    )
}