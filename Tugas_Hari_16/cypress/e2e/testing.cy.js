describe('Scenario Verifikasi Fungsi Login', () => {

    it('TC001-Login dengan username valid dan password valid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Username"]').type('Admin')
        cy.get('input[placeholder="Password"]').type('admin123')

        cy.intercept('Get', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
        
        cy.get('button[type="submit"]').click()
        cy.wait('@actionSummary').its('response.statusCode').should('eq',200)

        cy.url().should('include', 'dashboard')


    })

    it('TC002-login dengan username valid dan password salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Username"]').type('Admin')
        cy.get('input[placeholder="Password"]').type('Sahur123')


        cy.intercept('Get', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('message')
        
        cy.get('button[type="submit"]').click()
        cy.wait('@message').its('response.statusCode').should('be.oneOf',[200,304])

        cy.contains('Invalid credentials').should('be.visible')

    })

    it('TC003-login dengan username tidak terdaftar (tidak valid) dan password salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Username"]').type('Sahur')
        cy.get('input[placeholder="Password"]').type('Sahur124')
        
        cy.intercept('Get', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('loginPage')
        
        cy.get('button[type="submit"]').click()
        cy.wait('@loginPage').its('response.statusCode').should('be.oneOf',[200,304])

        cy.contains('Invalid credentials').should('be.visible')

    })

    it('TC004-login dengan username tidak valid dan password valid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.get('input[placeholder="Username"]').type('Sahur')
        cy.get('input[placeholder="Password"]').type('admin123')
        cy.intercept('Post', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('validate')
        
        cy.get('button[type="submit"]').click()
        cy.wait('@validate').its('response.statusCode').should('be.oneOf',[200,302,304])


        cy.contains('Invalid credentials').should('be.visible')

    })



    it('TC005-Pengguna klik "forgot your password?"', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')

         cy.intercept('Get', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('passwordReset')

        cy.contains('Forgot your password?').click()
        cy.url().should('include', 'requestPasswordResetCode')
        cy.wait('@passwordReset').its('response.statusCode').should('be.oneOf',[200,304])

        cy.contains('Reset Password').should('be.visible')
    })




})