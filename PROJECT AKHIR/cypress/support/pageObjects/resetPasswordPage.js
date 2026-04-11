class resetPasswordPage {

    resetPasswordCheck() {
        cy.get('h6').should('be.visible').and('contain', 'Reset Password')
    }

    resetButtonCheck() {
        cy.contains('button', 'Reset Password').should('be.visible')
    }

    cancelButtonCheck() {
        cy.contains('button', 'Cancel').should('be.visible')
    }

    resetButton() {
        cy.contains('button', 'Reset Password').should('be.visible').click()
    }

    cancelButton() {
        cy.contains('button', 'Cancel').should('be.visible').click()
    }

    inputUser() {

        cy.get('input[placeholder="Username"]').should('be.visible').type('Sahur')
    }

    verifyRequiredResetPass() {
        cy.contains('Required').should('be.visible')
    }



}
export default new resetPasswordPage