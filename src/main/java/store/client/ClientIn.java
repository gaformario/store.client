package store.client;

import java.util.Date;

public record ClientIn(

    String name,
    String cpf,
    String email,
    String senha,
    Date date,
    String hashSenha

){
}


