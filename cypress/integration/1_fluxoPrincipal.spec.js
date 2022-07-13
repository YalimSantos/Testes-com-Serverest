/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory.js'

let usuario = Factory.gerarNovoUsuario()

describe('Casos de teste do fluxo principal', () =>{
    it('T03 - Postar um novo usuário', () => {
        Serverest.postarNovoUsuarioComParametro( usuario ).then( res => {
            cy.contractValidation( res, 'post-usuarios', 201 )
            ValidaServerest.ValidarPostarNovoUsuario( res )
            Cypress.env('usuarioLoginFluxo', {
                "email": usuario.email,
                "password": usuario.password
            })
        })
    })

    context('T12 - Realizar login com sucesso', () => {
        before( 'Logar', () => {
            let usuarioLogin = Cypress.env( 'usuarioLoginFluxo' )

            Serverest.login( usuarioLogin ).then( res => {
                cy.contractValidation( res, 'get-login', 200 )
                ValidaServerest.ValidaLogin( res )
                Serverest.salvarBearer( res )
            })
            
        })        

        it('T33 - Postar um novo carrinho', () => {
            Serverest.buscarProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.cadastrarCarrinho( produtoId._id ).then( res => {
                    cy.contractValidation( res, 'post-carrinhos', 201 )
                    ValidaServerest.validaCadastroDeCarrinho( res )
                    Serverest.SalvaIdDeCarrinho( res.body._id )
                })
            })
        })

        it('T34 - Concluir compra de um carrinho', () => {
            Serverest.concluirCompra().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/concluir-compra', 200 )
                ValidaServerest.validaConclusaoDeCompra( res )
            })
        })
    })
})