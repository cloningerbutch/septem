const log = require('debug')('septem:harness');

log('starting');
const septem = require('./index')();

const local = {}

septem.getCompany('VFDev')
.then(company => {
    local.company = company
    return company.getImageFormats()
})
.then(imgFormats => {
    log('found %d image formats',imgFormats.length)
    console.log(imgFormats);
    return local.company.findAssetsNameContains('A1MF')
    //return local.company.findAssetsNameContains('detail')
})
.then(assets => {
    log('found %d assets',assets.length)
    console.log(assets[0])
})