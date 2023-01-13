package trainingjournal.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import trainingjournal.backend.model.ExerciseDTO;
import trainingjournal.backend.repository.ExerciseRepository;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class ExercisesControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ExerciseRepository exerciseRepository;

    @WithMockUser(username = "StandardUser")
    @Test
    void test_getAllExercises_whenDBEmpty() throws Exception {
        mockMvc.perform(get("/api/exercises"))
                .andExpect(content().json("""
                        [{"description":"pause"},
                        {"description":"warmup"},
                        {"description":"stratching"}]
                        """));
    }

    @WithMockUser(username = "StandardUser")
    @Test
    void test_getAllExercises_whenDBNotEmpty() throws Exception {
        ExerciseDTO exercise1 = new ExerciseDTO("1", "exercise1");
        ExerciseDTO exercise2 = new ExerciseDTO("2", "exercise2");

        exerciseRepository.save(exercise1);
        exerciseRepository.save(exercise2);

        mockMvc.perform(get("/api/exercises"))
                .andExpect(content().json("""
                        [
                        {"description":"pause"},
                        {"description":"warmup"},
                        {"description":"stratching"},
                        {"description" : "exercise1"},
                        {"description" : "exercise2"}
                        ]
                        """));
    }



    @DirtiesContext
    @WithMockUser(username = "StandardUser")
    @Test
    void test_addNewExerciseToDB() throws Exception {

        mockMvc.perform(post("/api/exercises/")
                        .content("newExercise")
                        .with(csrf())
                )

                .andExpect(content().json("""
                        {
                        "description" : "newExercise"
                        }
                        """));
    }


}