// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cy-mobile-commands'

let $body = ""
let C_URL;
//userAgent 目前先这样加，后续可以配置在pluguins ，npm脚本执行是 --userAgent=XXX
function isUserAgentFunc(uaType){
    //IphoneX
    if(uaType === 4){
        cy.viewport('iphone-x')
        return {
          headers: {
            'user-agent': ' "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 Mobile/15B202 Safari/604.1"',
          }
        }
    }
    //XiaoMi8
    else if(uaType === 5){
        cy.viewport(360,640)
        return {
          headers: {
            'user-agent': ' "userAgent" : "Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; MI 8 Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/9.2 Mobile Safari/537.36"',
          }
        }
    }
    //AndroidMobileQB
    else if(uaType === 101){
        cy.viewport(360,640)
        return {
          headers: {
            'user-agent': ' "userAgent" : "Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; vivo X21A Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/9.9 Mobile Safari/537.36"',
          }
        }
    }
    //IOSMobileQB
    else if(uaType === 102){
        cy.viewport(360,640)
        return {
          headers: {
            'user-agent': ' "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 MQQBrowser/9.9.0 Mobile/15B202 Safari/604.1 QBWebViewUA/2 QBWebViewType/1 WKType/1"',
          }
        }
    }
    //AndroidMobileSgApp
    else if(uaType === 103){
        cy.viewport(360,640)
        return {
          headers: {
            'user-agent': ' "userAgent" : "Mozilla/5.0 (Linux; Android 8.1.0; vivo X21A Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) S3 Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36 SGInfo/1080/2280/3.0 SogouSearch Android1.0 version3.0 AppVersion/7301 NoHead"',
          }
        }
    }
    //IOSMobileSgAPP
    else if(uaType === 104){
        cy.viewport(360,640)
        return {
          headers: {
            'user-agent': ' "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202 SGInfo/1125/2436/3 Sogousearch/Ios/7.3.0 NoHead"',
          }
        }
    }
    //AndroidMobileUC
    else if(uaType === 105){
        cy.viewport(360,640)
        return {
          headers: {
            'user-agent': ' "userAgent" : "Mozilla/5.0 (Linux; U; Android 8.1.0; zh-CN; vivo X21A Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.7.6.1056 Mobile Safari/537.36"',
          }
        }
    }
    //IOSMobileUC
    else if(uaType === 106){
        cy.viewport(360,640)
        return {
          headers: {
            'user-agent': ' "userAgent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/15B202 UCBrowser/12.7.6.1251 Mobile  AliApp(TUnionSDK/0.1.20.3)"',
          }
        }
    }
    return {}
   
}

