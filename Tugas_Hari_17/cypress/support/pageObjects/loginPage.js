class loginPage {
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
    }

    inputUsername(username) {
        cy.get('input[placeholder="Username"]').type(username)
    }

    inputPassword(password) {
        cy.get('input[placeholder="Password"]').type(password)
    }

    loginButton() {
        cy.get('button[type="submit"]').click()
    }

    verifyLogin() {
        cy.url().should('include', 'dashboard')
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
        cy.contains('Forgot your password?').click()
    }

    verifyPasswordPage() {
        cy.contains('Reset Password').should('be.visible')
    }

}

export default new loginPage