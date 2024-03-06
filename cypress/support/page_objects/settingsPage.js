class SettingsPage {
    logout() {
        cy.contains('Or click here to logout.').click();
    }
}

export const onSettingsPage = new SettingsPage()