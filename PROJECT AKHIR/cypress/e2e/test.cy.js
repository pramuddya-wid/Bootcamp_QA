import loginPage from "../support/pageObjects/loginPage"
import loginData from "../fixtures/loginData.json"
import resetPasswordPage from "../support/pageObjects/resetPasswordPage"
import dashboardPage from "../support/pageObjects/dashboardPage"



//POM untuk assertion hanya digunakan pada assertion yang berhubungan dengan UI

describe('Scenario Verifikasi Fungsi Login', () => {

    it('TC001 - Judul halaman login terlihat', () => {
        loginPage.visitPage()
        loginPage.loginTitle()


    })

    it('TC002 - Tombol login terlihat', () => {
        loginPage.visitPage()
        loginPage.loginButtonCheck()

    })

    it('TC003 - Tombol forgot your password terlihat', () => {
        loginPage.visitPage()
        loginPage.forgotPassButtonCheck()
    })


    it('TC004 - Login dengan username valid dan password valid', () => {
        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUsername)
        loginPage.inputPassword(loginData.validPassword)

        //intercept
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')

        loginPage.loginButton()

        //wait
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)

        //assertion
        cy.url().should('include', 'dashboard')




    })



    it('TC005 - Login dengan username valid dan password salah', () => {

        //tidak menggunakan intercept dikarenakan TC ini hanya berhubungan dengan invalid credentials

        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUsername)
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()

        //POM Assertion
        loginPage.verifyInvalidCredentials()



    })

    it('TC006 - Login dengan username tidak terdaftar (tidak valid) dan password salah', () => {

        loginPage.visitPage()
        loginPage.inputUsername(loginData.invalidUsername)
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()

        //POM Assertion
        loginPage.verifyInvalidCredentials()


    })

    it('TC007 - Login dengan username valid dan mengosongkan password', () => {

        loginPage.visitPage()
        loginPage.inputUsername(loginData.validUsername)
        loginPage.loginButton()

        //POM Assertion
        loginPage.verifyRequired()




    })

    it('TC008 - Login dengan mengosongkan username dan memasukkan password random', () => {

        loginPage.visitPage()
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()

        //POM Assertion
        loginPage.verifyRequired()



    })

    it('TC009 - Login dengan mengosongkan username dan mengosongkan password', () => {

        loginPage.visitPage()
        loginPage.loginButton()

        //POM Assertion
        loginPage.verifyRequired()

    })

    it('TC010 - Pengguna klik "forgot your password?"', () => {

        loginPage.visitPage()
        loginPage.clickForgotPass()

        //assertion
        cy.url().should('include', 'requestPasswordResetCode')

        //POM Assertion 
        loginPage.verifyPasswordPage()

    })

    it('TC011 - Judul "Reset Password" terlihat ', () => {
        //Halaman login
        loginPage.visitPage()
        loginPage.clickForgotPass()

        resetPasswordPage.resetPasswordCheck()


    })

    it('TC012 - Pengguna dapat melihat tombol "reset password"', () => {

        //Halaman login
        loginPage.visitPage()
        loginPage.clickForgotPass()
        resetPasswordPage.resetButtonCheck()


    })

    it('TC013 - Pengguna dapat melihat tombol "cancel"', () => {

        //Halaman login
        loginPage.visitPage()
        loginPage.clickForgotPass()
        resetPasswordPage.cancelButtonCheck()

    })

    it('TC014 - Pengguna klik forgot password dengan username kosong', () => {
        //Halaman login
        loginPage.visitPage()
        loginPage.clickForgotPass()

        resetPasswordPage.resetButton()
        resetPasswordPage.verifyRequiredResetPass()

    })

    it('TC015 - Pengguna dapat klik forgot password dengan mencantumkan username', () => {

        //Halaman Login
        loginPage.visitPage()
        loginPage.clickForgotPass()


        resetPasswordPage.inputUser()

        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestResetPassword').as('reqPass')

        resetPasswordPage.resetButton()

        //wait
        cy.wait('@reqPass').its('response.statusCode').should('eq', 302)

        //Assertion
        cy.contains('Reset Password link sent successfully').should('be.visible')


    })

    it('TC016 - Pengguna dapat klik cancel dan kembali ke halaman login', () => {

        //Halaman Login
        loginPage.visitPage()
        loginPage.clickForgotPass()

        resetPasswordPage.cancelButton()

        //Assertion
        loginPage.loginTitle()
    })


    it('TC017 - Pengguna dapat klik menu dropdown dan memilih "about"', () => {
        loginPage.loginValid()

        dashboardPage.chooseDropdown('About')
        dashboardPage.aboutPopup()

    })

    it('TC018 - Pengguna dapat klik menu dropdown dan memilih "support"', () => {
        loginPage.loginValid()

        dashboardPage.chooseDropdown('Support')
        cy.url().should('include', 'support')

    })

    it('TC019 - Pengguna dapat klik menu dropdown dan memilih "Change Password"', () => {
        loginPage.loginValid()

        dashboardPage.chooseDropdown('Change Password')
        cy.url().should('include', 'updatePassword')


    })

    it('TC020 - Pengguna dapat klik menu dropdown dan memilih "logout"', () => {
        loginPage.loginValid()

        dashboardPage.chooseDropdown('Logout')
        cy.url().should('include', 'login')

    })

    it('TC021 - Pengguna dapat klik ikon jam untuk menambah kehadiran', () => {
        loginPage.loginValid()

        dashboardPage.clickAttendance()
        cy.url().should('include', 'punchIn')

    })

    it('TC022 - Pengguna dapat klik "Pending self Review"', () => {
        loginPage.loginValid()

        dashboardPage.clickPendingSelfRev()
        cy.url().should('include', 'myPerformanceReview')
    })

    it('TC023 - Pengguna dapat klik "candidate to interview" ', () => {

        loginPage.loginValid()

        dashboardPage.clickCandidateToInterview()
        cy.url().should('include', 'viewCandidates')

    })

    it('TC024 - Pengguna dapat klik "assign leave"', () => {

        loginPage.loginValid()

        dashboardPage.clickAssignLeave()
        cy.url().should('include', 'assignLeave')

    })

    it('TC025 - Pengguna dapat klik "leave list"', () => {

        loginPage.loginValid()

        dashboardPage.clickLeaveList()
        cy.url().should('include', 'viewLeaveList')

    })

    it('TC026 - Pengguna dapat klik "timesheets"', () => {

        loginPage.loginValid()

        dashboardPage.clickTimeSheets()
        cy.url().should('include', 'viewEmployeeTimesheet')

    })

    it('TC027 - Pengguna dapat klik "apply leave"', () => {

        loginPage.loginValid()

        dashboardPage.clickApplyLeave()
        cy.url().should('include', 'applyLeave')

    })

    it('TC028 - Pengguna dapat klik "My Leave"', () => {

        loginPage.loginValid()

        dashboardPage.clickMyLeave()
        cy.url().should('include', 'viewMyLeaveList')

    })

    it('TC029 - Pengguna dapat klik "My Timesheet"', () => {

        loginPage.loginValid()

        dashboardPage.clickMyTimeSheet()
        cy.url().should('include', 'viewMyTimesheet')

    })

    it('TC030 - Pengguna dapat melihat postingan karyawan lain', () => {

        loginPage.loginValid()

        dashboardPage.clickLatePost()
        cy.url().should('include', 'viewBuzz')

    })

    it('TC031 - Pengguna dapat melihat tombol "help"', () => {

        loginPage.loginValid()

        dashboardPage.buttonHelp()

    })










})
