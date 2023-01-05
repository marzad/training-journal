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
    }

    public List<ExerciseDTO> getAllExercises(){
        return exerciseRepository.findAll();
    }

    public ExerciseDTO addNewExercise(String exerciseName) {
        String id =  (new IDGenerator()).getID();
        ExerciseDTO newExercise = new ExerciseDTO(id, exerciseName);
        exerciseRepository.save(newExercise);
        return newExercise;
    }



}
