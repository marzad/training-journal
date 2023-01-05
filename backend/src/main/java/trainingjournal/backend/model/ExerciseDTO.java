package trainingjournal.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Exercises")
public record ExerciseDTO(
        @Id
        String id,
        String description
) {

}
