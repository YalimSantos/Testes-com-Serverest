/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory.js'

describe('Casos de teste da rota /produtos da API Serverest', () => {
    
    it('T14 - Buscar todos os produtos', () => {
        Serverest.buscarProdutos().then( res => {
            cy.contractValidation( res, 'get-produtos', 200 )
            ValidaServerest.validaBuscaDeProdutos( res )
        })
    })

    it('T15 - Buscar um produto em específico', () => {
        Serverest.buscarIdProdutoAleatorio()
        cy.get( '@produtoId' ).then( produtoId => {
            Serverest.localizarProdutoComId( produtoId._id ).then( res => {
                cy.contractValidation( res, 'get-produtos/id', 200 )
            })
        })
    })


    context('T12 - Realizar login com sucesso', () => {
        beforeEach( 'Logar', () => {
            Serverest.buscarUsuarioAleatorio()
            cy.get('@usuarioLogin').then( usuario => {
                Serverest.login( usuario ).then( res => {
                    cy.contractValidation( res, 'post-login', 200 )
                    ValidaServerest.ValidaLogin( res )
                    Serverest.salvarBearer( res )
                })
            })
        })

        it('T16 - Postar um novo produto', () => {
            Serverest.cadastrarProduto().then( res => {
                cy.contractValidation( res, 'post-produtos', 201 )
                ValidaServerest.validaCadastroDeProduto( res )
            })
        })

        it('T17 - Modificar as informações de um produto', () => {
            Serverest.buscarIdProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.modificarProduto( produtoId._id ).then( res => {
                    cy.contractValidation( res, 'put-produtos/id', 200 )
                    ValidaServerest.validarModificarProduto( res )
                })
            })     
        })

        it('T18 - Postar novo produto pelo método PUT', () => {
            let id = Factory.gerarId()
    
            Serverest.criarProdutoComPut( id ).then( res => {
                cy.contractValidation( res, 'put-produtos/id', 201 )
                ValidaServerest.validaCadastroDeProduto( res )
            })    
        })

        it('T19 - Deletar um produto', () => {
            Serverest.buscarIdProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.deletarProduto( produtoId._id ).then( res => {
                    cy.contractValidation( res, 'delete-produtos/id', 200 )
                    ValidaServerest.validarDeletarProduto( res )
                })
            })     
        })

        it('T20 - Deletar um produto que não exista', () => {
            let id = Factory.gerarId()
    
            Serverest.deletarProdutoNaoExiste( id ).then( res => {
                cy.contractValidation( res, 'delete-produtos/id', 200 )
                ValidaServerest.ValidarDeletarProdutoNaoExiste( res )
            })    
        })

    })
})