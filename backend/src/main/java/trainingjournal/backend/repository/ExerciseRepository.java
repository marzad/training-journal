package trainingjournal.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trainingjournal.backend.model.Exercise;

@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
}
