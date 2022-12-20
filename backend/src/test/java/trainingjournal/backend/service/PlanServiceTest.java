package trainingjournal.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import trainingjournal.backend.model.Exercise;
import trainingjournal.backend.repository.ExerciseRepository;
import trainingjournal.backend.repository.PlanRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PlanServiceTest {

    PlanRepository planRepository = mock(PlanRepository.class);
    ExerciseRepository exerciseRepository = mock(ExerciseRepository.class);
    PlanService planService = new PlanService(planRepository, exerciseRepository);



    @Test
    void test_getAllExercises() {
        List<Exercise> exerciseList = new ArrayList<>();

        when(exerciseRepository.findAll()).thenReturn(exerciseList);

        List<Exercise> result = planService.getAllExercises();

        assertEquals(exerciseList, result);

    }

    @Test
    void test_addNewExercise(){
        List<Exercise> exerciseList = new ArrayList<>();
        Exercise newExercise = new Exercise("1", "exercise", 0,0,0);
        exerciseList.add(newExercise);

        when(exerciseRepository.save(newExercise)).thenReturn(newExercise);

        Exercise result = planService.addNewExercise("exercise");

        assertEquals(newExercise.description(),result.description());
    }
}