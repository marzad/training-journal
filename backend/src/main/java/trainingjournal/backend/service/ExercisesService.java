package trainingjournal.backend.service;

import org.springframework.stereotype.Service;
import trainingjournal.backend.model.ExerciseDTO;
import trainingjournal.backend.repository.ExerciseRepository;

import java.util.List;

@Service
public class ExercisesService {

    private final ExerciseRepository exerciseRepository;

    public ExercisesService(ExerciseRepository exerciseRepo){
        this.exerciseRepository = exerciseRepo;
        addPauseStratchingWarmupToRepo();
    }

    public List<ExerciseDTO> getAllExercises(){
        return exerciseRepository.findAll();
    }

    public ExerciseDTO addNewExercise(String exerciseName) {
        ExerciseDTO exercise;
        try{
            exercise = exerciseRepository.findByDescription(exerciseName).orElseThrow();
        }catch (Exception exception){
            String id =  (new IDGenerator()).getID();
            ExerciseDTO newExercise = new ExerciseDTO(id, exerciseName);

            exerciseRepository.save(newExercise);
            return newExercise;
        }
        return exercise;
    }

    private void addPauseStratchingWarmupToRepo(){
        this.addNewExercise("pause");
        this.addNewExercise("warmup");
        this.addNewExercise("stratching");
    }



}
