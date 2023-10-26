package store.client;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class ClientResource {

    @Autowired
    private ClientService clientservice;

    @GetMapping("/client")
    public List<ClientOut> list() {
        return clientService.list().stream().map(clientParser::to).toList();


    }


    
}
