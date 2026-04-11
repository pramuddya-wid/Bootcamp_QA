class dashboardPage {
    chooseDropdown(choice) {
        cy.get('.oxd-userdropdown-tab').should('be.visible').click()
        cy.get('.oxd-dropdown-menu').should('be.visible').contains('li', choice).click()

    }

    aboutPopup() {
        cy.get('div[role="document"]').should('be.visible')
    }

    clickAttendance() {
        cy.get('.orangehrm-attendance-card-action').should('be.visible').click()
    }

    clickPendingSelfRev() {

        cy.contains('(1) Pending Self Review').should('be.visible').click()
    }

    clickCandidateToInterview() {

        cy.contains('(1) Candidate to Interview').should('be.visible').click()
    }


    clickAssignLeave() {
        cy.get('button[title="Assign Leave"]').should('be.visible').click()
    }

    clickLeaveList() {
        cy.get('button[title="Leave List"]').should('be.visible').click()
    }

    clickTimeSheets() {
        cy.get('button[title="Timesheets"]').should('be.visible').click()
    }

    clickApplyLeave() {
        cy.get('button[title="Apply Leave"]').should('be.visible').click()
    }

    clickMyLeave() {
        cy.get('button[title="My Leave"]').should('be.visible').click()
    }

    clickMyTimeSheet() {
        cy.get('button[title="My Timesheet"]').should('be.visible').click()
    }

    clickLatePost() {
        cy.get('.orangehrm-buzz-widget-header').should('have.length.at.least', 1).first().should('be.visible').click()
    }

    buttonHelp() {
        cy.get('button[title="Help"]').should('be.visible')
    }




}

export default new dashboardPage