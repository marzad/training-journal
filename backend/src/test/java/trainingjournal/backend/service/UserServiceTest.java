package trainingjournal.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
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
    void test_loadUserByUsername(){
        String username = "username";
        GymUser newUser = new GymUser();
        newUser.setUsername(username);
        newUser.setPassword("password");
        userRepository.save(newUser);


        when(userRepository.findByUsername("username")).thenReturn(newUser);

        UserDetails result = userService.loadUserByUsername("username");

        assertEquals(username, result.getUsername());
    }

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
    void test_updatePersonalData_whenWeightToUpdate(){
        GymUser user = new GymUser();
        user.setUsername("username");
        Map<LocalDate, Double> newUserWeightMap = new HashMap<>();
        newUserWeightMap.put(LocalDate.parse("2019-12-12"), 96.7);
        user.setUserWeight(newUserWeightMap);

        when(userRepository.findByUsername("username")).thenReturn(user);

        Map<LocalDate, Double> result = userService.updateWeight("username", 90.0).getUserWeight();

        assertNotEquals(1,result.size());
    }
    @Test
    void test_updatePersonalData_whenUsernameToUpdate(){
        GymUser user = new GymUser();
        user.setUsername("username");

        when(userRepository.findByUsername("username")).thenReturn(user);

        GymUser result = userService.updateUsername("username", "Username");

        assertNotEquals("username",result.getUsername());
    }


    @Test
    void test_addNewGymUser(){

        String username = "username";
        String password = "password";
        Double userWeight = 96.9;
        Double userHight = 176.5;
        Gender gender = Gender.MALE;
        String birthday = "1996-12-12";

        GymUserSignup newUser = new GymUserSignup(username, gender, LocalDate.parse(birthday), userWeight, userHight, password);

        when(userRepository.findByUsername("username")).thenReturn(null);

        GymUser result = userService.addNewGymUser(newUser);

        assertEquals(newUser.username(),result.getUsername());
    }

    @Test
    void test_setWeekplan_whenWeekplanListEmpty(){

        String username = "username";

        Day dailyPlan = new Day(Weekday.MONDAY, new HashSet<>(), "");
        List<Week> newWeekList = new ArrayList<>();
        newWeekList.add(new Week());

        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        newGymUser.setWeekList(newWeekList);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        Week result = userService.setDailyPlan(username, dailyPlan);

        assertEquals(1, result.dailyPlans().size());
    }

    @Test
    void test_setWeekplan_whenWeekplanListNotEmpty_addSameDailyPlan(){

        String username = "username";

        Day dailyPlan_1 = new Day(Weekday.MONDAY, new HashSet<>(), "");
        Day dailyPlan_2 = new Day(Weekday.MONDAY, new HashSet<>(), "abc");

        Week newWeek = new Week();
        newWeek.dailyPlans().add(dailyPlan_1);

        List<Week> newWeekList = new ArrayList<>();
        newWeekList.add(newWeek);

        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        newGymUser.setWeekList(newWeekList);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);


        Week result = userService.setDailyPlan(username, dailyPlan_2);

        assertNotEquals(newWeek,result);

    }

    @Test
    void test_setWeekplan_whenWeekplanListNotEmpty_addAnotherDailyPlan(){

        String username = "username";

        Day dailyPlan_1 = new Day(Weekday.MONDAY, new HashSet<>(), "");
        Day dailyPlan_2 = new Day(Weekday.SATURDAY, new HashSet<>(), "");

        Week newWeek = new Week("2023_2",new HashSet<>());
        newWeek.dailyPlans().add(dailyPlan_1);

        List<Week> newWeekList = new ArrayList<>();
        newWeekList.add(newWeek);

        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        newGymUser.setWeekList(newWeekList);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        Week result = userService.setDailyPlan(username, dailyPlan_2);

        assertTrue(result.dailyPlans().size() >1);
    }

}