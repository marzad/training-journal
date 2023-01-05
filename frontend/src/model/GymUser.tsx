import {Week} from "./Week";
import {Exercise} from "./Exercise";

export type GymUser = {
    userId : string,
    username : string,
    gender : string,
    birthday : string,
    userWeight : {date : string, weight : number}[]
    trainingPlans : Week[]
    exercises: Exercise[]
    password: string
}