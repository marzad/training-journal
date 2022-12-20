package trainingjournal.backend.controller;

import org.springframework.web.bind.annotation.*;
import trainingjournal.backend.model.Exercise;
import trainingjournal.backend.service.PlanService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PlanController {

    private PlanService planService;

    public PlanController(PlanService planService){
        this.planService = planService;
    }

    @GetMapping("/exercises")
    public List<Exercise> getAllExercises(){
        return planService.getAllExercises();
    }

    @PostMapping("/exercises")
    public Exercise addNewExercise(@RequestBody String exerciseName){
        return planService.addNewExercise(exerciseName);
    }
}
