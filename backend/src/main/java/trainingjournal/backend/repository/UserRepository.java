package trainingjournal.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trainingjournal.backend.model.JimUser;

@Repository
public interface UserRepository extends MongoRepository<JimUser, String> {
    JimUser findByUsername(String name);
}
