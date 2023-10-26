package store.client;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "client")
@NoArgsConstructor
public class ClientModel {
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "name")
    private String name;

    @Column
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "email")
    private String email;

    @Column(name = "hashSenha")
    private String hashSenha;

    public ClientModel(Client o) {
        this.id = o.id();
        this.name = o.name();
        this.cpf = o.cpf();
        this.email = o.email();
        this.hashSenha = o.hashSenha();
    }

    public Client to() {
        return Client.builder()
            .id(this.id)
            .name(this.name)
            .cpf(this.cpf)
            .email(this.email)
            .hashSenha(this.hashSenha)
            .build();
            
    }
    
}
