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

import org.springframework.util.LinkedMultiValueMap;
import trainingjournal.backend.model.Gender;
import trainingjournal.backend.model.GymUser;
import trainingjournal.backend.repository.UserRepository;


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
    void test_addUserPersonalData() throws Exception {
        GymUser user = new GymUser();
        user.setUsername("StandardUser");
        userRepository.save(user);

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("gender", Gender.MALE.toString());
        params.add("birthday", "1999-12-12");
        params.add("userWeight", Double.toString(96.7));
        params.add("bodysize", Double.toString(176.0));

        mockMvc.perform(put("/api/users/StandardUser/personaldata/")
                        .params(params)
                        .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username" : "StandardUser",
                        "gender" : "MALE",
                        "birthday" : "1999-12-12",
                        "bodysize" : 176.0
                        }
                        """));
    }

    @DirtiesContext
    @Test
    void test_addNewGymUser() throws Exception {

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("username","username");
        params.add("gender", Gender.MALE.toString());
        params.add("birthday", "1999-12-12");
        params.add("userWeight", Double.toString(96.7));
        params.add("bodysize", Double.toString(176.0));
        params.add("password", "password");

        mockMvc.perform(post("/api/users/newuser")
                .params(params).with(csrf()))
                .andExpect(content().string("true"));
//                .andExpect(status().isOk());
    }

}