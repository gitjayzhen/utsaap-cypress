const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')

/**这里是运行并生成用例：需要注意的是run方法需要添加options */
// cypress.run().then(
//   () => {
//     generateReport()
//   },
//   error => {
//     generateReport()
//     console.error(error)
//     process.exit(1)
//   }
// )

/** 合并输出的json文件，并整合生成一个html报告 */
async function generateReport(options) {
  const report = await merge(options)
    return await marge.create(report, options)
}

generateReport(
  { 
    files: ["out/results/*.json"], 
    reportDir: 'out/report',
    reportFilename: 'index.html',
    reportTitle: 'UI automation testing in Cypress',
    reportPageTitle: 'UTIC'
  })