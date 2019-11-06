const log = require('debug')('septem:apicall');
const Parser = require('xml2js');
const request = require('request-promise-native');
const util = require('util');

const defaultRequestOpts = {
    uri: 'https://s7sps1apissl.scene7.com/scene7/services/IpsApiService/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/soap+xml'
    }
}

module.exports = function(endpoint,xmlBody){
    var opts = Object.assign({},defaultRequestOpts);
    opts.uri += endpoint
    opts.body = xmlBody
    //log('using request options %o',opts);
    log('api call to %s',endpoint);
    return request(opts)
    .then(xml => {
        //log('raw %s',xml)
        const parser = util.promisify(Parser.parseString);
        return parser(xml)
        .then(json => {
            return json['soapenv:Envelope']['soapenv:Body'][0]
        })
    })
}