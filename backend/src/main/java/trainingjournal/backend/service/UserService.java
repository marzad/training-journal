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

    public GymUser addPersonalData(String username, Gender gender, String birthday, Double userWeight, Double bodysize) {
        GymUser user = userRepository.findByUsername(username);
        user.setGender(gender);
        user.setBirthday(LocalDate.parse(birthday));
        user.setUserWeight(setUserWeightItem(userWeight));
        user.setBodysize(bodysize);
        return user;
    }

    public Map<LocalDate, Double> setUserWeightItem(Double userWeight) {
        Map<LocalDate, Double> userWeightItem = new HashMap<>();
        userWeightItem.put(LocalDate.now(), userWeight);
        return userWeightItem;
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
        Map<LocalDate, Double> userWeightMap = new HashMap<>(Map.of(LocalDate.now(), signupData.userWeight()));
        newGymUser.setUserWeight(userWeightMap);
        newGymUser.setBodysize(signupData.bodysize());
        newGymUser.setCalendar(new HashSet<>());
        newGymUser.setExercises(new HashSet<>());
        newGymUser.setRegisterData(LocalDate.now());

        String userPassword = (new Argon2PasswordEncoder()).encode(signupData.password());
        newGymUser.setPassword(userPassword);

        userRepository.save(newGymUser);

        return newGymUser;
    }
}
