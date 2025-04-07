import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"



// Review_Count: A number representing the rating
// Star_Size: (Optional) A number to determine the size of the stars. Defaults to 20 if not provided.
function RatingStars({ Review_Count, Star_Size }){
    // to manage the number of stars
    const [starCount, setStarCount] = useState({
        full : 0, //Number of fully filled stars.
        half: 0, //Number of half-filled stars (either 0 or 1).
        empty : 0 //Number of empty stars.
    })
    

    useEffect(() => {
        const wholeStars = Math.floor(Review_Count) || 0
        setStarCount({
            full : wholeStars,
            half : Number.isInteger(Review_Count) ? 0 : 1, //checks if the rating is a whole number 3.0 → Half Star: 0
            //Subtract full and half stars from 5 to get the empty stars Review_Count = 3.0 → Empty Stars: 5 - 3 = 2.
            empty : Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
        })
    }, [Review_Count])

    

    return (

        <div className="flex gap-1 text-yellow-100">
            {[...new Array(starCount.full)].map((_, i) => {
                return <TiStarFullOutline key={i} size={Star_Size || 20} />
            })}
            {[...new Array(starCount.half)].map((_, i) => {
                return <TiStarHalfOutline key={i} size={Star_Size || 20} />
            })}
            {[...new Array(starCount.empty)].map((_, i) => {
                return <TiStarOutline key={i} size={Star_Size || 20} />
            })}
        </div>
    )
}
export default RatingStars