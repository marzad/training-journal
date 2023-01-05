package trainingjournal.backend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import trainingjournal.backend.model.Exercise;
import trainingjournal.backend.model.GymUser;
import trainingjournal.backend.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
}
