package trainingjournal.backend.model;

import java.time.LocalDate;


public record GymUserSignup(
        String username,
        Gender gender,
        LocalDate birthday,
        Double userWeight,
        Double bodysize,
        String password
) {


}
