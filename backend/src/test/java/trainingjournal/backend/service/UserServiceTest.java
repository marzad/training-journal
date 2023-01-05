package trainingjournal.backend.service;

import org.junit.jupiter.api.Test;
import trainingjournal.backend.model.*;
import trainingjournal.backend.repository.UserRepository;

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

        Exercise newExercise = new Exercise("1", "newExercise", 0,0,0);
        List<Exercise> newExercisesList = new ArrayList<>();
        newExercisesList.add(newExercise);
        Set<Exercise> newSet = new HashSet<>(newExercisesList);

        when(userRepository.findByUsername("username")).thenReturn(user);

        Set<Exercise> result = userService.addUserExercisesList("username", newExercisesList);

        assertEquals(newSet, result);

    }

}