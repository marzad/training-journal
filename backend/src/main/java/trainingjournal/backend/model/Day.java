package trainingjournal.backend.model;

import java.util.Set;

public record Day(
        Weekday weekday,
        Set<Exercise> exercises,
        String notes,
        boolean trainingfree
) {
}
