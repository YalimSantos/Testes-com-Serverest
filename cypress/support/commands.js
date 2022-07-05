// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Ajv from 'ajv'

const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

Cypress.Commands.add('contractValidation', (res, schema, status) => {
    cy.log('Validando contrato para ' + schema + ' com status de ' + status)
    cy.fixture('schemas/' + schema + '/' + status + '.json').then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        if( !valid )
        {
            var errors = ''
            for( let each in validate.errors )
            {
                let err = validate.errors[each]
                errors += err.instancePath + ' ' + err.message + ', but receive ' + typeof err.data + '\n'
            }
            throw new Error('Erros encontrados na validação de contrato, por favor verifique: ' + errors)
        }
    })
})

Cypress.Commands.add('postarUsuarioJaCadastrado', () => { 
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: {
            "nome": "Fulano da Silva",
            "email": "fulano@qa.com",
            "password": "teste",
            "administrador": "true"
        }
    })
})

Cypress.Commands.add('login', (email, senha) => { 
    return cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            "email": email,
            "password": senha
        }
    })
})

Cypress.Commands.add('buscarUsuarioAleatorio', () => { 
    cy.request('/usuarios').then( res => {
        expect( res.body ).to.haveOwnProperty( 'usuarios' )
        expect( res.body.quantidade ).to.be.greaterThan(0)
        return {
            "email": res.body.usuarios[0].email,
            "senha": res.body.usuarios[0].password
        }
    } )
})