package store.client;

import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<ClientModel, String> {
    
}
