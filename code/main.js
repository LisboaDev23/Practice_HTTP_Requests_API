//document.addEventListener('DOMContentLoaded',function(){
//    const endereco = document.getElementById('endereco').value;

//    document.getElementById('btn-buscar-cep').addEventListener("click", function(){
//        const xhttp = new XMLHttpRequest(); //nova requisição HTTP através do xml
//        const cep = document.getElementById('cep').value;//valor do input cep
//        const endpoint = `https://viacep.com.br/ws/${cep}/json`; //endereço da requisição com o valor do input na chamada
//
//        xhttp.open("GET", endpoint);//abra a requisição com o verbo GET, nesse endereço.
//        xhttp.send();
//    })
//})

//realizando a requisição via
$(document).ready(function(){
    $('#cep').mask("00000-000");

    $("#btn-buscar-cep").click(function(){
        const cep = $("#cep").val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        $(this).find('i').addClass('d-none');//o this se refere ao elemento em que estamos trabalhando quando a ação for executada
        $(this).find('span').removeClass('d-none');//nesse caso o #btn-buscar-cep

        // $.ajax(endpoint).done(function(respostaRequisicao){//método ajax para abrirmos a requisição passando qual endereço iremos fazer a requisição
        //     //.done - feito isso, nesse método iremos tratar a resposta da requisição e manipular da forma que queremos esses dados da resposta
        //     const logradouro = respostaRequisicao.logradouro; //pegue dessa resposta, o logradouro ... e assim por diante
        //     const bairro = respostaRequisicao.bairro;
        //     const cidade = respostaRequisicao.localidade;
        //     const estado = respostaRequisicao.uf;
        //     const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`; //variável que iremos inserir automáticamente no campo input
        //     $("#endereco").val(endereco);
        //     setTimeout(function(){//definindo que essa ação de remover e adicionar as classes nos lugares corretos, ocorrerá dps de 500 ms para dar a sensação do loading
        //         $("#btn-buscar-cep").find('i').removeClass('d-none');
        //         $("#btn-buscar-cep").find('span').addClass('d-none');
        //     },500);
        // })

        fetch(endpoint).then(function(respostaRequisicao){//o fetch recebe um endereço para  requisição, usando o then, ele recebe um callback onde no parâmetro dele passamos a resposta da requisição para manipular
            return respostaRequisicao.json() //transforme a resposta da requisição em formato json
        })
        .then(function(json){
            const logradouro = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;
            const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
            $('#endereco').val(endereco);
        })
        .catch(function(){
            alert("Ocorreu um erro ao buscar o endereço, tente novamente mais tarde.")
        })
        .finally(function(){
            setTimeout(function(){//definindo que essa ação de remover e adicionar as classes nos lugares corretos, ocorrerá dps de 500 ms para dar a sensação do loading
                $("#btn-buscar-cep").find('i').removeClass('d-none');
                $("#btn-buscar-cep").find('span').addClass('d-none');
            },500);
        })
    })

    $("#formulario-pedido").submit(function(evento){
        evento.preventDefault();
        if($('#nome').val().length == 0){
            throw new Error("Digite o nome");
        }
    })
})