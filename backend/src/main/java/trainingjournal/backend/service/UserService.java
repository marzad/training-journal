package trainingjournal.backend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import trainingjournal.backend.model.Gender;
import trainingjournal.backend.model.GymUser;
import trainingjournal.backend.model.GymUserDTO;
import trainingjournal.backend.repository.ExerciseRepository;
import trainingjournal.backend.repository.PlanRepository;
import trainingjournal.backend.repository.UserRepository;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private IDGenerator idGenerator = new IDGenerator();

    private ExerciseRepository exerciseRepository;

    private PlanRepository planRepository;

    public UserService(UserRepository userRepo, PlanRepository planRepo, ExerciseRepository exerciseRepo){
        this.userRepository = userRepo;
        this.planRepository = planRepo;
        this.exerciseRepository = exerciseRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        GymUser user = userRepository.findByUsername(username);
        return new User(user.getUsername(), user.getPassword(), List.of());
    }

    public GymUser addUser(GymUserDTO newUser, Gender gender, LocalDate birthday, double weight){
        String id = idGenerator.getID();
        String password = new Argon2PasswordEncoder(16, 16, 1, 65536, 10)
                .encode(newUser.password());
        GymUser jimUser = new GymUser(id,
                newUser.username(),
                gender,
                birthday,
                weight,
                new HashSet<>(Set.of()),
                LocalDate.now(),
                password);
        userRepository.save(jimUser);
        return jimUser;
    }


    public GymUser updateUser(String username, String newUsername) {
        GymUser user = userRepository.findByUsername(username);
        user.setUsername(newUsername);
        userRepository.save(user);
        return user;
    }








}
