/// <reference types="cypress" />


// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const mysql = require('mysql')

//数据库读取
function getFromDb(query,config){
  const connection = mysql.createConnection(config.env.db)
  connection.connect()
  return new Promise((resolve,reject)=> {
    connection.query(query,(error, results) =>{
     if (error) return reject(error)
     else{
       connection.end()
       return resolve(results)
     }
    })
   })
}

//获取对象类型
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8,-1);
}


module.exports = (on, config) => {
  on('task',{
    queryDb : query=>{  //数据库读取
      return getFromDb(query,config) 
    },
    isAlias: content =>{
      let reg = /(\{.+?\})/g
        let alias_content = content.match(reg)
        if(alias_content !== null){ //
          if(alias_content[0].split('.').length > 1){ //缓存里的元素
            
            var element = alias_content[0].substring(1,alias_content[0].length-1)
            var query = 'select pgvalue from pageobjinfo where pgname="'+ element.split('.')[1] +'" and pgkey = (SELECT  id from pageobjdir where pgkey = "'+element.split('.')[0] +'")'
            //var query =  'select pgvalue from pageobjdir d, pageobjinfo i WHERE d.pgkey= "' + element.split('.')[0] + '" and i.pgname ="' + element.split('.')[1] + '" and i.status = 0'
            return getFromDb(query,config).then(
              ($data) => {
                if(getType($data) === 'Array'){  
                    return $data[0]["pgvalue"]   
                }
            })
          }
          return '@'+alias_content[0].substring(1,alias_content[0].length-1)
        }
        else{ //正常返回
          return content
        }
    }
  })
 }

