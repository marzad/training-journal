
type UserWeightDetailsProps={
    userWeight : {date: Date, weight : number, bmi: number}
}

export default function UserWeightDetails(props: UserWeightDetailsProps){

    return(
        <>
            {props.userWeight.date} : {props.userWeight.weight}kg BMI: {props.userWeight.bmi}<br/>
        </>

    )
}