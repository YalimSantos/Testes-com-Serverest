/// <reference types="cypress" />

describe('Casos de teste da rota /usuarios da API Serverest', () => {
    it('Deve buscar todos os usuários cadastrados', () => {
        cy.request( '/usuarios' ).then( res => {
            expect( res ).to.be.a( 'object' )
            expect( res.body ).to.haveOwnProperty( 'quantidade' )
            expect( res.body.quantidade ).to.be.a( 'number' )
            expect( res.body.quantidade ).to.be.greaterThan( 0 )
        })
    })
    it('Não deve realizar cadastro de um novo usuário', () => {
        cy.postarUsuarioJaCadastrado().then( res => {
            expect( res ).to.be.a( 'object' )
            expect( res.body.message ).to.be.a( 'string' )
            expect( res.body.message ).to.be.eq( 'Este email já está sendo usado' )
        })
    })

    it('Deve realizar o login com sucesso', () => {
        cy.buscarUsuarioAleatorio().then( usuario => {
            cy.login( usuario.email, usuario.senha ).then( res => {
                expect( res ).to.be.a('object')
                expect( res.body ).to.haveOwnProperty( 'message' )
                expect( res.body ).to.haveOwnProperty( 'authorization' )
                expect( res.body.message ).to.be.eq( 'Login realizado com sucesso' )

                var bearer = res.body.authorization.slice(7)
                cy.log( bearer )
            } )
        })
    })
})