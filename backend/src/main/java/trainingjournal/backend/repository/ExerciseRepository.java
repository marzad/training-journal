package trainingjournal.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trainingjournal.backend.model.ExerciseDTO;

import java.util.Optional;
@Repository
public interface ExerciseRepository extends MongoRepository<ExerciseDTO, String> {
    Optional<ExerciseDTO> findByDescription(String exerciseName);
}
