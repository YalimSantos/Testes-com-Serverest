/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste da rota /login da API Serverest', () => {
    
    it('Deve realizar o login com sucesso', () => {
        Serverest.buscarUsuarioAleatorio()
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.login( usuario ).then( res => {
                ValidaServerest.ValidaLogin( res )
                Serverest.salvarBearer( res )
            })
        })
    })
})