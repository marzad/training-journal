package trainingjournal.backend.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import trainingjournal.backend.model.*;
import trainingjournal.backend.service.UserService;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public String helloMe(Principal principal) {
        if (principal != null) {
            return principal.getName();
        }
        return "anonymous";
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
    @PostMapping("/logout")
    public String logout(HttpSession httpSession){
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "anonymous";
    }

    @GetMapping("/{username}/exercises")
    public Set<Exercise> getUserExerciseList(@PathVariable String username){
        return userService.getUserExercises(username);
    }

    @GetMapping("{username}/weight")
    public Set<UserWeight> getUserWeightMap(@PathVariable String username){
        return userService.getUserWeight(username);
    }

    @GetMapping("{username}/plans")
    public List<Week> getUserPlans(@PathVariable String username){
        return userService.getUserPlans(username);
    }

    @PostMapping("{username}/exercises/")
    public Set<Exercise> addUserExercisesList(@PathVariable String username, @RequestBody List<ExerciseDTO> exercisesList) {

        return userService.addUserExercisesList(username, exercisesList);
    }

    @PostMapping("/")
    public GymUser addNewGymUser(@RequestBody GymUserSignup signupData){

        return userService.addNewGymUser(signupData);
    }

    @PutMapping("{username}/updateusername/")
    public GymUser updateUsername(@PathVariable String username,
                                          @RequestBody String newUsername

    ) {
        return userService.updateUsername(username,newUsername);
    }

    @PutMapping("{username}/updateweight/")
    public Set<UserWeight> updateWeight(@PathVariable String username,
                                          @RequestBody String userWeight
    ) {
        return userService.updateWeight(username, Double.valueOf(userWeight));
    }

    @PostMapping("{username}/dailyplan")
    public Week setDailyPlan(@PathVariable String username, @RequestBody Day dailyPlan){
        return userService.setDailyPlan(username, dailyPlan);
    }

}
