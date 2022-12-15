package trainingjournal.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import trainingjournal.backend.model.Gender;
import trainingjournal.backend.model.JimUser;
import trainingjournal.backend.model.JimUserDTO;
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

        String password = new Argon2PasswordEncoder().encode("password");
        JimUserDTO user = new JimUserDTO("username", "password");
        JimUser newUser = new JimUser(
                "id",
                user.username(),
                Gender.FEMALE,
                null,
                0.0,
                new HashSet<Week>(),
                null,
                password
                );

        when(userRepository.save(newUser)).thenReturn(newUser);

        JimUser result = userService.addUser(user, Gender.FEMALE, null, 0.0);


        assertEquals(result.username(), newUser.username());

    }
}