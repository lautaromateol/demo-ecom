import {FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa"

export default function Stars({rating}){
    const stars = []

    for(let i = 1; i <= 5; i++){
        if(i <= rating){
            stars.push(<FaStar className="text-main w-6 h-6" key={i}/>)
        } else if(i === Math.ceil(rating) && rating % 1 >= 0.5){
            stars.push(<FaStarHalfAlt className="text-main w-6 h-6" key={i}/>)
        } else {
            stars.push(<FaRegStar className="text-main w-6 h-6" key={i}/>)
        }
    }

    return(
        <div className="flex">{stars}</div>
    )

}
