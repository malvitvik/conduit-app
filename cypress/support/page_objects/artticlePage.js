class ArticlePage {

    deleteArticle() {
        cy.contains('Delete Article').click();
    }
}

export const onArticlePage = new ArticlePage();