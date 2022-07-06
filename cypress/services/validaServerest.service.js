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
        expect( res ).to.be.a( 'object' )
        expect( res.body ).to.haveOwnProperty( 'quantidade' )
        expect( res.body.quantidade ).to.be.a( 'number' )
        expect( res.body.quantidade ).to.be.greaterThan( 0 )
        expect( res.body.produtos[0] ).to.haveOwnProperty( 'nome' )
        expect( res.body.produtos[0] ).to.haveOwnProperty( 'preco' )
        expect( res.body.produtos[0] ).to.haveOwnProperty( 'quantidade' )
    }

    static validaCadastroDeProduto( res ){
        expect( res ).to.be.a( 'object' )
        expect( res.body ).to.haveOwnProperty( 'message' )
        expect( res.body ).to.haveOwnProperty( '_id' )
        expect( res.body.message ).to.be.a( 'string' )
        expect( res.body.message ).to.be.eq( 'Cadastro realizado com sucesso' )
    }

}