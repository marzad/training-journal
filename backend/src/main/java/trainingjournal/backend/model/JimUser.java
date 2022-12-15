package trainingjournal.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Set;

@Document("JimUser")
public record JimUser(
        @Id
        String id,
        String username,
        Gender gender,
        LocalDate birthday,
        float userWeight,
        Set<Week> calendar,
        LocalDate registerData,
        String password
) {
}
