import {Week} from "./Week";
import {Exercise} from "./Exercise";

export type GymUser = {
    userId : string,
    username : string,
    gender : string,
    birthday : string,
    userWeight : {data : string, weight : number}[]
    trainingplans : Week[]
    exercises: Exercise[]
    password: string
}