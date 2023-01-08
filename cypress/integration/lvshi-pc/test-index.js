Cypress.config({
    "viewportWidth": 375,
    "viewportHeight": 812,
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Mobile/15E148 Safari/604.1"
})


// 1. describe作为一个测试套件suite
describe('测试律师的pc首页', () => {

    //2. 这里可以定义全局变量，类似setUp
    const lvshiHome = 'http://lvshi.test.com'

    //3. context 作为一个case去执行，是别名版的describe
    context('访问首页正常', () => {
        // 4. 作为一个用例的具体内容
        it('访问首页然后跳转到在线咨询', () => {
            cy.visit(lvshiHome)

            cy.get('.mnav > li:nth-child(2)').click()

            cy.url().should('include', 'lvshi')

            cy.screenshot('1.png')
        })

    })

    context('访问首页正常', () => {
        it('访问首页跳转到找律师', () => {
            cy.visit(lvshiHome)

            cy.get('.mnav > li:nth-child(3)').click()

            cy.url().should('include', 'lvshi')

            cy.screenshot('2.png')
        })

    })
    
})