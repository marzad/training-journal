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

import trainingjournal.backend.model.Exercise;
import trainingjournal.backend.model.GymUser;
import trainingjournal.backend.model.UserWeight;
import trainingjournal.backend.model.Week;
import trainingjournal.backend.repository.UserRepository;

import java.time.LocalDate;
import java.util.*;


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
        Set<UserWeight> userWeightSet = new HashSet<>();
        userWeightSet.add(new UserWeight(LocalDate.parse("2021-12-12"), 96.7, 25.0));
        user.setUserWeight(userWeightSet);
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
    void test_updateWeight_whenNoItemExist() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        user.setUserHeight(170.0);
        Set<UserWeight> userWeightSet = new HashSet<>();
        userWeightSet.add(new UserWeight(LocalDate.parse("2021-12-12"), 96.7, 25.0));
        user.setUserWeight(userWeightSet);
        userRepository.save(user);


        mockMvc.perform(put("/api/users/StandardUser/updateweight/")
                        .content("90.0")
                        .with(csrf())
                )
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_updateWeight_whenItemExist() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        user.setUserHeight(170.0);
        Set<UserWeight> userWeightSet = new HashSet<>();
        userWeightSet.add(new UserWeight(LocalDate.now(), 96.7, 25.0));
        user.setUserWeight(userWeightSet);
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
                                "userHeight" : "176.0",
                                "password" : "password"
                                }
                                """)
                        .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username" : "username",
                        "gender" : "MALE"
                        }
                        """));
    }

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_setDailyPlan() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");

        List<Week> newWeekPlansList = new ArrayList<>();

        user.setWeekPlansList(newWeekPlansList);
        userRepository.save(user);

        mockMvc.perform(post("/api/users/StandardUser/dailyplan")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "weekday" : "MONDAY",
                                "exercises" : [],
                                "notes" :  "",
                                "trainingfree" : false}
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "dailyPlans" : [{"weekday" : "MONDAY", "exercises" : [], "notes" : "", "trainingfree" :  false}]
                        }
                        """));
    }

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_getUserExercisesList() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        Set<Exercise> newUserExercisesSet = new HashSet<>();
        Exercise newExercise = new Exercise("1", "description", 0, 0, 15.0);
        newUserExercisesSet.add(newExercise);

        user.setExercises(newUserExercisesSet);
        userRepository.save(user);

        mockMvc.perform(get("/api/users/StandardUser/exercises").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                        "description" : "description",
                        "repeats" : 0,
                        "sets" : 0,
                        "weight" : 15.0
                        }]
                        """));
    }

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_getUserWeightMap_whenMapEmpty() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        Set<UserWeight> userWeightSet = new HashSet<>();
        user.setUserWeight(userWeightSet);

        userRepository.save(user);

        mockMvc.perform(get("/api/users/StandardUser/weight").with(csrf()))
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_getUserWeightMap_whenMapNotEmpty() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        Set<UserWeight> userWeightSet = new HashSet<>();
        userWeightSet.add(new UserWeight(LocalDate.parse("2023-01-12"), 56.0, 25.0));
        user.setUserWeight(userWeightSet);

        userRepository.save(user);

        mockMvc.perform(get("/api/users/StandardUser/weight").with(csrf()))
                .andExpect(content().json("""
                        [{
                        "date":"2023-01-12",
                        "weight":56.0
                        }
                        ]
                        """));
    }

    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_getUserPlans() throws Exception{
        GymUser user = new GymUser();
        user.setUsername("StandardUser");

        List<Week> newWeekPlansList = new ArrayList<>();

        user.setWeekPlansList(newWeekPlansList);
        userRepository.save(user);

        mockMvc.perform(get("/api/users/StandardUser/plans"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

}