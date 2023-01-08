// // enables intelligent code completion for Cypress commands
// // https://on.cypress.io/intelligent-code-completion
// /// <reference types="cypress" />


// //enable if you want to pass tests that fail with expected error

// // const failedTests = {}
// // const isFailingTest = (test) =>
// //   test.title.startsWith('fails with')

// // afterEach(function () {
// //   console.log(this.currentTest)
// //   console.log(failedTests)
// //   if (!isFailingTest(this.currentTest)) {
// //     return // all good
// //   }
// //   if (!failedTests[this.currentTest.title]) {
// //     throw new Error(`Test "${this.currentTest.title}" somehow passed`)
// //   }
// // })

// // Cypress.on('fail', (e, test) => {
// //   if (isFailingTest(test) &&
// //     test.title.endsWith(e.message)) {
// //     console.log('test "%s" is allowed to fail with error "%s"',
// //       test.title, e.message)
// //     failedTests[test.title] = test
// //   } else {
// //     throw e
// //   }
// // })

// // it('works', () => {
// //   expect(true).to.be.true
// // })
// // it('fails with expected 5 to equal 42', () => {
// //   cy.on('fail', (e, test) => {
// //     if (test.title.startsWith('fails with') &&
// //       test.title.endsWith(e.message)) {
// //       console.log('test "%s" is allowed to fail with error "%s"',
// //         test.title, e.message)
// //     } else {
// //       throw e
// //     }
// //   })

// //   expect(5).to.equal(42)
// // })



// // it('could also use a stub instead of imperative code', () => {
// //   cy.visit('https://weixin.test.com/weixin?type=1&s_from=input&query=%E5%A4%A9%E6%B0%94')
  
// //   cy.get("a[uigs='account_image_1']").click()
// //   cy.debugTabHelper()

// // })



// describe('Cypress Tab Helper',()=>{
//     it('names the root window "root" by default',()=>{
//         cy.visit(PAGE_A)
     
//         //
//         cy.debugTabHelper().then(debug=>{
//             expect(debug.myTabNames.length).to.eq(1)
//             expect(debug.myTabNames[0]).to.eq('root')
//         })
//     })
//     it('accepts a tab_name option when calling cy.visit for tracking the name of the root page',()=>{
//         cy.visit(PAGE_A,{tab_name: 'myRootWindow'})
//         cy.get('#nav_search_btn').click()
        
//         //
//         cy.debugTabHelper().then(debug=>{
//             expect(debug.myTabNames.length).to.eq(1)
//             expect(debug.myTabNames[0]).to.eq('myRootWindow')
//         })

//         cy.openTab(PAGE_B,{tab_name: 'myNewTab'})
//         cy.get('#navSwitch').click('div.banner-pic.swipe-wrap > div:nth-of-type(2) > a.outSource.banner-pic-wrap > div.pic-item')
//         //
//         cy.debugTabHelper().then(debug=>{
//             expect(debug.myTabNames.length).to.eq(2)
//             expect(debug.myTabNames[0]).to.eq('myRootWindow')
//             expect(debug.myTabNames[1]).to.eq('myNewTab')
//             expect(debug.active_tab_index).to.eq(1)
//         })
//     })
//     it('can open a new tab',()=>{
        
//     })
//     // it('can switch context back to the root window by name',()=>{
//     //     cy.switchToTab('myRootWindow')
       
//     //     //
//     //     cy.debugTabHelper().then(debug=>{
//     //         expect(debug.myTabNames.length).to.eq(2)
//     //         expect(debug.myTabNames[0]).to.eq('myRootWindow')
//     //         expect(debug.myTabNames[1]).to.eq('myNewTab')
//     //         expect(debug.active_tab_index).to.eq(0)
//     //     })
//     // })
//     // it('can navgiate the popup to another url without switching to it first',()=>{
//     //     cy.tabVisit(PAGE_C,'myNewTab')
     
//     //     //
//     //     cy.debugTabHelper().then(debug=>{
//     //         expect(debug.myTabNames.length).to.eq(2)
//     //         expect(debug.myTabNames[0]).to.eq('myRootWindow')
//     //         expect(debug.myTabNames[1]).to.eq('myNewTab')
//     //         expect(debug.active_tab_index).to.eq(1)
//     //     })
//     // })

//     // it('can close a tabs by name',()=>{
//     //     cy.closeTab('myNewTab')
//     // })
//     // // it('can\'t close the root window',()=>{
//     // //     cy.switchToTab('myRootWindow')
//     // //     cy.closeTab()
//     // //     // TODO stub & expect error
//     // // })
//     // it('can close all tabs (execept root)',()=>{
//     //     cy.closeAllTabs()
//     // })
// })