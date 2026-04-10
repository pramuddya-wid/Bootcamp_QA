import loginPage from "../support/pageObjects/loginPage"
import loginData from "../fixtures/loginData.json"



describe('Scenario Verifikasi Fungsi Login', () => {

    it('TC001-Login dengan username valid dan password valid', () => {
        //cy.visit('https://opensource-demo.orangehrmlive.com/')
        loginPage.visitPage()

        //cy.get('input[placeholder="Username"]').type('Admin')
        loginPage.inputUsername(loginData.validUsername)

        //cy.get('input[placeholder="Password"]').type('admin123')
        loginPage.inputPassword(loginData.validPassword)

        //cy.get('button[type="submit"]').click()
        loginPage.loginButton()


        //cy.url().should('include', 'dashboard')
        loginPage.verifyLogin()

    })

    it('TC002-login dengan username valid dan password salah', () => {


        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUsername)
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()
        loginPage.verifyInvalidCredentials()



    })

    it('TC003-login dengan username tidak terdaftar (tidak valid) dan password salah', () => {

        loginPage.visitPage()
        loginPage.inputUsername(loginData.invalidUsername)
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()
        loginPage.verifyInvalidCredentials()


    })

    it('TC004-login dengan username valid dan mengosongkan password', () => {

        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUsername)
        loginPage.loginButton()
        loginPage.verifyRequired()




    })

    it('TC005-login dengan mengosongkan username dan memasukkan password random', () => {

        loginPage.visitPage()
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()
        loginPage.verifyRequired()



    })

    it('TC006-login dengan mengosongkan username dan mengosongkan password', () => {

        loginPage.visitPage()
        loginPage.loginButton()
        loginPage.verifyRequired()

    })

    it('TC007-Pengguna klik "forgot your password?"', () => {

        loginPage.visitPage()
        loginPage.clickForgotPass()
        loginPage.resetPasswordPage()
        loginPage.verifyPasswordPage()

    })

})