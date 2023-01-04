package trainingjournal.backend.service;

import org.junit.jupiter.api.Test;
import trainingjournal.backend.model.*;
import trainingjournal.backend.repository.ExerciseRepository;
import trainingjournal.backend.repository.UserRepository;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    UserRepository userRepository = mock(UserRepository.class);
    ExerciseRepository exerciseRepository = mock(ExerciseRepository.class);
    UserService userService = new UserService(userRepository, exerciseRepository);



    //JimUser(id,
    //                newUser.username(),
    //                gender,
    //                birthday,
    //                weight,
    //                new HashSet<Week>(Set.of()),
    //                LocalDate.now(),
    //                password);
    // addUser(JimUserDTO newUser, Gender gender, LocalDate birthday, float weight)

    @Test
    void test_something(){
        assertTrue(true);
    }

    @Test
    void test_addUserExercisesList(){
        GymUser user = new GymUser();
        user.setUsername("username");
        user.setExercises(new HashSet<>());

        Exercise newExercise = new Exercise("1", "newExercise", 0,0,0);
        List<Exercise> newList = new ArrayList<>();
        newList.add(newExercise);
        Set<Exercise> newSet = new HashSet<>(newList);

        when(userRepository.findByUsername("username")).thenReturn(user);

        Set<Exercise> result = userService.addUserExercisesList("username", newList);

        assertEquals(newSet, result);

    }

}