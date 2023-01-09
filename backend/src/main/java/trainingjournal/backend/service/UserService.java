package trainingjournal.backend.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import trainingjournal.backend.model.*;
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

    public boolean addNewGymUser(String username,
                                 Gender gender,
                                 String birthday,
                                 Double userWeight,
                                 Double bodysize,
                                 String password){

        Optional<GymUser> opUser = Optional.ofNullable(userRepository.findByUsername(username));
        try{
            if(opUser.isEmpty()){
                GymUser newGymUser = new GymUser();
                String userId = (new IDGenerator()).getID();
                newGymUser.setId(userId);
                newGymUser.setUsername(username);
                newGymUser.setGender(gender);
                newGymUser.setBirthday(LocalDate.parse(birthday));
                newGymUser.setPassword(password);
                Map<LocalDate, Double> userWeightMap = new HashMap<>(Map.of(LocalDate.now(), userWeight));
                newGymUser.setUserWeight(userWeightMap);
                newGymUser.setBodysize(bodysize);
                newGymUser.setCalendar(new HashSet<>());
                newGymUser.setExercises(new HashSet<>());
                newGymUser.setRegisterData(LocalDate.now());

                String userPassword = (new Argon2PasswordEncoder()).encode(password);
                newGymUser.setPassword(userPassword);

                userRepository.save(newGymUser);

                return true;
            }
        }catch (Exception exception){
            exception.getMessage();
        }
        return false;
    }


    public Set<Exercise> addUserExercisesList(String userName, List<ExerciseDTO> exerciseList){
        GymUser user = userRepository.findByUsername(userName);

        Set<Exercise> newUserExercisesList = new HashSet<>();

        Iterator<ExerciseDTO> itExercises = exerciseList.iterator();

        while(itExercises.hasNext()){
            ExerciseDTO exercise = itExercises.next();
            Exercise newExercise = new Exercise(exercise.id(), exercise.description(), 0,0,0);
            newUserExercisesList.add(newExercise);
        }

        user.setExercises(newUserExercisesList);
        userRepository.save(user);
        return newUserExercisesList;
    }

    public GymUser addPersonalData(String username, Gender gender, String birthday, Double userWeight, Double bodysize){
        GymUser user = userRepository.findByUsername(username);
        user.setGender(gender);
        user.setBirthday(LocalDate.parse(birthday));
        user.setUserWeight(setUserWeightItem(userWeight));
        user.setBodysize(bodysize);
        return user;
    }

    public Map<LocalDate, Double> setUserWeightItem(Double userWeight){
        Map<LocalDate, Double> userWeightItem = new HashMap<>();
        userWeightItem.put(LocalDate.now(), userWeight);
        return userWeightItem;
    }
}
