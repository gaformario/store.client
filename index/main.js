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

    function displayClients(clients) {
        const clientDataElement = $('#client_data');
        clientDataElement.empty();
    
        for (let i = 0; i < clients.length; i++) {
            const client = clients[i];
            
            const clientCard = $('<div class="row mx-2 my-2 card col-md-4 shadow"></div>');

            const cardBody = $('<div class="card-body"></div>');
            cardBody.append(`<h5 class="card-title">Nome: ${client.name}</h5>`);
            cardBody.append(`<p class="card-text">CPF: ${client.cpf}</p>`);
            cardBody.append(`<p class="card-text">Email: ${client.email}</p>`);
            cardBody.append(`<p class="card-text">Data: ${client.date}</p>`);
                       
            clientCard.append(cardBody);
    
            clientDataElement.append(clientCard);
            clientDataElement.append('<br>');
        }
    }
    
});