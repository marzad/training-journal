package trainingjournal.backend.model;

import java.util.List;

public record Day(
        Weekday weekday,
        List<Exercise> exercises,
        String notes,
        boolean trainingfree
) {
}
