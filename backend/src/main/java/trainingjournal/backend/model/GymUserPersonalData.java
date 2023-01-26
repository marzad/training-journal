package trainingjournal.backend.model;

import java.time.LocalDate;

public record GymUserPersonalData(
        String username,
        Gender gender,
        LocalDate birthday,
        Double userHeight,
        LocalDate registerData
) {

}
