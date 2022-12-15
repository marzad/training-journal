package trainingjournal.backend.model;

import java.time.LocalDate;
import java.util.Set;

public record JimUser(

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
