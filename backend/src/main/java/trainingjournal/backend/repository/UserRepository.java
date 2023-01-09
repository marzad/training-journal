package trainingjournal.backend.repository;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;
import trainingjournal.backend.model.GymUser;

@Document("GymUsers")
@Repository
public interface UserRepository extends MongoRepository<GymUser, String> {
    GymUser findByUsername(String name);
}
