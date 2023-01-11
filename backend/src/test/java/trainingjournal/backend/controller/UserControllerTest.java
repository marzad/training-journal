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
import trainingjournal.backend.repository.UserRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("StandardUser")
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_helloMe() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(content().string("StandardUser"));
    }

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_addUserExercisesList() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        userRepository.save(user);

        mockMvc.perform(post("/api/users/StandardUser/exercises/")
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

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_updateUsername() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        Map<LocalDate, Double> userWeightMap = new HashMap<>();
        userWeightMap.put(LocalDate.parse("2021-12-12"), 96.7);
        user.setUserWeight(userWeightMap);
        userRepository.save(user);

        mockMvc.perform(put("/api/users/StandardUser/updateusername/")
                        .content("newUsername")
                        .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username" : "newUsername"
                        }
                        """));
    }

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_updateWeight() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        Map<LocalDate, Double> userWeightMap = new HashMap<>();
        userWeightMap.put(LocalDate.parse("2021-12-12"), 96.7);
        user.setUserWeight(userWeightMap);
        userRepository.save(user);


        mockMvc.perform(put("/api/users/StandardUser/updateweight/")
                        .content("90.0")
                        .with(csrf())
                )
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    void test_addNewGymUser() throws Exception {

        mockMvc.perform(post("/api/users/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username" : "username",
                                "gender" : "MALE",
                                "birthday" : "1996-12-12",
                                "userWeight" : "96.0",
                                "bodysize" : "176.0",
                                "password" : "password"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username" : "username",
                        "gender" : "MALE"
                        }
                        """));
    }

}