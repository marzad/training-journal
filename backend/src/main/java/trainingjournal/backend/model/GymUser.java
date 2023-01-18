package trainingjournal.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("GymUsers")
public class GymUser {
        @Id
        private String id;
        private String username;
        private Gender gender;
        private LocalDate birthday;
        private Set<UserWeight> userWeight;
        private Double userHeight;
        private List<Week> weekPlansList;
        private Set<Exercise> exercises;
        private LocalDate registerData;
        private String password;
}
