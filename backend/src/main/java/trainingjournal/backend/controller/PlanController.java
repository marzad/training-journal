package trainingjournal.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
