$(function() {

    const API = 'http://localhost:3000';

    $('#client_create').click(function() {
        var name = $('#cliente_name').val();
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
            dateType: 'json',
            date: JSON.stringify({
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

})