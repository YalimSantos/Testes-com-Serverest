import Factory from '../fixtures/factory.js'

const URL_USUARIOS  = '/usuarios'    
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'
const URL_CARRINHOS_CONCLUIR_COMPRA = '/carrinhos/concluir-compra'

export default class Serverest {

    // Ações que podemos realizar na API
    // Buscar usuários
    // Cadastrar novos usuários
    // Realizar login

    // usuarios //

    static postarNovoUsuario(){
        let usuario = Factory.gerarNovoUsuario()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: true,
            body: usuario
        })
    }

    static postarNovoUsuarioComParametro( usuario ){
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: true,
            body: usuario
        })
    }

    static modificarUsuario( usuarioId ){
        Serverest.localizarUsuarioComId( usuarioId ).then( res => {
            cy.contractValidation( res, 'get-usuarios/id', 200 )
        })

        return cy.request({
            method: 'PUT',
            url: URL_USUARIOS + '/' + usuarioId,
            failOnStatusCode: true,
            body: {            
                "nome": Factory.gerarNome(),
                "email": Factory.gerarEmail(),
                "password": "teste",
                "administrador": "true"               
            }
        })
    }

    static criarUsuarioComPut( usuarioId ){
        return cy.request({
            method: 'PUT',
            url: URL_USUARIOS + '/' + usuarioId,
            failOnStatusCode: true,
            body: {            
                "nome": Factory.gerarNome(),
                "email": Factory.gerarEmail(),
                "password": "teste",
                "administrador": "true"               
            }
        })
    }

    static buscarUsuarios(){
        return cy.request( URL_USUARIOS )
    }

    static buscarUsuarioAleatorio(){
        this.buscarUsuarios().then( res => {
            cy.wrap({
                "email": res.body.usuarios[0].email,
                "password": res.body.usuarios[0].password
            }).as('usuarioLogin')
        })
    }

    static buscarIdAleatorio(){
        this.buscarUsuarios().then( res => {
            cy.wrap({
                "_id": res.body.usuarios[0]._id
            }).as('usuarioId')
            
            Cypress.env('usuarioId', res.body.usuarios[0]._id)
        })
    }

    static localizarUsuarioComId( usuarioId ){
        return cy.request( URL_USUARIOS + '/' + usuarioId )
    }

    // login //

    static login( usuario ){
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            failOnStatusCode: true,
            body: usuario
        })
    }

    static salvarBearer( res ){
        Cypress.env('bearer', res.body.authorization.slice(7))
    }

    // produtos //

    static buscarProdutoAleatorio(){
        this.buscarProdutos().then( res => {
            expect( res.body.produtos[0] ).to.haveOwnProperty( '_id' )
            cy.wrap({
                "_id": res.body.produtos[0]._id
            }).as('produtoId')
        })
    }

    static buscarProdutos(){
        return cy.request( URL_PRODUTOS )
    }
    
    static cadastrarProduto(){
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env( 'bearer' )
            },
            body: produto
        })
    }

    // carrinhos //

    static buscarCarrinhos(){
        return cy.request( URL_CARRINHOS )
    }

    static cadastrarCarrinho( produtoId ){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env( 'bearer' )
            },
            body: {
                "produtos": [
                  {
                    "idProduto": produtoId,
                    "quantidade": 1
                  }
                ]
              }
        })
    }

    static concluirCompra(){
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS_CONCLUIR_COMPRA,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env( 'bearer' )
            }
        })
    }

    static SalvaIdDeCarrinho( carrinhoId )
    {
        Cypress.env('carrinhoId', carrinhoId)
    }

    static localizarCarrinhoDeUsuario( carrinhoId )
    {
        return cy.request( URL_CARRINHOS + '/' + carrinhoId )
    }

}