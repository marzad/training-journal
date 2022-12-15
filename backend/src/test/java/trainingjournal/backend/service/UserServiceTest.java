package trainingjournal.backend.service;

import org.junit.jupiter.api.Test;
import trainingjournal.backend.model.Gender;
import trainingjournal.backend.model.GymUser;
import trainingjournal.backend.model.GymUserDTO;
import trainingjournal.backend.model.Week;
import trainingjournal.backend.repository.ExerciseRepository;
import trainingjournal.backend.repository.PlanRepository;
import trainingjournal.backend.repository.UserRepository;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    UserRepository userRepository = mock(UserRepository.class);
    PlanRepository planRepository = mock(PlanRepository.class);
    ExerciseRepository exerciseRepository = mock(ExerciseRepository.class);
    UserService userService = new UserService(userRepository, planRepository, exerciseRepository);


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
    void test_addUser() {

        GymUserDTO user = new GymUserDTO("username", "password");
        GymUser newUser = new GymUser(
                "id",
                user.username(),
                Gender.FEMALE,
                null,
                0.0,
                new HashSet<Week>(),
                null,
                "password"
                );

        when(userRepository.save(newUser)).thenReturn(newUser);

        GymUser result = userService.addUser(user, Gender.FEMALE, null, 0.0);

        assertEquals(result.getUsername(), newUser.getUsername());
    }

    @Test
    void test_updateUser(){
        GymUser user = new GymUser(
                "id",
                "username",
                Gender.FEMALE,
                null,
                0.0,
                new HashSet<>(),
                null,
                "password"
        );

        when(userRepository.findByUsername("username")).thenReturn(user);
        user.setUsername("newUsername");

        when(userRepository.save(user)).thenReturn(user);

        GymUser result = userService.updateUser("username", "newUsername");

        assertEquals("newUsername",result.getUsername());
    }


}