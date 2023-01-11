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

    public GymUser updateUsername(String username,String newUsername) {
        GymUser user = userRepository.findByUsername(username);

        if (userRepository.existsByUsername(newUsername)) {
            throw new UsernameAlreadyExistException();
        }

        if(!username.equals(newUsername) && !newUsername.equals("")){
            user.setUsername(newUsername);
        }
        userRepository.save(user);

        return user;
    }

    public GymUser updateWeight(String username,Double userWeight) {
        GymUser user = userRepository.findByUsername(username);

        Map<LocalDate, Double> userWeightMap = user.getUserWeight();

        if(userWeight > 0.5){
            userWeightMap.put(LocalDate.now(), userWeight);
        }

        userRepository.save(user);

        return user;
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
