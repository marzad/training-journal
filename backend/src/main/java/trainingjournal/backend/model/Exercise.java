package trainingjournal.backend.model;

import org.springframework.data.annotation.Id;

public record Exercise(
        @Id
        String id,
        String description,
        int repeats,
        int sets,
        float weight
) {

}
