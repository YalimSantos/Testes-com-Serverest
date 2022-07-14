/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste da rota /carrinhos da API Serverest', () => {

    it('T31 - Buscar todos os carrinhos', () => {
        Serverest.buscarCarrinhos().then( res => {
            cy.contractValidation( res, 'get-carrinhos', 200 )
            ValidaServerest.validaBuscaDeCarrinhos( res )
        })
    })

    context('T12 - Realizar login com sucesso', () => {
        before( 'Logar', () => {
            Serverest.buscarUsuarioAleatorio()
            cy.get('@usuarioLogin').then( usuario => {
                Serverest.login( usuario ).then( res => {
                    cy.contractValidation( res, 'post-login', 200 )
                    ValidaServerest.ValidaLogin( res )
                    Serverest.salvarBearer( res )
                })
            })
        })        

        it('Teste extra para conclusão de carrinho de usuário, caso exista um', () => {
            Serverest.concluirCompra().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/concluir-compra', 200 )
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
           
        it('Busca carrinho recém postado de usuário', () => {
            Serverest.localizarCarrinhoComId( Cypress.env( 'carrinhoId' ) ).then( res => {
                cy.contractValidation( res, 'get-carrinhos/id', 200 )
            })     
        })

    })
})