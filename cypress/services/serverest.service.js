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

}