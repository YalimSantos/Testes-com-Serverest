export default class ValidaServerest {

    // Validação das ações que podemos realizar na API
    // validar a busca de usuários
    // validar o cadastro de novos usuários
    // Validar o login

    static ValidarBuscaDeUsuarios( res ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
    }

    // login //

    static ValidaLogin( res ){
        expect( res.body.message ).to.be.eq( 'Login realizado com sucesso' )
    }

    // produtos //

    static validaBuscaDeProdutos( res ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
    }

    static validaCadastroDeProduto( res ){
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
    }

    // carrinhos // 

    static validaBuscaDeCarrinhos( res ){
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
    }

    static validaCadastroDeCarrinho( res ){
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
    }

    static validaConclusaoDeCompra( res ){
        expect( res.body.message ).to.be.eq( 'Registro excluído com sucesso' )
    }

}