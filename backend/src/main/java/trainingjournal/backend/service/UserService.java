package trainingjournal.backend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import trainingjournal.backend.exception.UsernameAlreadyExistException;
import trainingjournal.backend.model.*;
import trainingjournal.backend.repository.UserRepository;

import java.time.LocalDate;
import java.util.*;
import java.util.function.Predicate;


@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepo) {
        this.userRepository = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        GymUser user = userRepository.findByUsername(username);
        return new User(user.getUsername(), user.getPassword(), List.of());
    }


    public Set<Exercise> addUserExercisesList(String userName, List<ExerciseDTO> exerciseList) {
        GymUser user = userRepository.findByUsername(userName);

        Set<Exercise> newUserExercisesList = new HashSet<>();

        for (ExerciseDTO exercise : exerciseList) {
            Exercise newExercise = new Exercise(exercise.id(), exercise.description(), 0, 0, 0);
            newUserExercisesList.add(newExercise);
        }

        user.setExercises(newUserExercisesList);
        userRepository.save(user);
        return newUserExercisesList;
    }

    public GymUser updateUsername(String username, String newUsername) {
        GymUser user = userRepository.findByUsername(username);

        if (userRepository.existsByUsername(newUsername)) {
            throw new UsernameAlreadyExistException();
        }

        if (!username.equals(newUsername) && !newUsername.equals("")) {
            user.setUsername(newUsername);
        }
        userRepository.save(user);

        return user;
    }

    public Set<UserWeight> updateWeight(String username, Double userWeight) {
        GymUser user = userRepository.findByUsername(username);

        Set<UserWeight> userWeightSet = user.getUserWeight();

        if (userWeight > 0.5) {
            userWeightSet.removeIf(userWeightNext -> userWeightNext.date().equals(LocalDate.now()));
            userWeightSet.add(new UserWeight(LocalDate.now(), userWeight));
        }

        userRepository.save(user);

        return userWeightSet;
    }


    public GymUser addNewGymUser(GymUserSignup signupData) {

        if (userRepository.existsByUsername(signupData.username())) {
            throw new UsernameAlreadyExistException();
        }

        GymUser newGymUser = new GymUser();
        String userId = (new IDGenerator()).getID();
        newGymUser.setId(userId);
        newGymUser.setUsername(signupData.username());
        newGymUser.setGender(signupData.gender());
        newGymUser.setBirthday(signupData.birthday());
        newGymUser.setPassword(signupData.password());
        Set<UserWeight> userWeightMap = new HashSet<>(Set.of(new UserWeight(LocalDate.now(), signupData.userWeight())));
        newGymUser.setUserWeight(userWeightMap);
        newGymUser.setUserHeight(signupData.userHeight());

        List<Week> newWeekplansList = new ArrayList<>();
        newGymUser.setWeekPlansList(newWeekplansList);
        newGymUser.setExercises(new HashSet<>());
        newGymUser.setRegisterData(LocalDate.now());

        String userPassword = (new Argon2PasswordEncoder()).encode(signupData.password());
        newGymUser.setPassword(userPassword);

        userRepository.save(newGymUser);

        return newGymUser;
    }

    public Week setDailyPlan(String username, Day dailyPlan) {
        GymUser user = userRepository.findByUsername(username);

        String weekID = (new IDGenerator()).getWeekID();
        List<Week> weekplanList = user.getWeekPlansList();
        Week week;


        int indexOfWeek = getIndexOfWeek(weekplanList, weekID);
        if(indexOfWeek != -1){
            week = updateWeek(weekplanList.get(indexOfWeek), dailyPlan);
            weekplanList.set(indexOfWeek, week);
        }else{
            Set<Day> newSetOfDays = new HashSet<>(Set.of(dailyPlan));
            week = new Week(weekID, newSetOfDays);
            weekplanList.add(week);
        }

        userRepository.save(user);
        return week;
    }

    private int getIndexOfWeek(List<Week> weekList, String weekId) {
        int i = 0;
        for (Week week : weekList) {
            if (week.weekId().equals(weekId)) {
                return i;
            }
            i++;
        }
        return -1;
    }

    private Week updateWeek(Week week, Day dailyPlan){
        Set<Day> weekPlans = week.dailyPlans();
        Predicate<Day> predicate = day -> (day.weekday().equals(dailyPlan.weekday()));
        weekPlans.removeIf(predicate);
        weekPlans.add(dailyPlan);
        return new Week(week.weekId(), weekPlans);
    }

    public Set<Exercise> getUserExercises(String username) {
        return userRepository.findByUsername(username).getExercises();
    }

    public Set<UserWeight> getUserWeight(String username) {
        GymUser user = userRepository.findByUsername(username);

        return user.getUserWeight();
    }

    public List<Week> getUserPlans(String username){
        GymUser user = userRepository.findByUsername(username);
        return user.getWeekPlansList();
    }

}
