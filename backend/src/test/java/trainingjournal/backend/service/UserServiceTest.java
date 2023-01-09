package trainingjournal.backend.service;

import org.junit.jupiter.api.Test;
import trainingjournal.backend.model.*;
import trainingjournal.backend.repository.UserRepository;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    UserRepository userRepository = mock(UserRepository.class);
    UserService userService = new UserService(userRepository);

    @Test
    void test_addUserExercisesList(){
        GymUser user = new GymUser();
        user.setUsername("username");
        user.setExercises(new HashSet<>());

        ExerciseDTO newExerciseDTO = new ExerciseDTO("1", "newExercise");
        List<ExerciseDTO> newExercisesList = new ArrayList<>();
        newExercisesList.add(newExerciseDTO);

        Exercise newExercise = new Exercise("1", "newExercise", 0,0,0.0);
        Set<Exercise> newSet = new HashSet<>();
        newSet.add(newExercise);

        when(userRepository.findByUsername("username")).thenReturn(user);

        Set<Exercise> result = userService.addUserExercisesList("username", newExercisesList);

        assertEquals(newSet, result);

    }

    @Test
    void test_addPersonalData(){
        GymUser user = new GymUser();
        user.setUsername("username");
        user.setBirthday(LocalDate.parse("1999-12-12"));
        user.setGender(Gender.MALE);
        user.setUserWeight(Map.of(LocalDate.now(), 96.7));
        user.setBodysize(176.0);

        when(userRepository.findByUsername("username")).thenReturn(user);

        GymUser result = userService.addPersonalData("username", Gender.MALE, "1999-12-12", 96.7, 176.0);

        assertEquals(user, result);
    }

    @Test
    void test_setUserWeightItem(){

        Map<LocalDate, Double> result = userService.setUserWeightItem(55.5);

        assertFalse(result.isEmpty());
    }

}