# septem

"Septem" is latin for seven, and this package is a thin wrapper around the Scene7 API.  Current implementation is limited to a few of the API calls, detailed below.  Over time, the endpoints supported will expand.

## Installation

This module is installed via npm

```javascript
npm install --save septem

```

## Quick Start

### Configuration

The tool is controlled via standard configuration options, using the [npm rc module](https://github.com/dominictarr/rc#readme).
See the rc docs for more details on options.

The [Scene7 API](https://marketing.adobe.com/resources/help/en_US/s7/ips_api/) requires several common parameters which
must be supplied by the user.
```javascript
{
  appName: "septem",
  appVersion: "defaults to current septem pkg version",
  uid: "insert_your_scene7_uid",
  pwd: "insert_your_scene7_pwd"
}
```

## Usage

**Note**: the initial require() returns a function, to which you can pass any options that are not defaulted or are not
handled in rc files.

**NOTE: It is not recommended to include authorization secrets in source code.**

```javascript
// Use defaults or config provided through rc
const septem = require('septem')();

// or override/supply your own...
const septem = require('septem')({
  appName: 'my app name'
  appVersion: '1.0.0'
});
```

### septem object

#### method: getCompany(companyName)

The Scene7 UI and API use a company context, and a user can be a member or 0 or more companies.  The name of the company (companyName) is the value that is in the drop-down box on the Scene7 UI.  Return value is an object reference to a company object that will be used for all further API calls.

```javascript
const septem = require('septem')();
const company = septem.getCompany('company_name')   // from the Scene7 UI company drop-down
```
### company object

#### method: getImageFormats()

This method returns an array of default image formats for the company.  Each element will have the following structure:

```javascript
{
  imageFormatHandle: 'i|012345|01234567',
  name: 'format_name',
  urlModifier: 'wid=400&hei=400'
}
```

#### method: findAssetsNameContains(prod)

This method returns an array of asset information, searching for any assets that CONTAIN the text in 'prod'.  Each element will have the following structure:

```javascript
{
  assetHandle: 'a|0123457890',
  filename: 'filename.png',
  createUser: '',
  lastModifyUser: '',
  type: 'Image',
  name: 'image_name',
  folder: 'companyName/folderName',
  folderHandle: 'f|cmp|fld',
  readyForPublish: 'true',
  trashState: 'NotInTrash',
  projects: '',
  ipsImageUrl: 'companyName/name',
  created: 'timestamp',
  lastModified: 'timestamp',
  imageInfo: {
    originalPath: 'companyName/_master_/012/',
    originalFile: '<uuid>.png',
    width: '2150',
    height: '2150',
    fileSize: '2873900',
    resolution: '300.0',
    sku: '',
    description: ''
  }
}
```

