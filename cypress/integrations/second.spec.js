/// <reference types="cypress" />

import { navigateTo } from "../support/page_objects/navigationPage";
import { onSettingsPage } from "../support/page_objects/settingsPage";

describe('Log out suite', () => {
    beforeEach('log in to application', () => {
        cy.loginToApplication();
      })

      it('logged in user can log out', () => {
        navigateTo.settingsPage();
        onSettingsPage.logout();
        navigateTo.verifyLoggedOut();
      })
})