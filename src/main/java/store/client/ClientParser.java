package store.client;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public final class ClientParser {

    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    public static Client to(ClientIn in) {
        try {
            return Client.builder()
            .name(in.name())
            .date(sdf.parse(in.date()))
            .cpf(in.cpf())
            .email(in.email())
            .senha(in.senha())
            .build();
        }
        catch(ParseException e) {
            throw new RuntimeException("Incorrect date format : YYYYMMDD", e);

        }
    }
    public static ClientOut to(Client o) {
        return new ClientOut(
            o.id(),
            o.name(),
            o.cpf(),
            o.email(),
            sdf.format(o.date())
        );
    }
    
}
