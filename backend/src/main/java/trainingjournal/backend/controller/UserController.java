package trainingjournal.backend.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import trainingjournal.backend.model.*;
import trainingjournal.backend.service.UserService;

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
    public GymUser updateWeight(@PathVariable String username,
                                          @RequestBody String userWeight
    ) {
        return userService.updateWeight(username, Double.valueOf(userWeight));
    }

}
