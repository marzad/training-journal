package trainingjournal.backend.service;

import org.junit.jupiter.api.Test;
import trainingjournal.backend.model.ExerciseDTO;
import trainingjournal.backend.repository.ExerciseRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ExercisesServiceTest {

    ExerciseRepository exerciseRepository = mock(ExerciseRepository.class);
    ExercisesService planService = new ExercisesService(exerciseRepository);



    @Test
    void test_getAllExercises() {
        List<ExerciseDTO> exerciseList = new ArrayList<>();

        when(exerciseRepository.findAll()).thenReturn(exerciseList);

        List<ExerciseDTO> result = planService.getAllExercises();

        assertEquals(exerciseList, result);

    }

    @Test
    void test_addNewExercise(){

        ExerciseDTO newExercise = new ExerciseDTO("1", "exercise");


        when(exerciseRepository.save(newExercise)).thenReturn(newExercise);

        ExerciseDTO result = planService.addNewExercise("exercise");

        assertEquals(newExercise.description(),result.description());
    }
}