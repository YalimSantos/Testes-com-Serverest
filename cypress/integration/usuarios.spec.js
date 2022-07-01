/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste da rota /usuarios da API Serverest', () => {
    it('Deve buscar todos os usuários cadastrados', () => {
        Serverest.buscarUsuarios().then( res => {
            ValidaServerest.ValidarBuscaDeUsuarios( res )
        })
    })
    
    it('Não deve realizar cadastro de um novo usuário', () => {
        cy.postarUsuarioJaCadastrado().then( res => {
            expect( res ).to.be.a( 'object' )
            expect( res.body.message ).to.be.a( 'string' )
            expect( res.body.message ).to.be.eq( 'Este email já está sendo usado' )
        })
    })

})