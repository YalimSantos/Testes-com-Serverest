/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste da rota /produtos da API Serverest', () => {
    
    it('Deve buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then( res => {
            ValidaServerest.validaBuscaDeProdutos( res )
        })
    })

    context('Logar com sucesso', () => {
        beforeEach( 'Logar', () => {
            Serverest.buscarUsuarioAleatorio()
            cy.get('@usuarioLogin').then( usuario => {
                Serverest.login( usuario ).then( res => {
                    ValidaServerest.ValidaLogin( res )
                    Serverest.salvarBearer( res )
                })
            })
        })

        it('Deve postar um novo produto', () => {
            Serverest.cadastrarProduto().then( res => {
                ValidaServerest.validaCadastroDeProduto( res )
            })
        })
    })
})