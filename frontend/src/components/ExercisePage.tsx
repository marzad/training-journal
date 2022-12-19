import {Exercise} from "../model/Exercise";
import ExerciseDetails from "./ExerciseDetails";


type exercisePageProps = {
    exercises : Exercise[]
}

export default function ExercisePage(props: exercisePageProps){

    function exerciseList(){
        if(props.exercises){
            return props.exercises.map(entity => {
                return <ExerciseDetails key={entity.id} exercise={entity}/>
            })
        }

    }
    return(
        <>
            {exerciseList()}
        </>
    )
}