package trainingjournal.backend.service;

import org.springframework.stereotype.Service;
import trainingjournal.backend.model.Exercise;
import trainingjournal.backend.repository.ExerciseRepository;
import trainingjournal.backend.repository.PlanRepository;

import java.util.List;

@Service
public class PlanService {

    private PlanRepository planRepository;
    private ExerciseRepository exerciseRepository;

    public PlanService(PlanRepository planRepo, ExerciseRepository exerciseRepo){
        this.planRepository = planRepo;
        this.exerciseRepository = exerciseRepo;
    }

    public List<Exercise> getAllExercises(){
        return exerciseRepository.findAll();
    }

    public Exercise addNewExercise(String exerciseName) {
        String id =  (new IDGenerator()).getID();
        Exercise newExercise = new Exercise(id, exerciseName, 0,0,0);
        exerciseRepository.save(newExercise);
        return newExercise;
    }
}
