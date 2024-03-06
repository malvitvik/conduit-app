/// <reference types="cypress" />

class GlobalFeedPage {
    /**
     * 
     * @param {Array<string>} tags 
     */
    verifyTagList(tags) {
        cy.get('.tag-list a').invoke('text').then(items => {
            tags.forEach(tag => expect(items).to.contain(tag));
        })
    }

    openFirstArticle() {
        this.openArticle(0);
    }

    openArticle(index) {
        cy.get('.article-preview').should('not.have.text', 'Loading articles...')
        cy.get('.article-preview').eq(index).click();
    }
}

export const onGlobalFeedPage = new GlobalFeedPage();