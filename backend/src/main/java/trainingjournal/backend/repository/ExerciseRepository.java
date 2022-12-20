package trainingjournal.backend.repository;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trainingjournal.backend.model.Exercise;
@Document("Exercises")
@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
}
