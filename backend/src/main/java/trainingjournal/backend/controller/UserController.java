package trainingjournal.backend.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import trainingjournal.backend.model.Exercise;
import trainingjournal.backend.service.UserService;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
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

    @PutMapping("/exercises")
    public Set<Exercise> updateUserExercisesList(@RequestBody String username, @PathVariable String exerciseName){
        return userService.updateUserExercisesList(username, exerciseName);
    }

    @PostMapping("/exercises/")
    public Set<Exercise> addUserExercisesList(@RequestBody Map<String, List<Exercise>> requestBody){
        String username = requestBody.keySet().iterator().next();
        List<Exercise> exerciseList = requestBody.get(username);

        return userService.addUserExercisesList(username, exerciseList);
    }
}
