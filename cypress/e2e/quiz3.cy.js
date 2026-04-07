describe('Scenario Verifikasi Fungsi Login', () => {

    it('TC001-Login dengan username valid dan password valid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Username"]').type('Admin')
        cy.get('input[placeholder="Password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', 'dashboard')

    })

    it('TC002-login dengan username valid dan password salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Username"]').type('Admin')
        cy.get('input[placeholder="Password"]').type('Sahur123')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')

    })

    it('TC003-login dengan username tidak terdaftar (tidak valid) dan password salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Username"]').type('Sahur')
        cy.get('input[placeholder="Password"]').type('Sahur124')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')

    })

    it('TC004-login dengan username valid dan mengosongkan password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

    it('TC005-login dengan mengosongkan username dan memasukkan password random', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Password"]').type('Sahur124')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

    it('TC006-login dengan mengosongkan username dan mengosongkan password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

    it('TC007-Pengguna klik "forgot your password?"', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')

        cy.contains('Forgot your password?').click()
        cy.url().should('include', 'requestPasswordResetCode')

        cy.contains('Reset Password').should('be.visible')
    })




})