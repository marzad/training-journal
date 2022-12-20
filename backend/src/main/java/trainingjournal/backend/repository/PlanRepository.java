package trainingjournal.backend.repository;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trainingjournal.backend.model.Week;
@Document("Plans")
@Repository
public interface PlanRepository extends MongoRepository<Week, String> {
}
