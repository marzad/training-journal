package trainingjournal.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import trainingjournal.backend.repository.ExerciseRepository;
import trainingjournal.backend.repository.PlanRepository;
import trainingjournal.backend.service.PlanService;
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


}