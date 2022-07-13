/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory.js'

describe('Casos de teste da rota /usuarios', () => {
    it('T01 - Buscar todos os usuários', () => {
        Serverest.buscarUsuarios().then( res => {
            cy.contractValidation( res, 'get-usuarios', 200 )
            ValidaServerest.ValidarBuscaDeUsuarios( res )
        })
    })

    it('T02 - Buscar um usuário em específico', () => {
        Serverest.buscarIdAleatorio()
        cy.get( '@usuarioId' ).then( usuarioId => {
            Serverest.localizarUsuarioComId( usuarioId._id ).then( res => {
                cy.contractValidation( res, 'get-usuarios/id', 200 )
            })
        })
    })

    it('T03 - Postar um novo usuário', () => {
        Serverest.postarNovoUsuario().then( res => {
            cy.contractValidation( res, 'post-usuarios', 201 )
            ValidaServerest.ValidarPostarNovoUsuario( res )
        })
    })

    it('T04 - Modificar as informações de um usuário', () => {
        Serverest.buscarIdAleatorio()
        cy.get('@usuarioId').then( usuarioId => {
            Serverest.modificarUsuario( usuarioId._id ).then( res => {
                cy.contractValidation( res, 'put-usuarios/id', 200 )
                ValidaServerest.validarModificarUsuario( res )
            })
        })     
    })

    it('T05 - Criar um novo usuário com o método PUT', () => {
        let id = Factory.gerarId()

        Serverest.criarUsuarioComPut( id ).then( res => {
            cy.contractValidation( res, 'put-usuarios/id', 201 )
            ValidaServerest.ValidarPostarNovoUsuario( res )
        })    
    })

    it('T06 - Deletar um usuário', () => {
        Serverest.buscarIdAleatorio()
        cy.get('@usuarioId').then( usuarioId => {
            Serverest.deletarUsuario( usuarioId._id ).then( res => {
                cy.contractValidation( res, 'delete-usuarios/id', 200 )
                ValidaServerest.validarDeletarUsuario( res )
            })
        })     
    })

    it('T07 - Deletar um usuário que não exista', () => {
        let id = Factory.gerarId()

        Serverest.deletarUsuarioNaoExiste( id ).then( res => {
            cy.contractValidation( res, 'delete-usuarios/id', 200 )
            ValidaServerest.ValidarDeletarUsuarioNaoExiste( res )
        })    
    })

})