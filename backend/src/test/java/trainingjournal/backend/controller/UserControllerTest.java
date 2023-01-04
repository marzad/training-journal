package trainingjournal.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import trainingjournal.backend.model.GymUser;
import trainingjournal.backend.repository.ExerciseRepository;
import trainingjournal.backend.repository.PlanRepository;
import trainingjournal.backend.repository.UserRepository;



@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("StandardUser")
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;
    @Autowired
    PlanRepository planRepository;
    @Autowired
    ExerciseRepository exerciseRepository;
    @DirtiesContext
    @WithMockUser(username="StandardUser")
    @Test
    void test_helloMe() throws Exception {
        mockMvc.perform(get("/api/user/me"))
                .andExpect(content().string("StandardUser"));
    }
    @DirtiesContext
    @WithMockUser(username="StandardUser")
    @Test
    void test_addUserExercisesList() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        userRepository.save(user);

        mockMvc.perform(post("/api/user/StandardUser/exercises/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                [{
                                "id" : "",
                                "description" : "",
                                "repeats" : 0,
                                "sets" : 0,
                                "weight" : 0.0
                }]
                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                         "description" : "",
                         "repeats" : 0,
                         "sets" : 0,
                         "weight" : 0
                        }]
                        """));
    }
}