//执行嵌套递归的方法
function driverOpersFunc(casestep){
    for(var j=0;j < casestep.length; j++){
        uts[casestep[j]['operatinfo']](casestep[j])
    }
}

 var uts = {
/********************元素操作相关 35 个*************************************/

    clear : casestepinfo =>{ //清除输出框内容
        cy.task('isAlias',casestepinfo['elementname']).then( 
        ($data) => {
            if($body === ""){
                cy.get($data).clear().click({force: true})
            }else{
                cy.wrap($body).find($data).clear({ force: true }).click({ force: true })
            }
            //cy.wait(3000)
            cy.url().then(
                $url =>{
                console.log($url.split('/')[2] +  "  "  + C_URL.split('/')[2])
                   if($url.split('/')[2] !== C_URL.split('/')[2]){
                       $body = ""
                       C_URL = $url 
                   }else{
                       C_URL = $url
                   }  
                }
            )
            
        })
    },

    click : casestepinfo =>{//点击
        cy.task('isAlias',casestepinfo['elementname']).then( 
        ($data) => {
            if(parseInt(casestepinfo['browsertype']) === 1){
                if($body === ""){
                    cy.get($data).invoke('removeAttr', 'target').click({force:true,multiple:true})  
                }else{
                    cy.wrap($body).find($data).invoke('removeAttr', 'target').click({force:true,multiple:true}) 
                }
                cy.wait(5000)       
                cy.url().then(    
                    $url =>{
                       
                       if($url.split('/')[2] !== C_URL.split('/')[2]){
                           $body = ""
                           
                           if($url.search('graph.qq.com') === -1 && C_URL.search('graph.qq.com') === -1){
                                cy.openTab($url,{tab_name: $url})
                           }
                           C_URL = $url 
                          
                       }else{
                           C_URL = $url
                       }  
                    }
                )
               
                
            }else{ //手机
                if(Cypress.$($data).length > 1){
                    cy.get(Cypress.$($data)[0]).click({force:true})
                    cy.wait(3000)

                }else{
                    cy.get($data).click({force:true})
                    cy.wait(3000)
                }
            }
         
        })
    },

    //, isUserAgentFunc(casestepinfo['browsertype'])
    gourl : casestepinfo =>{//访问url
        cy.task('isAlias',casestepinfo['content']).then( 
            ($data) => {      
                return cy.visit($data).then(
                   data=>{
                    cy.url().then(
                        ($url) =>{
                            C_URL = $url
                        }
                    )
                   }
                )
            })
    },
   
    js_click : casestepinfo =>{ //js操作点击
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                if(parseInt(casestepinfo['browsertype']) === 1){
                    if($body === ""){
                        cy.get($data).invoke('removeAttr', 'target').click({force:true,multiple:true})  
                    }else{
                        cy.wrap($body).find($data).invoke('removeAttr', 'target').click({force:true,multiple:true}) 
                    }
                    cy.wait(5000)   
                    cy.url().then(    
                        $url =>{
                           console.log($url.split('/')[2] +  "  "  + C_URL.split('/')[2])
                           if($url.split('/')[2] !== C_URL.split('/')[2]){
                                $body = ""
                                if($url.search('graph.qq.com') === -1 && C_URL.search('graph.qq.com') === -1){
                                    cy.openTab($url,{tab_name: $url})
                                }
                                C_URL = $url 
                           }else{
                               C_URL = $url
                           }  
                        }
                    )
                }else{ //手机
                    if(Cypress.$($data).length > 1){
                        cy.get(Cypress.$($data)[0]).click({force:true})
                       
    
                    }else{
                        cy.get($data).click({force:true})
                        
                    }
                }
             
            })
    },

    get_current_url : casestepinfo =>{ // 获取当前页面URL   用别名
        return cy.url().as(casestepinfo["customizename"])
    },
  
    refresh_page : casestepinfo =>{ //刷新页面
        return cy.reload()
    },
  
    send_keys : casestepinfo =>{ //输入并回车
        let content = casestepinfo['content']
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($element) => {
                    cy.task('isAlias',casestepinfo['content']).then(
                        ($content) =>{
                            if($content[0] === '@'){
                                content = casestepinfo['content'].replace(/(\{.+?\})/g, $temp)
                            }
                            if($body === ""){
                                cy.get($element).clear({ force: true }).type(content,{force:true})
                            }else{
                                return cy.wrap($body).find($element).clear({ force: true }).type(content,{force:true})
                            }
                            
                        })
            })
        
    },
   
    get_attribute : casestepinfo =>{ //获取元素指定属性内容
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                let attr = Cypress.$($data).attr(casestepinfo['elementkey'])
                cy.get($data).invoke('attr',casestepinfo['elementkey'])
                return cy.wrap(attr).as(casestepinfo['customizename'])
            })
    },
   
    get_cssvalue : casestepinfo =>{ //get_cssvalue -- 获取元素指定css内容
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                let css = Cypress.$($data).css(casestepinfo['elementkey'])
                return cy.wrap(css).as(casestepinfo['customizename'])
            })
    },

    get_text : casestepinfo =>{ //获取元素text内容
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                
               cy.get($data).then(($selector)=>{
                    //wrap 和 as 一起用定义变量别名 
                    //不知道为什么得到的selector 使jquery对象，先这样使用，后面优化
                    // 0: jQuery.fn.init [li.rl-normal, selector: li.rl-normal]
                    // length: 1
                    // selector: ""
                    // __proto__: Object(0)
                    if(getType($selector[0]) === 'Object'){ 
                        return cy.wrap($selector[0][0].innerText).as(casestepinfo['customizename'])
                     }
                    else{
                        return cy.get($data).invoke('text').as(casestepinfo['customizename'])//不可行
                    }
                })
                
            })
    },

    mouse_hover : casestepinfo =>{//鼠标悬浮
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                return cy.get($data).trigger('mouseover',{force:true})
            })
       
    },

    mouse_right_click : casestepinfo =>{//鼠标右击
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                return cy.get($data).rightclick({force:true})
            })
    },

    switch_to_frame: casestepinfo => {//切换ifame
        cy.getIframeBody(casestepinfo['content']).then(
            ($iframe)=>{
                   if($body === ""){
                    cy.get($iframe.contents().find('body')).then(
                        (value) =>{
                            $body = value
                        }
                    )
                   // $body = $iframe.contents().find('body')
                   }else{
                        cy.wrap($body).find('iframe').its('0.contentDocument.body').then(
                            (value) =>{
                                $body = value
                            }

                        )
                   }
            })
        
    },

    switch_to_window : casestepinfo =>{  //切换浏览器窗口 这个有点难
        return cy.wait(6000)
        
    },

    
    delete_all_cookies: casestepinfo =>{//删除当前所有cookie
        return cy.clearCookies()
    },

    get_cookies : casestepinfo => { //获取当前域下cookie
        return cy.getCookies().should((cookies)=>{
            cy.getCookies().as('cookie')
           
        })
    },
    
    add_cookie : casestepinfo => { //主动添加cookie
        let cookielist = casestepinfo['content'].substring(1,casestepinfo['content'].length -1).split(';')
        for(let j=0;j<cookielist.length;j++){
            let key_value = cookielist[j].replace(/^\s*|\s*$/g,"").split('=')
            cy.setCookie(key_value[0],key_value[1])
        }
      
    },
    
    pagescrollBottom : casestepinfo => { //页面置底
        return cy.scrollTo('bottom')
    },

    pagescrollTop : casestepinfo =>{ //页面置顶
        return cy.scrollTo('top')
    },

    send_and_enter : casestepinfo => {//输入并回车
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                cy.task('isAlias',casestepinfo['content']).then(
                    ($data1) =>{
                        if($data1[0] === '@'){
                            cy.get($data1).then(
                                ($temp) =>{
                                    return cy.get($data).type(casestepinfo['content'].replace(/(\{.+?\})/g, $temp) + '{enter}')
                      
                            })
                        }
                        else{
                            return cy.get($data).type(casestepinfo['content'] + '{enter}')
                        }
                        
                    })
            })
    },
   
    page_back : casestepinfo=>{ //后退
        return cy.go('back')
    },
   
    scroll_one_screen : casestepinfo =>{  //滑到底部 还要看一下wap
        return cy.scrollTo('0', '100%')
    },
    
    scroll_to_center : casestepinfo =>{ //滚动到中间
        return cy.scrollTo('center')
    },
    
    accept_alert : casestepinfo =>{ //确认弹出alert框
        return
     },
 
    dismiss_alert: casestepinfo =>{ //取消弹出的alert框
         return
    },
       
    slide_left: casestepinfo =>{//向左滑动
        cy.scrollTo(casestepinfo['elementname'])
    },

    switch_default_frame : casestepinfo =>{//切换回主ifame
        return
    },

    switch_parent_frame : casestepinfo =>{ //切换到上一级的ifame
        return
    },
 
    get_title : casestepinfo =>{//获取标题
        return cy.title().as(casestepinfo['customizename'])
    },

    send_keys_as_list: casestepinfo =>{//向表单元素输入指定内容，但是一个一个字输入
        let content =casestepinfo['content']
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($element) => {
                cy.task('isAlias',casestepinfo['content']).then(
                    ($data1) =>{
                        if($data1[0] === '@'){
                            cy.get($data1).then(
                                ($temp) =>{
                                    content = casestepinfo['content'].replace(/(\{.+?\})/g, $temp)
                                    //return cy.get($data).type(casestepinfo['content'].replace(/(\{.+?\})/g, $temp))
                            })
                        }
                    })
                if($body === ""){
                    cy.get($element).clear().type(content,{ force: true ,delay: 100})
                }else{
                    cy.wrap($body).find($element).clear().type(content,{ force: true ,delay: 100})
                }
            })
        
    },

    execute_js : casestepinfo =>{ //执行给定的js语句
        return  
       
    },

    select_by_index : casestepinfo => { //下拉列表选择-位置
        return cy.get(casestepinfo).select()
    },

    select_by_text : casestepinfo => { //下拉列表选择-内容
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($element) => {
                cy.get($element).select(casestepinfo['content'],{force:true})
            }
        )
    },

    select_by_value : casestepinfo =>{ //下拉列表选择-值
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($element) => {
                cy.get($element).select(casestepinfo['content'],{force:true})
            }
        )
    },

    press_key : casestepinfo =>{ //无需实现
        return
    },
    
 /*************************校验相关的 32 个 ******************************************/
    wait_for_element_exist : casestepinfo =>{ //校验
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                if($body === ""){
                    cy.get($data).should('exist') }
                else{
                    cy.wrap($body).find($data).should('exist') 
                }
               
                return driverOpersFunc(casestepinfo['driverOpers'])
                     
            })
    },
    

    //无需实现
    verify_alert_is_not_present : casestepinfo =>{ //有即失败,没有即通过
        return
    },
    
    verify_element_exists : casestepinfo =>{ //校验指定元素是否存在
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                    if( casestepinfo['driverOpers'].length > 0){
                    
                        if(Cypress.$($data).length=== 0){
                            return
                        }
                        else{
                            return driverOpersFunc(casestepinfo['driverOpers'])   
                        }

                    }
                    if($body === ""){
                        return cy.get($data).should('exist')
                       
                    }
                    else{
                        return cy.wrap($body).find($data).should('exist') 
                        //return cy.wrap($body).find($data).should('be.visible') 
                    }
                        
                                
                
            })
    },
 
    verify_not_element_exists : casestepinfo=>{ //校验指定元素是否存在
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                if( casestepinfo['driverOpers'].length > 0){
                    if(Cypress.$($data).length > 0){
                        return driverOpersFunc(casestepinfo['driverOpers']) 
                    }
                    else{
                        return
                    }

                }
                if($body === ""){
                    return cy.get($data).should('not.exist')
                   
                }
                else{
                    return cy.wrap($body).find($data).should('not.exist') 
                    //return cy.wrap($body).find($data).should('be.visible') 
                }    
               
            })
        
    },
    verify_is_enabled : casestepinfo =>{//指定元素是否启用状态
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                if(casestepinfo['driverOpers'].length > 0){
                    if(! Cypress.$($data).is(":disabled")){
                        return driverOpersFunc(casestepinfo['driverOpers'])  
                    }
                    return
                }
                cy.get($data).should('not.be.disabled') 
            })
    },
    verify_is_not_enabled : casestepinfo =>{//指定元素是否启用状态
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                if(casestepinfo['driverOpers'].length > 0){
                    if(Cypress.$($data).is(":disabled")){
                        return driverOpersFunc(casestepinfo['driverOpers'])  
                    }
                    return
                }
                cy.get($data).should('be.disabled')
                   
            })
    },
   
    verify_is_visible : casestepinfo =>{ //元素是否可见
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                let is_visible = Cypress.$($data).is(":visible")
                if(casestepinfo['driverOpers'].length > 0){
                    if(Cypress.$($data).is(":visible")){
                        return driverOpersFunc(casestepinfo['driverOpers'])  
                    }
                    return
                }
                cy.wrap(is_visible).should('eq',true)         
            })
    },
    verify_is_not_visible : casestepinfo =>{//元素是否不可见
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                let is_visible = Cypress.$($data).is(":visible")
                if(casestepinfo['driverOpers'].length > 0){
                    if(!Cypress.$($data).is(":visible")){
                        return driverOpersFunc(casestepinfo['driverOpers'])  
                    }
                    return
                }
                //cy.get($data).should('not.be.visible')
               cy.wrap(is_visible).should('eq',false)      
            })
    },

    
     verify_is_selected : casestepinfo =>{ //元素是否选中状态
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                if(casestepinfo['driverOpers'].length > 0){
                    if(Cypress.$($data).is(":selected")){
                        return driverOpersFunc(casestepinfo['driverOpers'])  
                    }
                    return
                }
                cy.get($data).should('be.selected')    
               
            })
    },
       
    verify_is_not_selected : casestepinfo =>{//元素是否未选中状态
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                if(casestepinfo['driverOpers'].length > 0){
                    if(!Cypress.$($data).is(":selected")){
                        return driverOpersFunc(casestepinfo['driverOpers'])  
                    }
                    return
                }
                cy.get($data).should('not.be.selected')       
            })
    },

    verify_text : casestepinfo =>{ //校验页面里是否包含该值
        let content
        let text 
        cy.get('html').then(
            ($pagehtml)=>{  
                try{
                    text = $pagehtml[0][0].innerHTML
                   
                }catch{
                    text = $pagehtml[0].innerHTML
                }   
            }
        ).then(
            ()=>{
                cy.task('isAlias',casestepinfo['content']).then(
                    ($content) => {
                        content =$content
                        if($content[0] === '@'){
                            cy.get($content).then(
                                ($temp) =>{//替换别名
                                    content = casestepinfo['content'].replace(/(\{.+?\})/g, $temp)
                            })
                        }       
                            
                    }).then(
                        ()=>{
                            if(casestepinfo['driverOpers'].length > 0){
                                if(text.search(content) != -1){
                                    return driverOpersFunc(casestepinfo['driverOpers'])      
                                }
                                
                            }else{
                                cy.wrap(text).should('contain',content) //都可以
                                
                            }
                        }
                    )
            }
        )
 
        
    },

    verify_text_in_element : casestepinfo =>{//校验指定元素的text:全部写为包含关系比较兼容多种情况
        let content;
        let element_text;
        cy.task('isAlias',casestepinfo['elementname']).then(   
            ($element) => {
                element_text = Cypress.$($element).text()

                cy.task('isAlias',casestepinfo['content']).then(
                    ($content) =>{
                       content =$content
                        if($content[0] === '@'){//别名
                            cy.get($content).then(
                                ($temp) =>{
                                    content = casestepinfo['content'].replace(/(\{.+?\})/g, $temp)
                            })
                        }
                }).then(
                    ()=>{
                        content = content.replace(/\s*/g,"")
                        element_text = element_text.replace(/\s*/g,"")
                        if(casestepinfo['driverOpers'].length > 0){
                            if(element_text.includes(content)){
                                return driverOpersFunc(casestepinfo['driverOpers']) 
                            }
                        }else{
                            return cy.wrap(element_text).should('contain', content)
                        }
                })
        })
    },

    wait_for_element_not_exist : casestepinfo =>{ //指定时间内元素是否不存在
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                cy.task('isAlias',casestepinfo['elementname']).then( 
                    ($data) => {
                            if( casestepinfo['driverOpers'].length > 0){
                            
                                if(Cypress.$($data).length=== 0){
                                    return
                                }
                                else{
                                    return driverOpersFunc(casestepinfo['driverOpers'])   
                                }
        
                            }
                            if($body === ""){
                                return cy.get($data).should('not.exist')
                               
                            }
                            else{
                                return cy.wrap($body).find($data).should('not.exist') 
                                //return cy.wrap($body).find($data).should('be.visible') 
                            }
                                
                                        
                        
                    })
            })
    },
 
    verify_getAttribute : casestepinfo =>{//校验指定的元素的属性是否和要判断的相等
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                let attr = Cypress.$($data).attr(casestepinfo['elementkey'])
                if( casestepinfo['driverOpers'].length > 0){
                    if(parseInt(casestepinfo['checktypeid']) === 1){
                        if(attr === casestepinfo['content']){
                            return driverOpersFunc(casestepinfo['driverOpers'])   
                        }
                    }
                    else if(parseInt(casestepinfo['checktypeid']) === 2){
                        if(attr.search(casestepinfo['content']) != -1){
                            return driverOpersFunc(casestepinfo['driverOpers'])   
                        }
                    }
                    return
                }
                if(parseInt(casestepinfo['checktypeid']) === 1){
                    cy.wrap(attr).should('eq', casestepinfo['content'])  
                }
                else if(parseInt(casestepinfo['checktypeid']) === 2){
                    cy.wrap(attr).should('contain', casestepinfo['content'])  
                }
                
            })
    },


    verify_getAttriCss : casestepinfo =>{//校验指定的元素的css属性是否和要判断的相等
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                let css = Cypress.$($data).css(casestepinfo['elementkey'])
                if( casestepinfo['driverOpers'].length > 0){
                    if(css === casestepinfo['content']){
                        return driverOpersFunc(casestepinfo['driverOpers'])   
                    }
                    return
                }
                // cy.log("attr" + attr)
                cy.wrap(css).should('eq', casestepinfo['content'])  
            })
    },
    
    verify_geturl : casestepinfo =>{  //判断当前url是否正确
        casestepinfo['content'] = casestepinfo['content'].trim()
        if(casestepinfo["checktypeid"] === '1'){
            if( casestepinfo['driverOpers'].length > 0){
                cy.url(
                    ($url1)=>{
                        if($url1 === casestepinfo["content"]){
                            return driverOpersFunc(casestepinfo['driverOpers'])
                        }
                        return
                    }
                )
            }
            cy.url().should('eq',casestepinfo["content"])
        }
        else if(casestepinfo["checktypeid"] === '2'){
            if( casestepinfo['driverOpers'].length > 0){
                cy.url(
                    ($url1)=>{
                        if($url1.search(casestepinfo["content"]) != -1){
                            return driverOpersFunc(casestepinfo['driverOpers'])
                        }
                        return
                    }
                )
            }
            cy.url().should('contain',casestepinfo["content"])
        }
    },
  
    verify_lenelements : casestepinfo =>{   //校验elements的列表长度
        // 0 =:校验俩值是否相等。 即预期结果和元素的实际长度是否相等. 

        // 1 >: 预期结果是否 大于 要校验元素的长度 
    
        // 2 >=: 预期结果是否 大于等于 要校验元素的长度 
    
        // 3 《: 预期结果是否 小于 要校验元素的长度 
    
        // 4 <=: 预期结果是否 小于等于 要校验元素的长度 
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                cy.get($data).then((result)=>{
                    if(result.length === 1){
                        var size = result[0].length
                    }else{
                        var size = result.length
                    }
                   
                    if(casestepinfo['checktypeid'] === '0'){
                        if(casestepinfo['driverOpers'].length >0){
                            if(parseInt(casestepinfo['content']) === size){
                                return driverOpersFunc(casestepinfo['driverOpers'])      
                            }
                            return
                        }
                        expect(parseInt(casestepinfo['content'])).to.eq(size)
                    }
                    else if(casestepinfo['checktypeid'] === '1'){
                        if(casestepinfo['driverOpers'].length >0){
                            if(parseInt(casestepinfo['content']) > size){
                                return driverOpersFunc(casestepinfo['driverOpers'])      
                            }
                            return
                        }
                        expect(parseInt(casestepinfo['content'])).to.gt(size)
                    }
                    else if(casestepinfo['checktypeid'] === '2'){
                        if(casestepinfo['driverOpers'].length >0){
                            if(parseInt(casestepinfo['content']) >= size){
                                return driverOpersFunc(casestepinfo['driverOpers'])      
                            }
                            return
                        }
                        expect(parseInt(casestepinfo['content'])).to.gte(size)
                    }
                    else if(casestepinfo['checktypeid'] === '3'){
                        if(casestepinfo['driverOpers'].length >0){
                            if(parseInt(casestepinfo['content']) < size){
                                return driverOpersFunc(casestepinfo['driverOpers'])      
                            }
                            return
                        }
                        expect(parseInt(casestepinfo['content'])).to.lt(size)
                    }
                    else if(casestepinfo['checktypeid'] === '4'){
                        if(casestepinfo['driverOpers'].length >0){
                            if(parseInt(casestepinfo['content']) <= size){
                                return driverOpersFunc(casestepinfo['driverOpers'])      
                            }
                            return
                        }
                        expect(parseInt(casestepinfo['content'])).to.lte(size)
                    }
                   
             
                })  
                 
            })
            
    },

    verstr_notempty : casestepinfo =>{//校验内容不为空
        cy.task('isAlias',casestepinfo['content']).then( 
            ($data) => {
                if(casestepinfo['driverOpers'].length >0){
                    cy.get($data).then(
                        ($el)=>{
                            if($el !== null || $el !== undefined || $el !== ''){
                                return driverOpersFunc(casestepinfo['driverOpers'])  
                            }
                            return
                        }
                    )
                }
                cy.get($data).should('not.be.empty')   
            })
    },
  
    verstr_isempty : casestepinfo =>{  //校验内容为空
        cy.task('isAlias',casestepinfo['content']).then( 
            ($data) => {
                if(casestepinfo['driverOpers'].length >0){
                    cy.get($data).then(
                        ($el)=>{
                            if($el === null || $el === undefined || $el === ''){
                                return driverOpersFunc(casestepinfo['driverOpers'])  
                            }
                            return
                        }
                    )
                }
                cy.get($data).should('be.empty')
              
            })
    },
  
    verstr_isequals : casestepinfo =>{    //对俩值进行比较
        let content;
        let expectcontent;
        casestepinfo['content'] = casestepinfo['content'].replace(/\s*/g,"")
        casestepinfo['expectcontent'] = casestepinfo['expectcontent'].replace(/\s*/g,"")
        cy.task('isAlias',casestepinfo['content']).then( 
            ($content) => { 
                content = $content
                if($content[0] === '@'){
                    cy.get($content).then(
                        ($temp1)=>{
                            $temp1 = $temp1.replace(/\s*/g,"")
                            content = casestepinfo['content'].replace(/(\{.+?\})/g, $temp1)
                        }
                    )
                }
            }).then(
                    ()=>{
                        
                        cy.task('isAlias',casestepinfo['expectcontent']).then( 
                            
                            ($expectcontent) => {
                                expectcontent = $expectcontent
                                if($expectcontent[0] === '@'){
                                    cy.get($expectcontent).then(
                                        ($temp2)=>{
                                            $temp2 = $temp2.replace(/\s*/g,"")
                                            expectcontent = casestepinfo['expectcontent'].replace(/(\{.+?\})/g, $temp2)
                                    
                                    }).then(
                                        ()=>{
                                            is_equal(casestepinfo,content,expectcontent)

                                        }
                                    )
                                }else{
                                    is_equal(casestepinfo,content,expectcontent)
                                }
                         
                            })
                    }
                )
    },
   
    verstr_isnoequals : casestepinfo =>{   //对俩值进行比较

        let content;
        let expectcontent;
        casestepinfo['content'] = casestepinfo['content'].replace(/\s*/g,"")
        casestepinfo['expectcontent'] = casestepinfo['expectcontent'].replace(/\s*/g,"")
        cy.task('isAlias',casestepinfo['content']).then( 
            ($content) => { 
                content = $content
                if($content[0] === '@'){
                    cy.get($content).then(
                        ($temp1)=>{
                            $temp1 = $temp1.replace(/\s*/g,"")
                            content = casestepinfo['content'].replace(/(\{.+?\})/g, $temp1)
                        }
                    )
                }
            }).then(
                    ()=>{
                        
                        cy.task('isAlias',casestepinfo['expectcontent']).then( 
                            
                            ($expectcontent) => {
                                expectcontent = $expectcontent
                                if($expectcontent[0] === '@'){
                                    cy.get($expectcontent).then(
                                        ($temp2)=>{
                                            $temp2 = $temp2.replace(/\s*/g,"")
                                            expectcontent = casestepinfo['expectcontent'].replace(/(\{.+?\})/g, $temp2)
                                    
                                    }).then(
                                        ()=>{
                                            is_no_equal(casestepinfo,content,expectcontent)

                                        }
                                    )
                                }else{
                                    is_no_equal(casestepinfo,content,expectcontent)
                                }
                         
                            })
                    }
                )
    },
    
    verstr_numbercompare : casestepinfo =>{//数字比较
        // 0 :校验 内容=预期值
        // 1 :校验 内容>预期值 
        // 2 :校验 内容>=预期值  
        // 3 :校验 内容< 预期值  
        // 4 :校验 内容<= 预期值
        let content;
        let expectcontent;
        casestepinfo['content'] = casestepinfo['content'].replace(/\s*/g,"")
        casestepinfo['expectcontent'] = casestepinfo['expectcontent'].replace(/\s*/g,"")
        cy.task('isAlias',casestepinfo['content']).then( 
            ($content) => { 
                content = $content
                if($content[0] === '@'){
                    cy.get($content).then(
                        ($temp1)=>{
                            $temp1 = $temp1.replace(/\s*/g,"")
                            content = casestepinfo['content'].replace(/(\{.+?\})/g, $temp1)
                        }
                    )
                }
            }).then(
                    ()=>{
                        cy.task('isAlias',casestepinfo['expectcontent']).then(  
                            ($expectcontent) => {
                                expectcontent = $expectcontent
                                if($expectcontent[0] === '@'){
                                    cy.get($expectcontent).then(
                                        ($temp2)=>{
                                            $temp2 = $temp2.replace(/\s*/g,"")
                                            expectcontent = casestepinfo['expectcontent'].replace(/(\{.+?\})/g, $temp2)
                                    
                                    }).then(
                                        ()=>{
                                            is_num_equal(casestepinfo,content,expectcontent)
                                        }
                                    )
                                }
                                is_num_equal(casestepinfo,content,expectcontent)
                            })
                        })

    },
    
    verify_alert_is_present : casestepinfo =>{//校验有没有alert弹框
        return
    },
    
    verify_nogetAttribute : casestepinfo =>{//校验指定的元素的属性,要判断的不相或不包含
        return
    },
    
    verify_nogetAttriCss : casestepinfo =>{//校验指定的元素的css属性和要判断的不相等
        return
    },
    
    verstr_deadChain : casestepinfo =>{//验证url是否可访问
        return
    },

    verify_cookie_value : casestepinfo =>{ //无需实现
        return 
    },

    verify_cookie_exists : casestepinfo =>{ //无需实现
        return 
    },
    wait_for_element_not_visible : casestepinfo =>{ //无需实现
        return 
    },
    wait_for_element_enabled  : casestepinfo =>{ //无需实现
        return 
    },
    wait_for_element_visible : casestepinfo =>{ //无需实现
        return 
    },
    verify_response_status_code : casestepinfo =>{ //无需实现
        return 
    },

 /***********************代码相关的 9 个*********************************/   
   
    forelements : casestepinfo =>{ //for循环
        cy.task('isAlias',casestepinfo['elementname']).then( 
            ($data) => {
                if(! isNaN(Number($data))){
                    for(var i =0;i< parseInt($data);i++){
                        driverOpersFunc(casestepinfo['driverOpers']) 
                    }
                }else{
                    return cy.get($data).then((result)=>{
                        //如果结束长>实际长度;则循环的结束长度为实际长度
                        //如果想直接默认循环所有的内容.结束长度就输入0
                        var endleng = parseInt(casestepinfo['endleng'])
                      
                        if (endleng > result[0].length || endleng === 0)
                        {
                            endleng = result[0].length
                        }
                   
                        for(var i=parseInt(casestepinfo['startleng'])-1;i < endleng;i++){
                            cy.get(result[0][i]).as(casestepinfo['customizename'])
                            //这里方法统一提出去
                            driverOpersFunc(casestepinfo['driverOpers']) 
                        }
                      
                    })
                }
           
            })   
    },
    
    stepinfo : casestepinfo =>{//记录操作日志
        
        return
    },

    stepthrow : casestepinfo =>{//主动上报异常
        return 
    },
    
    store :casestepinfo =>{//永久存放内容
        return 
    },
    waittime : casestepinfo =>{  //cypress 自带等待机制，不需要wait,可以在提前配置好固定等待时间
        //return cy.wait(1000)
        return cy.wait(casestepinfo["timenum"]*1000)
    },
    capture :casestepinfo =>{ //截图
        return
    },
    exit : casestepinfo => {//结束脚本
    /**没有找到什么好的方法
     * 写了fail事件，抓取skip使用fail,触发后默认case通过
     */
       cy.log("提前结束").then( 
           ()=>{
                this.skip()
           }
       ) 
    },
    actioncase : casestepinfo =>{//执行对应的caseid
        var query = 'select * from caseinfo where id= ' + casestepinfo['content']//77js_click 有问题 1919 exe_js 1620 get_title 943 verstr_isnoequals  1261 refresh 694 send_keys 232 get_text switch_to_window 258 mouse_over 1840 get_cookies 1848 后退
        let caseinfo;
        return cy.task('queryDb',query).then( //闭包赋值
            ($data) => {
                caseinfo = $data[0]  //数据库读取case信息
                var casestep = JSON.parse(caseinfo['casestep'])
                for (var i=0; i<casestep.length ;i++){
                    casestep[i]['browsertype'] = caseinfo['browsertype']
            
                    uts[casestep[i]['operatinfo']](casestep[i])
                    // if(casestep[i]['driverOpers'].length > 0) 
                    //     i = i + casestep[i]['driverOpers'].length
                }
            }) 
    },
    random : casestepinfo =>{//生成指定随机数
        let max = casestepinfo['endleng']
        let min = casestepinfo['startleng']

        return cy.wrap(Math.ceil(Math.random() * (max - min))).as(casestepinfo['customizename'])
        
    },

