
type UserWeightDetailsProps={
    userWeight : {date: Date, weight : number}
}

export default function UserWeightDetails(props: UserWeightDetailsProps){

    return(
        <>
            {props.userWeight.date} : {props.userWeight.weight}kg <br/>

        </>

    )
}