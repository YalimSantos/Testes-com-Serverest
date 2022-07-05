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

    // Salva para fazer o login no teste abaixo desse
    it('Deve buscar e salvar um usuário em um arquivo json', () => {
        Serverest.buscarUsuarios().then( res => {
            cy.writeFile('./cypress/fixtures/usuario.json', res.body.usuarios[0])
            ValidaServerest.ValidarBuscaDeUsuarios( res )
        })
    })

    it('Deve buscar o usuário de um arquivo json', () => {
        cy.fixture('usuario.json').then( json => {
            let usuario = {
                'email': json.email,
                'password': json.password
            }

            Serverest.login( usuario ).then( res => {
                ValidaServerest.ValidaLogin( res )
                Serverest.salvarBearer( res )
            })
        })
    })
})