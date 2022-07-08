/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste da rota /usuarios da API Serverest', () => {
    it('Deve buscar todos os usuários cadastrados', () => {
        Serverest.buscarUsuarios().then( res => {
            cy.contractValidation( res, 'get-usuarios', 200 )
            ValidaServerest.ValidarBuscaDeUsuarios( res )
        })
    })
    
    it('Não deve realizar cadastro de um novo usuário', () => {
        cy.postarUsuarioJaCadastrado().then( res => {
            cy.contractValidation( res, 'post-usuarios', 400 )
            expect( res.body.message ).to.be.eq( 'Este email já está sendo usado' )
        })
    })

    it('Deve buscar usuário pelo id', () => {
        Serverest.buscarIdAleatorio()
        cy.get( '@usuarioId' ).then( usuarioId => {
            Serverest.localizarUsuarioComId( usuarioId._id ).then( res => {
                cy.contractValidation( res, 'get-usuarios/id', 200 )
            })
        })
    })

})