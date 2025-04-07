export default function GetAvgRating(ratingArr){
    if(ratingArr?.length === 0) return 0
    // Calculate total review count
    const totalReviewCount = ratingArr?.reduce((acc, curr) =>{
        // Assuming `curr` is a number or an object with a `rating` property
        acc += curr.rating || 0 
        return acc
    }, 0)
    // Round to one decimal place
    const multiplier = Math.pow(10, 1)
    const avgReviewCount = Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier

    return avgReviewCount
}

