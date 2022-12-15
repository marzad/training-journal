package trainingjournal.backend.model;

import java.time.LocalDate;
import java.util.Set;

public record Day(
        LocalDate data,
        Set<Exercise> exerciseSet,
        String notes
) {
}
