package trainingjournal.backend.model;

import java.util.Set;

public record Day(
        Weekday weekday,
        Set<Exercise> exerciseSet,
        String notes,
        boolean trainingfree
) {
}
