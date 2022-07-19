/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste da rota /login', () => {
    
    it('T12 - Realizar login com sucesso', () => {
        Serverest.buscarUsuarioAleatorio()
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.login( usuario ).then( res => {
                cy.contractValidation( res, 'post-login', 200 )
                ValidaServerest.ValidaLogin( res, 200 )
                Serverest.salvarBearer( res )
            })
        })
    })

    it('T13 - Falhar ao tentar realizar um login', () => {
        Serverest.buscarEmailAleatorio()
        cy.get('@usuarioEmail').then( usuario => {
            let usuarioEmail = JSON.stringify(usuario.email)

            Serverest.loginSemSucesso( usuarioEmail.slice(1, usuarioEmail.length -2) ).then( res => {
                cy.contractValidation( res, 'post-login', 400 )
                ValidaServerest.ValidaLoginSemSucesso( res, 400 )
            })
        })
    })

    // Salva para fazer o login no teste abaixo desse
    it('Teste para aprender conteúdo - Deve buscar e salvar um usuário em um arquivo json', () => {
        Serverest.buscarUsuarios().then( res => {
            cy.contractValidation( res, 'get-usuarios', 200 )
            cy.writeFile('./cypress/fixtures/usuario.json', res.body.usuarios[0])
            ValidaServerest.ValidarBuscaDeUsuarios( res, 200 )
        })
    })

    it('Teste para aprender conteúdo - Deve buscar o usuário de um arquivo json', () => {
        cy.fixture('usuario.json').then( json => {
            let usuario = {
                'email': json.email,
                'password': json.password
            }

            Serverest.login( usuario ).then( res => {
                cy.contractValidation( res, 'post-login', 200 )
                ValidaServerest.ValidaLogin( res, 200 )
                Serverest.salvarBearer( res )
            })
        })
    })
})