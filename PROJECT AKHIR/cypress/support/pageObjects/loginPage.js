class loginPage {

    //membuka halaman
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    //judul login terlihat (TC001)
    loginTitle() {
        cy.get('h5').should('be.visible').and('contain', 'Login')
    }

    //tombol login terlihat (TC002)
    loginButtonCheck() {
        cy.contains('button', 'Login').should('be.visible')
    }

    //tombol forgotpass terlihat (TC003)
    forgotPassButtonCheck() {
        cy.contains('Forgot your password').should('be.visible')
    }

    inputUsername(username) {
        cy.get('input[placeholder="Username"]').should('be.visible').type(username)
    }

    inputPassword(password) {
        cy.get('input[placeholder="Password"]').should('be.visible').type(password)
    }

    loginButton() {
        cy.get('button[type="submit"]').should('be.visible').click()
    }



    verifyInvalidCredentials() {
        cy.contains('Invalid credentials').should('be.visible')
    }

    verifyRequired() {
        cy.contains('Required').should('be.visible')
    }

    resetPasswordPage() {
        cy.url().should('include', 'requestPasswordResetCode')
    }

    clickForgotPass() {
        cy.contains('Forgot your password?').should('be.visible').click()
    }

    verifyPasswordPage() {
        cy.contains('Reset Password').should('be.visible')
    }

    loginValid() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[placeholder="Username"]').should('be.visible').type('Admin')
        cy.get('input[placeholder="Password"]').should('be.visible').type('admin123')

        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)





    }

}

export default new loginPage