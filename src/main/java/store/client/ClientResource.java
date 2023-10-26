package store.client;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*")
@RestController
public class ClientResource {

    @Autowired
    private ClientService clientService;

    @GetMapping("/client")
    public List<ClientOut> list() {
        return clientService.list().stream().map(ClientParser::to).toList();
    }

    @GetMapping("/client/{id}")
    public ClientOut get(@PathVariable(required = true) String id) {
        Client found = clientService.find(id);
        return found == null ? null : ClientParser.to(found);
    }

    @DeleteMapping("/client/{id}")
    public void delete(@PathVariable(required = true) String id) {
        clientService.delete(id);
    }

    @PostMapping("/client")
    public ResponseEntity<Object> create(@RequestBody ClientIn in) {
        return ResponseEntity.created(
                    ServletUriComponentsBuilder
                        .fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(clientService.create(ClientParser.to(in)).id())
                        .toUri())
                    .build();
    }
}
