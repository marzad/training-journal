package trainingjournal.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IDGenerator {

    public String getID(){
        UUID id = UUID.randomUUID();
        return id.toString();
    }
}
