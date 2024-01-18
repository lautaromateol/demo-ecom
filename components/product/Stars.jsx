import {FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa"

export default function Stars({rating}){
    const stars = []

    for(let i = 1; i <= 5; i++){
        if(i <= rating){
            stars.push(<FaStar className="text-yellow-300" key={i}/>)
        } else if(i === Math.ceil(rating) && rating % 1 >= 0.5){
            stars.push(<FaStarHalfAlt className="text-yellow-300" key={i}/>)
        } else {
            stars.push(<FaRegStar className="text-yellow-300" key={i}/>)
        }
    }

    return(
        <div className="flex">{stars}</div>
    )

}
