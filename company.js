const api = require('./apicall');
const log = require('debug')('septem:company');
const conf = require('./defaultConfig');
const pug = require('pug')

module.exports = function(companyInfo){
    log('initializing with %o',companyInfo);
    var imageFormats = null;
    return {
        getImageFormats: function(){
            if (!imageFormats){
                imageFormats = [];
                var parms = Object.assign({
                    hCompany: companyInfo.companyHandle
                },conf)
                //log('calling pug template with %o',parms);
                const fn = pug.compileFile(__dirname + '/resources/getImageFormats.pug')
                var reqxml = fn(parms);
                return api('getImageFormats',reqxml)
                .then(imgFormats => {
                    var arr = imgFormats.getImageFormatsReturn[0].imageFormatArray[0].items
                    //console.log(JSON.stringify(arr,null,2));
                    arr.forEach(item => {
                        imageFormats.push({
                            imageFormatHandle: item.imageFormatHandle[0],
                            name: item.name[0],
                            urlModifier: item.urlModifier[0]
                        })
                    })
                    return imageFormats
                })
            }
            else {
                return Promise.resolve(imageFormats);
            }
        },
        findAssetsNameContains: function(prod){
            var parms = Object.assign({
                hCompany: companyInfo.companyHandle,
                prod: prod
            },conf)
            //log('calling pug template with %o',parms);
            const fn = pug.compileFile(__dirname + '/resources/searchNameContains.pug')
            var reqxml = fn(parms);
            //console.log(reqxml);
            const local = {};
            return api('searchAssetsByMetadata',reqxml)
            .then(jsonAssets => {
                //console.log(JSON.stringify(jsonAssets,null,2))
                var arr = jsonAssets.searchAssetsByMetadataReturn[0].assetSummaryArray[0].items
                var assets = [];
                arr.forEach(item => {
                    //console.log(item);
                    assets.push({
                        assetHandle: item.assetHandle[0],
                        filename: (item.filename != null) ? item.filename[0] : null,
                        createUser: item.createUser[0],
                        lastModifyUser: item.lastModifyUser[0]
                    })
                })
                local.assets = assets;
                var handles = [];
                local.assets.forEach(asset => {
                    handles.push(asset.assetHandle)
                })
                //log(handles)
                var parms = Object.assign({
                    hCompany: companyInfo.companyHandle,
                    assetHandles: handles
                },conf)
                const fn = pug.compileFile(__dirname + '/resources/getAssets.pug')
                var reqxml = fn(parms);
                return api('getAssets',reqxml)
            })
            .then(json => {
                //console.log(JSON.stringify(json,null,2))
                var arr = json.getAssetsReturn[0].assetArray[0].items;
                arr.forEach(item => {
                    var curr = local.assets.find(elem => {return elem.assetHandle == item.assetHandle})
                    if (curr){
                        Object.assign(curr,{
                            type: item.type[0],
                            name: item.name[0],
                            folder: item.folder[0],
                            folderHandle: item.folderHandle[0],
                            readyForPublish: item.readyForPublish[0],
                            trashState: item.trashState[0],
                            projects: item.projects[0],
                            ipsImageUrl: item.ipsImageUrl[0],
                            created: item.created[0],
                            lastModified: item.lastModified[0]
                        })
                        var imginfo = item.imageInfo[0]
                        curr.imageInfo = {
                            originalPath: imginfo.originalPath[0],
                            originalFile: imginfo.originalFile[0],
                            width: imginfo.width[0],
                            height: imginfo.height[0],
                            fileSize: imginfo.fileSize[0],
                            resolution: imginfo.resolution[0],
                            sku: imginfo.sku[0],
                            description: imginfo.description[0],
                        }
                    }
                })
            })
            .then(_ => {
                return local.assets
            })
    }
    }
}