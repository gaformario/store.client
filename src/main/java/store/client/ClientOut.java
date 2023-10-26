package store.client;

import java.util.Date;

public record ClientOut (
    
    String name,
    String cpf,
    String email,
    Date date

){

}
