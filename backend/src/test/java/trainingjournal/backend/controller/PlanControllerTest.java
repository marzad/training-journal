package trainingjournal.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import trainingjournal.backend.repository.ExerciseRepository;
import trainingjournal.backend.repository.PlanRepository;
import trainingjournal.backend.service.PlanService;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class PlanControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ExerciseRepository exerciseRepository;
    @Autowired
    PlanRepository planRepository;

    @WithMockUser(username="StandardUser")
    @Test
    void test_getAllExercises() throws Exception{
        mockMvc.perform(get("/api/exercises"))
                .andExpect(content().json("""
[]
"""));
    }

    @DirtiesContext
    @WithMockUser(username="StandardUser")
    @Test
    void test_addNewExercise() throws Exception{

        mockMvc.perform(post("/api/exercises/")
                        .content("newExercise")
                        .with(csrf())
                       )

                .andExpect(content().json("""
{
"description" : "newExercise",
"repeats" : 0,
"sets" : 0,
"weight" : 0
}
"""));
    }


}