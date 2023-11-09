$(function() {

    function waitSwal() {
        Swal.fire({
            html: 'Por favor, aguarde...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
    }

    const API = 'http://localhost:8080';

    $('#client_create').click(function() {
        var name = $('#cliente_nome').val();
        var cpf = $('#cpf').val();
        var email = $('#email').val();
        var senha = $('#senha').val();
        var date = $('#data').val();
        
        waitSwal();
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: `${API}/client`,
//            dataType: 'json',
            data: JSON.stringify({
                "name": name,
                "cpf": cpf,
                "email": email,
                "senha": senha,
                "date": date,
            }),
            success: function(response) {
                console.log("espm")
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente cadastrado!',
                    text: `O cliente foi cadastrado com sucesso.`
                });
                
            }, error(xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao cadastrar o cliente',
                    text: `Ocorreu um erro ao cadastrar o cliente.`
                });
                console.log(xhr);
            }
        })
    });

    $('#client_list').click(function() {
        listClients();
    });

    function listClients() {
        waitSwal();

        $.ajax({
            type: 'GET',
            url: `${API}/client`,
            dataType: 'json',
            success: function(clients) {
                console.log('Lista de clientes:', clients);
                displayClients(clients);
                Swal.close();
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                Swal.close();
            }
        });
    }

    function deleteClient(id) {
        if (confirm("Tem certeza de que deseja excluir este cliente?")) {
            waitSwal();
            $.ajax({
                type: 'DELETE',
                url: `${API}/client/${id}`, 
                success: function(response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cliente excluído!',
                        text: `O cliente com ID ${id} foi excluído com sucesso.`
                    });
                    listClients();
                    Swal.close();
                },
                error: function(xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao excluir cliente',
                        text: `Ocorreu um erro ao excluir o cliente com ID ${id}.`
                    });
                    console.log(xhr);
                    Swal.close();
                }
            });
        }
    }

    function editClient(id) {
        // Recupera os dados do cliente com o ID fornecido
        $.ajax({
            type: 'GET',
            url: `${API}/client/${id}`,
            dataType: 'json',
            success: function(client) {
                // Preenche os campos do formulário com os dados do cliente
                $('#cliente_nome').val(client.name);
                $('#cpf').val(client.cpf);
                $('#email').val(client.email);
                $('#senha').val(client.senha);
                $('#data').val(client.date);
    
                // Cria um modal para exibir o formulário de edição
                const modal = $(`
                    <div class="modal fade" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Editar cliente</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="cliente_nome">Nome:</label>
                                            <input type="text" class="form-control" id="cliente_nome" placeholder="Nome">
                                        </div>
                                        <div class="form-group">
                                            <label for="cpf">CPF:</label>
                                            <input type="text" class="form-control" id="cpf" placeholder="CPF">
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email:</label>
                                            <input type="email" class="form-control" id="email" placeholder="Email">
                                        </div>
                                        <div class="form-group">
                                            <label for="senha">Senha:</label>
                                            <input type="password" class="form-control" id="senha" placeholder="Senha">
                                        </div>
                                        <div class="form-group">
                                            <label for="data">Data de nascimento:</label>
                                            <input type="date" class="form-control" id="data">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary">Salvar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
    
                modal.find('#cliente_nome').val(client.name);
                modal.find('#cpf').val(client.cpf);
                modal.find('#email').val(client.email);
                modal.find('#senha').val(client.senha);
                modal.find('#data').val(client.date);
    
                modal.find('.btn-primary').on('click', function() {
                    waitSwal();
                   
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        type: 'PUT',
                        url: `${API}/client/${id}`,
                        dataType: 'json',
                        data: JSON.stringify({
                            "name": modal.find('#cliente_nome').val(),
                            "date": modal.find('#data').val(),
                            "cpf": modal.find('#cpf').val(),
                            "email": modal.find('#email').val(),
                            "senha": modal.find('#senha').val(),
                        }),
                        success: function(response) {
                            //Swal.fire({
                              //  icon: 'success',
                                //title: 'Cliente atualizado!',
                                //text: `O cliente com ID ${id} foi atualizado com sucesso.`
                            //});
                            listClients();
                            modal.modal('hide'); // Feche o modal após a conclusão da requisição
                            window.location.reload();
                        },
                        error: function(xhr, status, error) {
                            //Swal.fire({
                              //  icon: 'error',
                                //title: 'Erro ao atualizar cliente',
                                //text: `Ocorreu um erro ao atualizar o cliente com ID ${id}.`
                            //});
                            console.log(xhr);
                            modal.modal('hide'); // Feche o modal após a conclusão da requisição
                            window.location.reload();
                        }
                    });
                });
    
                modal.modal('show');
            },
            error: function(xhr, status, error) {
                console.log(xhr);
            }
        });
    }
    
    

    function displayClients(clients) {
        const clientDataElement = $('#client_data');
        clientDataElement.empty();
    
        let divrow = $('<div class="row"></div>');
    
        for (let i = 0; i < clients.length; i++) {
            const client = clients[i];
    
            const clientCol = $('<div class="col-md-3 p-3"></div>');
    
            const clientCard = $('<div class="card shadow"></div>');
    
            const cardBody = $('<div class="card-body"></div>');
            cardBody.append(`<p class="card-title">Nome: ${client.name}</p>`);
            cardBody.append(`<p class="card-text">CPF: ${client.cpf}</p>`);
            cardBody.append(`<p class="card-text">Email: ${client.email}</p>`);
            cardBody.append(`<p class="card-text">Data: ${client.date}</p>`);

            const editButton = $(`<button type="button" class="btn btn-warning" style="margin-right: 0.5rem;">Editar</button>`);
            const deleteButton = $(`<button type="button" class="btn btn-danger">Excluir</button>`);
           

            deleteButton.on('click', function () {
                deleteClient(client.id);
            });

            editButton.on('click', function () {
                editClient(client.id);
            });
            

            cardBody.append(editButton);
            cardBody.append(deleteButton);
    
            clientCard.append(cardBody);
            clientCol.append(clientCard);
            
    
            divrow.append(clientCol);
    
            if (i % 4 === 3 || i === clients.length - 1) {
                clientDataElement.append(divrow);
                divrow = $('<div class="row"></div>');
            }
        }
    }
    
    
    
});