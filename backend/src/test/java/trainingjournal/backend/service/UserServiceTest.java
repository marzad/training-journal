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
        user.setUserHeight(170.0);
        Set<UserWeight> userWeightSet = new HashSet<>();
        userWeightSet.add((new UserWeight(LocalDate.parse("2019-12-12"), 96.7, (170.0/Math.pow(96.7, 2)))));
        user.setUserWeight(userWeightSet);
        userRepository.save(user);

        when(userRepository.findByUsername("username")).thenReturn(user);

        Set<UserWeight> result = userService.updateWeight("username", 90.0);

        assertEquals(2,result.size());
    }
    @Test
    void test_updatePersonalData_whenWeightToUpdate_whenDateExist(){
        GymUser user = new GymUser();
        user.setUsername("username");
        user.setUserHeight(170.0);
        Set<UserWeight> userWeightSet = new HashSet<>();
        userWeightSet.add((new UserWeight(LocalDate.now(), 96.7, (170.0/Math.pow(96.7,2)))));
        user.setUserWeight(userWeightSet);
        userRepository.save(user);

        when(userRepository.findByUsername("username")).thenReturn(user);

        Set<UserWeight> result = userService.updateWeight("username", 90.0);

        assertEquals(1, result.size());
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
        Double userHeight = 176.5;
        Gender gender = Gender.MALE;
        String birthday = "1996-12-12";

        GymUserSignup newUser = new GymUserSignup(username, gender, LocalDate.parse(birthday), userWeight, userHeight, password);

        when(userRepository.findByUsername("username")).thenReturn(null);

        GymUser result = userService.addNewGymUser(newUser);

        assertEquals(newUser.username(),result.getUsername());
    }

    @Test
    void test_setWeekplan_whenWeekplanListEmpty(){

        String username = "username";

        Day dailyPlan = new Day(Weekday.MONDAY,new ArrayList<>(), "", false);
        List<Week> newWeekList = new ArrayList<>();
        newWeekList.add(new Week("1", new HashSet<>()));

        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        newGymUser.setWeekPlansList(newWeekList);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        Week result = userService.setDailyPlan(username, dailyPlan);

        assertEquals(1, result.dailyPlans().size());
    }

    @Test
    void test_setWeekplan_whenWeekplanListNotEmpty_addSameDailyPlan(){

        String username = "username";

        Day dailyPlan_1 = new Day(Weekday.MONDAY, new ArrayList<>(), "", false);
        Day dailyPlan_2 = new Day(Weekday.MONDAY, new ArrayList<>(), "abc", false);

        Week newWeek = new Week("1", new HashSet<>());
        newWeek.dailyPlans().add(dailyPlan_1);

        List<Week> newWeekList = new ArrayList<>();
        newWeekList.add(newWeek);

        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        newGymUser.setWeekPlansList(newWeekList);
        userRepository.save(newGymUser);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);


        Week result = userService.setDailyPlan(username, dailyPlan_2);

        assertEquals(1, result.dailyPlans().size());
    }

    @Test
    void test_setWeekplan_whenWeekplanListNotEmpty_addAnotherDailyPlan(){

        String username = "username";

        Day dailyPlan_1 = new Day(Weekday.MONDAY, new ArrayList<>(), "", false);
        Day dailyPlan_2 = new Day(Weekday.SATURDAY, new ArrayList<>(), "", false);

        String weekID = (new IDGenerator()).getWeekID();

        Week newWeek = new Week(weekID,new HashSet<>());
        newWeek.dailyPlans().add(dailyPlan_1);

        List<Week> newWeekList = new ArrayList<>();
        newWeekList.add(newWeek);

        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        newGymUser.setWeekPlansList(newWeekList);
        newWeek.dailyPlans().add(dailyPlan_2);


        when(userRepository.findByUsername("username")).thenReturn(newGymUser);



        Week result = userService.setDailyPlan(username, dailyPlan_2);
        System.out.println(result);

        assertEquals(newWeek,result);
    }

    @Test
    void test_setWeekplan_whenWeekplanListNotEmpty_addTrainingfreeDay(){

        String username = "username";

        Day dailyPlan_1 = new Day(Weekday.MONDAY, new ArrayList<>(), "", false);
        Day dailyPlan_2 = new Day(Weekday.SATURDAY, new ArrayList<>(), "", true);

        String weekID = (new IDGenerator()).getWeekID();

        Week newWeek = new Week(weekID,new HashSet<>());
        newWeek.dailyPlans().add(dailyPlan_1);

        List<Week> newWeekList = new ArrayList<>();
        newWeekList.add(newWeek);

        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        newGymUser.setWeekPlansList(newWeekList);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        Week result = userService.setDailyPlan(username, dailyPlan_2);

        assertTrue(result.dailyPlans().size() >1);
    }

    @Test
    void test_getUserExercises_whenSetEmpty(){
        String username = "username";
        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        Set<Exercise> newUserExercisesSet = new HashSet<>();

        newGymUser.setExercises(newUserExercisesSet);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        Set<Exercise> result = userService.getUserExercises(username);

        assertEquals(newUserExercisesSet, result);
    }

    @Test
    void test_getUserExercises_whenSetNotEmpty(){
        String username = "username";
        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        Set<Exercise> newUserExercisesSet = new HashSet<>();
        Exercise newExercise = new Exercise("1","description", 0,0,15.0);
        newUserExercisesSet.add(newExercise);

        newGymUser.setExercises(newUserExercisesSet);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        Set<Exercise> result = userService.getUserExercises(username);

        assertEquals(newUserExercisesSet, result);
    }

    @Test
    void test_getUserWeightList(){
        String username = "username";
        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        Set<UserWeight> newWeightMap = new HashSet<>();
        newGymUser.setUserWeight(newWeightMap);
        userRepository.save(newGymUser);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        Set<UserWeight> newList = new HashSet<>();

      Set<UserWeight> result = userService.getUserWeight(username);

        assertEquals(newList, result);
    }

    @Test
    void test_getWeekId(){
        Calendar newCalendar = new GregorianCalendar();
        newCalendar.setTime(new Date());
        int weekNumber = newCalendar.get(Calendar.WEEK_OF_YEAR);

        String newDate = LocalDate.now().getYear() + "_" + weekNumber;

        String result = (new IDGenerator()).getWeekID();

        assertEquals(newDate, result);
    }

    @Test
    void test_getUserPlans_whenWeekplansListNotEmpty(){
        String username = "username";
        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        Set<Day> weekPlans = new HashSet<>();
        Week week = new Week("1", weekPlans);
        List<Week> weekList = new ArrayList<>();
        weekList.add(week);
        newGymUser.setWeekPlansList(weekList);

        userRepository.save(newGymUser);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        List<Week> result = userService.getUserPlans(username);

        assertEquals(weekList, result);
    }

    @Test
    void test_getUserPlans_whenWeekplansListEmpty(){
        String username = "username";
        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);
        List<Week> weekList = new ArrayList<>();
        newGymUser.setWeekPlansList(weekList);

        userRepository.save(newGymUser);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        List<Week> result = userService.getUserPlans(username);

        assertEquals(weekList, result);
    }

    @Test
    void test_getUserData(){
        String username = "username";
        GymUser newGymUser = new GymUser();
        newGymUser.setUsername(username);

        userRepository.save(newGymUser);

        when(userRepository.findByUsername("username")).thenReturn(newGymUser);

        GymUserPersonalData result = userService.getUserData(username);

        assertEquals(newGymUser.getUsername(), result.username());
    }


}