/***********************标志的 无需映射*********************************/    

    endfor : casestepinfo =>{ //for循环结束
        return
    },
    endif : casestepinfo =>{ //if条件结束
        return 
    },
    split_case :(caseinfo,casestep, stepnum)=>{
        for(let k=stepnum;k< casestep.length;k++){
            casestep[k]['browsertype'] = caseinfo['browsertype']
          
            uts[casestep[k]['operatinfo']](casestep[k])
            // if(casestep[k]['driverOpers'].length > 0) {
            //     k = k + casestep[k]['driverOpers'].length
            // }
            
        }
    }

}

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8,-1);
  }

  function is_no_equal(casestepinfo,content,expectcontent){
    if(casestepinfo['driverOpers'].length > 0){
        if(casestepinfo["checktypeid"] === '2'){ //包含
            if(content.search(expectcontent) == -1){ //包含
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
        }
        else if(casestepinfo["checktypeid"] === '1'){ //等于
            if(content !== expectcontent){
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
        }
    
    }
    else{
        if(casestepinfo["checktypeid"] === '1'){ //等于
            cy.wrap(content).should('eq',expectcontent)
        }
        else if(casestepinfo["checktypeid"] === '2'){ //包含
            cy.wrap(content).should('include',expectcontent)
        }
    } 
}
function is_equal(casestepinfo,content,expectcontent){
    if(casestepinfo['driverOpers'].length > 0){
        if(casestepinfo["checktypeid"] === '2'){ //包含
            if(content.search(expectcontent) != -1){ //包含
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
        }
        else if(casestepinfo["checktypeid"] === '1'){ //等于
            if(content === expectcontent){
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
        }
    
    }
    else{
        if(casestepinfo["checktypeid"] === '1'){ //等于
            cy.wrap(content).should('eq',expectcontent)
        }
        else if(casestepinfo["checktypeid"] === '2'){ //包含
            cy.wrap(content).should('include',expectcontent)
        }
    } 
}
function is_num_equal(casestepinfo,content,expectcontent){
    if(casestepinfo['checktypeid'] === '0'){
        if(casestepinfo['driverOpers'].length > 0){
            if(parseInt(content) === parseInt(expectcontent)){ 
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
            return     
        }
        expect(parseInt(content)).to.eq(parseInt(expectcontent))
    }
    else if(casestepinfo['checktypeid'] === '1'){
        if(casestepinfo['driverOpers'].length > 0){
            if(parseInt(content) >  parseInt(expectcontent)){ 
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
            return     
        }
        expect(parseInt(casestepinfo['content'])).to.gt(parseInt(expectcontent))
    }
    else if(casestepinfo['checktypeid'] === '2'){
        if(casestepinfo['driverOpers'].length > 0){
            if(parseInt(content) >=  parseInt(expectcontent)){ 
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
            return     
        }
        expect(parseInt(casestepinfo['content'])).to.gte(parseInt(expectcontent))
    }
    else if(casestepinfo['checktypeid'] === '3'){
        if(casestepinfo['driverOpers'].length > 0){
            if(parseInt(content) <  parseInt(expectcontent)){ 
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
            return     
        }
        expect(parseInt(casestepinfo['content'])).to.lt(parseInt(expectcontent))
    }
    else if(casestepinfo['checktypeid'] === '4'){
        if(casestepinfo['driverOpers'].length > 0){
            if(parseInt(content) <=  parseInt(expectcontent)){ 
                return driverOpersFunc(casestepinfo['driverOpers'])  
            }
            return     
        }
        expect(parseInt(casestepinfo['content'])).to.lte(parseInt(expectcontent))
    }
}

module.exports = uts;