package trainingjournal.backend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import trainingjournal.backend.model.Gender;
import trainingjournal.backend.model.JimUser;
import trainingjournal.backend.model.JimUserDTO;
import trainingjournal.backend.model.Week;
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
        JimUser user = userRepository.findByUsername(username);
        return new User(user.username(), user.password(), List.of());
    }

    public JimUser addUser(JimUserDTO newUser, Gender gender, LocalDate birthday, float weight){
        String id = idGenerator.getID();
        String password = new Argon2PasswordEncoder().encode(newUser.password());
        return new JimUser(id,
                newUser.username(),
                gender,
                birthday,
                weight,
                new HashSet<Week>(Set.of()),
                LocalDate.now(),
                password);
    }


}
