package trainingjournal.backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.UUID;

@Service
public class IDGenerator {

    public String getID(){
        UUID id = UUID.randomUUID();
        return id.toString();
    }

    public String getWeekID(){
        Calendar newCalendar = new GregorianCalendar();
        newCalendar.setTime(new Date());
        int weekNumber = newCalendar.get(Calendar.WEEK_OF_YEAR);
        return LocalDate.now().getYear() + "_" + weekNumber;
    }
}
