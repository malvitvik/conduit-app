class NavigationPage {
    settingsPage() {
        cy.contains('Settings').click();
    }

    newArticlePage() {
        cy.contains('New Article').click();
    }

    globalFeedsPage() {
        cy.contains('Global Feed').click()
    }

    verifyLoggedOut() {
        cy.get('.navbar-nav').should('contain', 'Sign up');
    }
}

export const navigateTo = new NavigationPage();