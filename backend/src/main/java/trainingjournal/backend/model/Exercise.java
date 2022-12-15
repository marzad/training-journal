package trainingjournal.backend.model;

public record Exercise(
        String exerciseId,
        String description,
        int repeats,
        int sets,
        float weight
) {
}
