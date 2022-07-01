const URL_USUARIOS  = '/usuarios'    
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'

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

    static buscarProdutos(){
        return cy.request( URL_PRODUTOS )
    }
    
    static cadastrarProduto(){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env( 'bearer' )
            },
            body: {
                "nome": "Saveiro",
                "preco": 8000,
                "descricao": "Carro",
                "quantidade": 20
            }
        })
    }

}