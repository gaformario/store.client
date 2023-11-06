$(function() {

    const API = 'http://localhost:8080';

    $('#client_create').click(function() {
        var name = $('#cliente_nome').val();
        var cpf = $('#cpf').val();
        var email = $('#email').val();
        var senha = $('#senha').val();
        var date = $('#data').val();
        
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: `${API}/client`,
            dataType: 'json',
            data: JSON.stringify({
                'name': name,
                'cpf': cpf,
                'email': email,
                'senha': senha,
                'date': date,
            }),
            success: function(response) {
                console.log(response)
            }, error(xhr, status, error) {
                console.log(xhr);
            }
        })
    });

    $('#client_list').click(function() {
        listClients();
    });

    function listClients() {
        $.ajax({
            type: 'GET',
            url: `${API}/client`,
            dataType: 'json',
            success: function(clients) {
                console.log('Lista de clientes:', clients);
                displayClients(clients);
            },
            error: function(xhr, status, error) {
                console.log(xhr);
            }
        });
    }

    function deleteClient(id) {
        console.log(id);
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

            const button = $(`<button>Delete</button>`);
            button.on('click', function () {
                deleteClient(client.id);
            });

            cardBody.append(button);
    
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