package trainingjournal.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document("Plans")
public record Week(
        @Id
        String weekId,
        Set<Day> dailyPlans
) {

}
