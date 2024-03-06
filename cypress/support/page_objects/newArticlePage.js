class NewArticlePage {
    /**
     * 
     * @param {{title, description, body}} article 
     */
    createArticle(article) {
        cy.get('[formcontrolname="title"]').type(article.title)
        cy.get('[formcontrolname="description"]').type(article.description)
        cy.get('[formcontrolname="body"]').type(article.body)
        cy.get('[type="button"]').click()    
    }
}

export const onNewArticlePage = new NewArticlePage();