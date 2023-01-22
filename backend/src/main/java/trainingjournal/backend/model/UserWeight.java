package trainingjournal.backend.model;

import java.time.LocalDate;

public record UserWeight(
        LocalDate date,
        Double weight,
        Double bmi
) {
}
