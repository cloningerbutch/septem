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
must be supplied by the user.  Full configuration is shown here:

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

```javascript
const septem = require('septem')({
  appName: "my app name",
  appVersion: "1.0.0"
});
```
