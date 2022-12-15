package trainingjournal.backend.model;

import java.util.Set;

public record Week(
        String weekId,
        Set<Day> weekPlan
) {
}
