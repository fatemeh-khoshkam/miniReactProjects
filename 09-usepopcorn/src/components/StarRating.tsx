
const styleContainer:{
    display: string,
    gap:string,
    alignItems:string,
}= {
    display: 'flex',
    gap: "16px",
    alignItems: "center",
}

const starContainerStyle:{
    display: string,
    gap:string,
} = {
    display: 'flex',
    gap: "5px",
}

const textStyle:{
    lineHeight: string,
    margin: string
} ={
    lineHeight: '0',
    margin: '0'
}



export default function StarRating({maxRating = 5}: {maxRating?: number}) {
    return (
        <div style={ styleContainer }>
            <div style={ starContainerStyle }>
                {Array.from({ length: maxRating},(_,i:number) => (
                    <span>Start{i+1} </span>
                ))}
            </div>
            <p>5</p>
        </div>
    );
}