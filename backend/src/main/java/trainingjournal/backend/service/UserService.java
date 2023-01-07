package trainingjournal.backend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import trainingjournal.backend.model.Exercise;
import trainingjournal.backend.model.Gender;
import trainingjournal.backend.model.GymUser;
import trainingjournal.backend.repository.UserRepository;

import java.time.LocalDate;
import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepo){
        this.userRepository = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        GymUser user = userRepository.findByUsername(username);
        return new User(user.getUsername(), user.getPassword(), List.of());
    }


    public Set<Exercise> addUserExercisesList(String userName, List<Exercise> exerciseList){
        GymUser user = userRepository.findByUsername(userName);
        Set<Exercise> newUserExercisesList = new HashSet<>(exerciseList);
        user.setExercises(newUserExercisesList);
        userRepository.save(user);
        return newUserExercisesList;
    }

    public GymUser addPersonalData(String username, Gender gender, String birthday, Double userWeight){
        GymUser user = userRepository.findByUsername(username);
        user.setGender(gender);
        user.setBirthday(LocalDate.parse(birthday));
        user.setUserWeight(setUserWeightItem(userWeight));
        return user;
    }

    public Map<LocalDate, Double> setUserWeightItem(Double userWeight){
        Map<LocalDate, Double> userWeightItem = new HashMap<>();
        userWeightItem.put(LocalDate.now(), userWeight);
        return userWeightItem;
    }
}
