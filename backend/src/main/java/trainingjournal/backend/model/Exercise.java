package trainingjournal.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Exercises")
public record Exercise(
        @Id
        String exerciseId,
        String description,
        int repeats,
        int sets,
        float weight
) {
}
