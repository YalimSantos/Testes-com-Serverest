/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste da rota /carrinhos da API Serverest', () => {

    it('Deve buscar todos os carrinhos cadastrados', () => {
        Serverest.buscarCarrinhos().then( res => {
            cy.contractValidation( res, 'get-carrinhos', 200 )
            ValidaServerest.validaBuscaDeCarrinhos( res )
        })
    })

    context('Logar com sucesso', () => {
        before( 'Logar', () => {
            Serverest.buscarUsuarioAleatorio()
            cy.get('@usuarioLogin').then( usuario => {
                Serverest.login( usuario ).then( res => {
                    cy.contractValidation( res, 'get-login', 200 )
                    ValidaServerest.ValidaLogin( res )
                    Serverest.salvarBearer( res )
                })
            })
        })        

        it('Se existir, deve concluir a compra do carrinho de um usuário', () => {
            Serverest.concluirCompra().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/concluir-compra', 200 )
            })
        })

        it('Deve postar um novo carrinho', () => {
            Serverest.buscarProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.cadastrarCarrinho( produtoId._id ).then( res => {
                    cy.contractValidation( res, 'post-carrinhos', 201 )
                    ValidaServerest.validaCadastroDeCarrinho( res )
                    Serverest.SalvaIdDeCarrinho( res.body._id )
                })
            })
        })
           
        it('Busca carrinho recém postado de usuário', () => {
            Serverest.localizarCarrinhoDeUsuario( Cypress.env( 'carrinhoId' ) ).then( res => {
                cy.contractValidation( res, 'get-carrinhos/id', 200 )
            })     
        })

    })
})