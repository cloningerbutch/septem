const api = require('./apicall');
const log = require('debug')('septem:index');
const pug = require('pug');
const rc = require('rc');
const util = require('util');

const defconf = require('./defaultConfig');
rc('septem',defconf)

module.exports = function(opts){
    var conf = Object.assign({},defconf,opts);
    var display = Object.assign({},conf);
    if (display.uid) display.uid = '*******';
    if (display.pwd) display.pwd = '*******';
    log('conf %o',display)
    if (!conf.pwd) throw new Error('pwd must be defined');
    if (!conf.uid) throw new Error('uid must be defined');
    return {
        getCompany: function(companyName){
            //log('requesting data for %s',companyName);
            var parms = Object.assign({
                companyName: companyName
            },conf)
            //log('calling pug template with %o',parms);
            const fn = pug.compileFile('./resources/getCompanyInfo.pug')
            var reqxml = fn(parms);
            return api('getCompanyInfo',reqxml)
            .then(json => {
                var d = json.getCompanyInfoReturn[0].companyInfo[0]
                return require('./company')({
                    companyHandle: d.companyHandle[0],
                    name: d.name[0],
                    rootPath: d.rootPath[0],
                    expires: d.expires[0]    
                });
            })
        }
    }
}