// ****************主要写命令（新增）*******************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
require('../../plugins/index')
//切换iframe 
Cypress.Commands.add('getIframeBody', (value) => {
    
    value = value - 1
    // 定义getIframeBody方法
    // and retry until the body element is not empty
    return cy
    .get('iframe')
    // 包装body DOM元素以允许链接更多Cypress 命令, 如 ".find(...)"
    // warp命令使用文档地址 https://on.cypress.io/wrap
    .then(cy.wrap)
            
    // 包装body DOM元素以允许链接更多Cypress 命令, 如 ".find(...)"
            
  })



Cypress.Commands.add('forceVisit', url => {
  cy.window().then(win => {
      return win.open(url, '_self'); 
    });
});
