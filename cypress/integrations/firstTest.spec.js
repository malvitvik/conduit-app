/// <reference types="cypress" />

const { onNewArticlePage } = require("../support/page_objects/newArticlePage");
const { onGlobalFeedPage } = require("../support/page_objects/globalFeedPage");
const { navigateTo } = require("../support/page_objects/navigationPage");
const { onArticlePage } = require("../support/page_objects/artticlePage");

describe('Test with backend', () => {
  beforeEach('log in to application', () => {
    cy.intercept({ method: 'Get', path: 'tags' }, { fixture: 'tags.json' })
    cy.loginToApplication();
  })

  it('verify correct request and responce', () => {
    const article = {
      title: 'This is the title',
      description: 'This is the description',
      body: 'This is a body of the article'
    };

    // navigateTo.globalFeedsPage();
    // onGlobalFeedsPage().

    navigateTo.newArticlePage();

    cy.intercept('POST', '**/articles/').as('postArticles');

    onNewArticlePage.createArticle(article);

    cy.wait('@postArticles').then(xhr => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.request.body.article.body).to.equal(article.body);
      expect(xhr.response.body.article.description).to.equal(article.description);
    });

    onArticlePage.deleteArticle();
  })

  it('intercepting and modifying request and responce', () => {
    const article = {
      title: 'This is the title',
      description: 'This is the description',
      body: 'This is a body of the article'
    };
    const replacedDescription = 'This is the description 2';

    navigateTo.newArticlePage();

    // cy.intercept('POST', '**/articles/', (req) => {
    //   req.body.article.description = replacedDescription
    // }).as('postArticles')

    cy.intercept('POST', '**/articles/', (req) => {
      req.reply((res) => {
        expect(res.body.article.description).to.equal(article.description)
        res.body.article.description = replacedDescription
      })
    }).as('postArticles');


    onNewArticlePage.createArticle(article)

    cy.wait('@postArticles').then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.article.body).to.equal(article.body)
      expect(xhr.response.body.article.description).to.equal(replacedDescription)
    });

    onArticlePage.deleteArticle();
  })

  it('verify popular tags are displayed', {retries: 1}, () => {
    // onGlobalFeedPage.verifyTagList(['cypress', 'automation', 'testing'])
    cy.get('.tag-list')
      .should('contain', 'cypress')
      .and('contain', 'automation')
      .and('contain', 'testing')
  })

  it('verify current feed likes count', () => {
    cy.intercept('GET', '**/articles/feed*', { "articles": [], "articlesCount": 0 })
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' })

    navigateTo.globalFeedsPage()

    cy.get('app-article-list button').then(heartList => {
      expect(heartList[0]).to.contain('1')
      expect(heartList[1]).to.contain('5')
    })

    cy.fixture('articles.json').then(file => {
      const articleLink = file.articles[1].slug
      file.articles[1].favoritesCount = 6

      cy.intercept('POST', '**/articles/' + articleLink + 'favorite', file)

    })

    cy.get('app-article-list button').eq(1).click().should('contain', '6')

  })

  it.only('delete an article in global feed', () => {
    const bodyRequest = {
      article: {
        tagList: [],
        title: "Request from API",
        description: "API is easy",
        body: "Cypress is cool"
      }
    }

    cy.get('@token').then(token => {
        cy.request({
          url: Cypress.env('apiURL') + '/api/articles',
          headers: {
            'Authorization': 'Token ' + token
          },
          method: 'POST',
          body: bodyRequest
        }).then(response => {
          expect(response.status).to.equal(201)
        })

        navigateTo.globalFeedsPage();
        onGlobalFeedPage.openFirstArticle();
        onArticlePage.deleteArticle();

        cy.request({
          url: Cypress.env('apiURL') + '/api/articles?limit=10&offset=0',
          headers: {
            'Authorization': 'Token ' + token
          },
          method: 'Get'
        }).its('body').then(body => {
          expect(body.articles[0].title).not.equal(bodyRequest.article.title);
        })
      })
  })
})