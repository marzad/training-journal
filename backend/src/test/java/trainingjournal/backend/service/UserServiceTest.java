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
    UserService userService = new UserService(userRepository);


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
    void test_samething(){
        assertTrue(true);
    }

}