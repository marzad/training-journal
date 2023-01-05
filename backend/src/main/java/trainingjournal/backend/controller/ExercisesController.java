package trainingjournal.backend.controller;

import org.springframework.web.bind.annotation.*;
import trainingjournal.backend.model.ExerciseDTO;
import trainingjournal.backend.service.ExercisesService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExercisesController {

    private final ExercisesService planService;

    public ExercisesController(ExercisesService planService){
        this.planService = planService;
    }

    @GetMapping("/exercises")
    public List<ExerciseDTO> getAllExercises(){
        return planService.getAllExercises();
    }

    @PostMapping("/exercises")
    public ExerciseDTO addNewExercise(@RequestBody String exerciseName){
        return planService.addNewExercise(exerciseName);
    }
}
