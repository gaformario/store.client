package store.client;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository ClientRepository;

    public List<Client> list() {
        return StreamSupport.stream(ClientRepository.findAll().spliterator(), false)
            .collect(Collectors.toList())
            .stream().map(ClientModel::to).toList();

    }

    public Client find(String cpf) {
        return ClientRepository.findById(cpf).orElse(null).to();
    }

    public void delete(String cpf) {
        ClientRepository.deleteById(cpf);
    }

    public Client create(Client in) {
        if (in.senha() == null)
            throw new RuntimeException("Password is Mandatory");
        in.senha(in.senha().trim());
        
        if (in.senha().length() < 5)
            throw new RuntimeException("Password is shorter than 5 characters");
        
            String hash;

        try {
            hash = calculateHash(in.senha());
            in.hashSenha(hash);
            in.senha(null);
            return ClientRepository.save(new ClientModel(in)).to();
        } 

        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private String calculateHash(String text) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(text.getBytes(StandardCharsets.UTF_8));
        byte[] encoded = Base64.getEncoder().encode(hash);
        return new String(encoded);
    }


}
