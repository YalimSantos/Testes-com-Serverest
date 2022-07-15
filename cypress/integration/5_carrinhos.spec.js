/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory.js'

describe('Casos de teste da rota /carrinhos da API Serverest', () => {

    it('T31 - Buscar todos os carrinhos', () => {
        Serverest.buscarCarrinhos().then( res => {
            cy.contractValidation( res, 'get-carrinhos', 200 )
            ValidaServerest.validaBuscaDeCarrinhos( res )
        })
    })

    it('T38 - Falhar ao pesquisar carrinho que não exista', () => {
        let id = Factory.gerarId()

        Serverest.localizarCarrinhoComIdPodeFalhar( id ).then( res => {
            cy.contractValidation( res, 'get-carrinhos/id', 400 )
            ValidaServerest.validaBuscaDeCarrinhosSemSucesso( res )
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
                })
            })
        })

        it('T40 - Falhar ao postar carrinho em usuário que já tenha um carrinho cadastrado', () => {
            Serverest.buscarProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.cadastrarCarrinhoPodeFalhar( produtoId._id ).then( res => {
                    cy.contractValidation( res, 'post-carrinhos', 400 )
                    ValidaServerest.validaCadastroDeCarrinhoComCarrinhoJaCadastrado( res )
                })
            })
        })

        it('T32 - Buscar um carrinho em específico', () => {
            Serverest.buscarIdCarrinhoAleatorio()
            cy.get( '@carrinhoId' ).then( carrinhoId => {
                Serverest.localizarCarrinhoComId( carrinhoId._id ).then( res => {
                    cy.contractValidation( res, 'get-carrinhos/id', 200 )
                })
            })
        })

        it('T34 - Concluir compra de um carrinho', () => {
            Serverest.concluirCompra().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/concluir-compra', 200 )
                ValidaServerest.validaConclusaoDeCarrinho( res )
            })
        })

        it('T35 - Concluir compra sem que exista um carrinho vinculado ao usuário', () => {
            Serverest.concluirCompra().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/concluir-compra', 200 )
                ValidaServerest.validaConclusaoDeCarrinhoSemCarrinho( res )
            })
        })

        it('Postando outro carrinho para os testes de cancelamento', () => {
            Serverest.buscarProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.cadastrarCarrinho( produtoId._id ).then( res => {
                    cy.contractValidation( res, 'post-carrinhos', 201 )
                    ValidaServerest.validaCadastroDeCarrinho( res )
                })
            })
        })

        it('T36 - Cancelar compra de um carrinho', () => {
            Serverest.cancelarCompra().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/cancelar-compra', 200 )
                ValidaServerest.validaCancelamentoDeCarrinho( res )
            })
        })

        it('T37 - Cancelar compra sem que exista um carrinho vinculado ao usuário', () => {
            Serverest.cancelarCompra().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/cancelar-compra', 200 )
                ValidaServerest.validaCancelamentoDeCarrinhoSemCarrinho( res )
            })
        })

        it('T39 - Falhar ao postar carrinho com produto duplicado', () => {
            Serverest.buscarProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.cadastrarCarrinhoDoisProdutosPodeFalhar( produtoId._id ).then( res => {
                    cy.contractValidation( res, 'post-carrinhos', 400 )
                    ValidaServerest.validaCadastroDeCarrinhoComDoisProdutosIguais( res )
                })
            })
        })

        it('T41 - Falhar ao postar carrinho com produto que não exista ', () => {
            let id = Factory.gerarId()

            Serverest.cadastrarCarrinhoPodeFalhar( id ).then( res => {
                cy.contractValidation( res, 'post-carrinhos', 400 )
                ValidaServerest.validaCadastroDeCarrinhoComProdutoNaoExiste( res )
            })
        })

        it('T42 - Falhar ao postar carrinho com produto sem quantidade o suficiente', () => {
            Serverest.buscarProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.cadastrarCarrinhoPodeFalhar( produtoId._id, 99999999999999 ).then( res => {
                    cy.contractValidation( res, 'post-carrinhos', 400 )
                    ValidaServerest.validaCadastroDeCarrinhoComProdutoSemQuantidade( res )
                })
            })
        })

        it('T43 - Falhar ao tentar postar um carrinho logado com um token inválido', () => {
            Serverest.gerarBearerInexistente()
            Serverest.buscarProdutoAleatorio()
            cy.get('@produtoId').then( produtoId => {
                Serverest.cadastrarCarrinhoPodeFalhar( produtoId._id ).then( res => {
                    cy.contractValidation( res, 'post-carrinhos', 401 )
                    ValidaServerest.validaTokenInexistente( res )
                })
            })
        })

        it('T44 - Falhar ao concluir compra de carrinho logado com um token inválido', () => {
            Serverest.concluirCompraPodeFalhar().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/concluir-compra', 401 )
                ValidaServerest.validaTokenInexistente( res )
            })
        })

        it('T45 - Falhar ao cancelar compra de carrinho logado com um token inválido', () => {
            Serverest.cancelarCompraPodeFalhar().then( res => {
                cy.contractValidation( res, 'delete-carrinhos/cancelar-compra', 401 )
                ValidaServerest.validaTokenInexistente( res )
            })
        })

    })
})