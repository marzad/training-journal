import {Exercise} from "./Exercise";
import {Weekdays} from "./Weekdays";

export type Day = {
    weekday : Weekdays,
    exercises : Exercise[]
    notes?: string
    trainingfree: boolean
}