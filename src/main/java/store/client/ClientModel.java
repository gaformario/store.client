package store.client;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "client")
@NoArgsConstructor
@Getter
@Setter
public class ClientModel {
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "birthdate")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "email")
    private String email;

    @Column(name = "hashsenha")
    private String hashSenha;

    public ClientModel(Client o) {
        this.id = o.id();
        this.name = o.name();
        this.cpf = o.cpf();
        this.email = o.email();
        this.date = o.date();
        this.hashSenha = o.hashSenha();
    }

    public Client to() {
        return Client.builder()
            .id(this.id)
            .name(this.name)
            .cpf(this.cpf)
            .email(this.email)
            .date(this.date)
            .hashSenha(this.hashSenha)
            .build();
            
    }
    
}
