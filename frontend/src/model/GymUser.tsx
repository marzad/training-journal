import {Week} from "./Week";

export type GymUser = {
    userId : string,
    username : string,
    gender : string,
    birthday : string,
    userWeight : {data : string, weight : number}[]
    trainingplans : Week[]

}