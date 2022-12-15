package trainingjournal.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Set;

@Document("GymUser")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GymUser {
        @Id
        private String id;
        private String username;
        private Gender gender;
        private LocalDate birthday;
        private double userWeight;
        private Set<Week> calendar;
        private LocalDate registerData;
        private String password;



}
