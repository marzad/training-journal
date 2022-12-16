package trainingjournal.backend.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import trainingjournal.backend.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/api/user/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping()
    public String helloMe(Principal principal){
        if(principal != null){
            return principal.getName();
        }
        return "StandardUser";
    }

    @PostMapping()
    public String login(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }



}
