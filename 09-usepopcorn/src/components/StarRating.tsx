import {useState , useEffect} from "react";

const styleContainer:{
    display: string,
    gap:string,
    alignItems:string,
    justifyContent:string
}= {
    display: 'flex',
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",
}

const starContainerStyle:{
    display: string,
} = {
    display: 'flex',
}


type starRatingPropsType = {
    maxRating?: number,
    color?: string,
    size?: number,
    messages?: string[],
    defaultRating? : number,
    onSetRating? : (rate:number) => void,
    userRating? : number | null
}

function StarRating({ maxRating = 5 , color = "#fcc419" , size = 48 , messages , defaultRating = 0 , onSetRating , userRating}: starRatingPropsType) {
    const [rating, setRating] = useState<number>(defaultRating);
    const [tempRating, setTempRating] = useState<number>(0);

    useEffect(() => {
        setRating(userRating ?? defaultRating);
    }, [userRating, defaultRating]);

    function handleRating(rating:number):void {
        setRating(rating)
        console.log(`handleRating called with: ${rating}`);
        if (onSetRating) {
            console.log(`onSetRating is present. Calling it with: ${rating}`);
            onSetRating(rating)
        }
    }

    function checkFullStarRating(i:number):boolean {
        return (tempRating ? tempRating >= i + 1 : rating >= i + 1) ;
    }

    const textStyle:{
        lineHeight: string,
        margin: string,
        color: string,
        fontSize: string,
    } = {
        lineHeight: '0',
        margin: '0',
        color: color,
        fontSize: `${size / 1.5}px`
    }


    return (
        <div style={ styleContainer }>
            <div style={ starContainerStyle }>
                {Array.from({ length: maxRating},(_,i:number) => (
                    <Star
                        key={i}
                        onRate={() => handleRating(i+1)}
                        full={checkFullStarRating(i)}
                        onHoverIn={() => setTempRating(i+1)}
                        onHoverOut={() => setTempRating(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <p style={textStyle}>
                {messages?.length === maxRating ? messages[tempRating? tempRating - 1 : rating - 1] : tempRating || rating || ""}
            </p>

        </div>
    );
}

type starPropsType = {
    onRate: () => void ,
    full?: boolean,
    onHoverIn: () => void,
    onHoverOut: () => void,
    color: string,
    size: number,
}

function Star({ onRate , full , onHoverIn ,onHoverOut , color , size }: starPropsType) {
    const starStyle : {
        width: string,
        height: string,
        display: string,
        cursor: string

    } = {
        width:`${size}px`,
        height:`${size}px`,
        display: 'block',
        cursor: 'pointer',
    }

    return(
        <span
            role='button'
            style={starStyle}
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}>
               {full ? (
                   <svg
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 20 20"
                   fill={color}
                   stroke={color}
               >
                   <path
                       d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                   />
               </svg>) :
                   (
                       <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke={color}
                       >
                           <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               strokeWidth="{2}"
                               d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                           />
                       </svg>
                   )}
        </span>
    )
}

export default StarRating