package trainingjournal.backend.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import trainingjournal.backend.model.Exercise;
import trainingjournal.backend.model.ExerciseDTO;
import trainingjournal.backend.model.Gender;
import trainingjournal.backend.model.GymUser;
import trainingjournal.backend.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/me")
    public String helloMe(Principal principal){
        if(principal != null){
            return principal.getName();
        }
        return "anonymous";
    }

    @PostMapping("/login")
    public String login(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("{username}/exercises/")
    public Set<Exercise> addUserExercisesList(@PathVariable String username, @RequestBody List<ExerciseDTO> exercisesList){

        return userService.addUserExercisesList(username, exercisesList);
    }

    @PutMapping("{username}/personaldata/")
    public GymUser addUserPersonalData(@PathVariable String username,
                                       @RequestParam(value = "gender", required = false) Gender gender,
                                       @RequestParam(value = "birthday", required = false) String birthday,
                                       @RequestParam(value = "userWeight", required = false) Double userWeight,
                                       @RequestParam(value = "bodysize", required = false) Double bodysize
                                       ){
        return userService.addPersonalData(username, gender, birthday, userWeight, bodysize);
    }

}
