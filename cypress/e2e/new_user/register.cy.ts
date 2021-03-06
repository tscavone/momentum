import { contains } from 'cypress/types/jquery'
import { randomTestString } from '../../utils'

describe('empty spec', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:3000')
    })

    it('has the login page', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.get('#loginUsername-label').should(
            'have.attr',
            'for',
            'loginUsername'
        )
    })

    it('has the registration page', () => {
        cy.contains('login').click()

        cy.get('#first').should('have.attr', 'required')
    })

    const username = randomTestString()
    const password = 'password'
    it('can register a new user and create new employee', () => {
        cy.contains('login').click()

        const first = randomTestString()
        const last = randomTestString()
        const email = randomTestString() + '@testUser.com'

        cy.get('#first').type(`${first}`)
        cy.get('#last').type(`${last}`)
        cy.get('#registerUsername').type(`${username}`)
        cy.get('#email').type(`${email}`)
        cy.get('#registerPassword').type(`${password}`)
        cy.get('#confirmPassword').type(`${password}`)

        cy.get('#create').click()
        cy.contains('created successfully, please login', {
            timeout: 25000,
        }).should('exist')

        const firstName = 'employee1First'
        const lastName = 'employee1Last'
        const employeeEmail = 'employee1email@foo.com'
        const position = 'Software Engineer'
        cy.login(username, password)
        cy.contains('enter employee', { timeout: 25000 })
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(employeeEmail)
        cy.get('#position').select(position)
        cy.contains('save details').click()
        cy.contains(`${firstName} ${lastName}`).should('exist')
    })

    const newFollowUp = 'remind about open enrollment'
    it('newly registered user can create followups', () => {
        cy.login(username, password)
        cy.contains('new follow up', {
            timeout: 25000,
        }).click()
        cy.get('#follow-up').type(newFollowUp)
        cy.contains('add and close').click()
        cy.contains('follow ups').click()
        cy.inputValueContains(newFollowUp).should('exist')
    })

    it('newly registered users new data persists through logout', () => {
        cy.login(username, password)
        cy.contains('follow ups', {
            timeout: 25000,
        }).click()
        cy.inputValueContains(newFollowUp).should('exist')
        cy.contains('resolve').click()
        cy.inputValueContains(newFollowUp).should('not.exist')
    })
})
