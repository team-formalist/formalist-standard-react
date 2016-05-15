# Formalist Standard React

## CSS

Assumes you’re using a global `reset` like [Eric Meyer’s 2.0 version](http://meyerweb.com/eric/tools/css/reset/).

The CSS in this project is required to be compiled as [CSS Modules](https://github.com/css-modules/css-modules). It makes no opinions about the compilation of your CSS apart from that, so you can configure your build tool of choice as you like.

## Testing

```
npm run test
```

Tests are compiled on the fly from `./test` and piped through `tape`.

Note: CSS references are transformed into CSS Modules for testing using `babel-plugin-css-modules-transform` so we can test things properly. The CSS itself isn’t generated — it just disppears into the ether.

# Components

## multi-upload-field

Here are the potential props we can have for the `multi-upload-field`.

| Prop name              | Type   | Required | Example                                                                   | Default             | Description              |
| :----------------------|:------:| :-------:| :------------------------------------------------------------------------ | :-------------------| :------------------------|
| **label**               | String | `false`  | `label: 'Drop/Upload Files'`                                              | Drop/Upload File(s) | Field label and button text |
| **presign_url**          | String | `true`   | `presign_url: 'http://url_to/presign'`                    |                     | URL to XHR `presign`. `presign` should return `url`, `expiration`, `hmac` and `uuid` to perform upload. |
| **token**                | String | `false`  | `token: 'XYZ'`                                                            | `null`              | optional csrf-token |
| **multiple**             | Bool   | `false`  | `multiple: false`                                                         | `true`              | Differentiate between multiple or singular uploads |
| **permittedFileTypeRegex**        | Regex  | `false`  | `fileTypeRegex: /image\/(`jpg`)$/`                       | `null`              | Provide an explicit file type validation rule |
| **permittedFileTypeMessage** | String | `false`  | `fileTypeRegexMessage: 'Supported image formats are JPEG, PNG, and GIF.'` | `null`              | Supporting validation message for the `fileTypeRegex` prop |
| **maxFileSize**          | Number | `false`  | `maxFileSize: 5000000`                                                    | `null`              | Provide an explicit maximum file size validation rule |
| **maxFileSizeMessage**   | String | `false`  | `maxFileSizeMessage: 'The file you tried to upload exceed our limit (5MB)'` | `null`              | Supporting validation message for the `maxFileSize` prop |
| **buttonText**           | String | `false`  | `buttonText: 'Upload file'`                                               | Fallback to `label`, otherwise 'Drop/Upload File(s)' | Provide custom button text |

##### uploadedFiles

This is the current expected format for passing in existing files.

```js
[
  {
    name: 'boo.jpg',
    original_url: 'some_url/boo.jpg',
    thumbnail_url: 'some_url/boo_thumb.jpg'
  },
  {
    name: 'baz.jpg',
    original_url: 'some_url/baz.jpg',
    thumbnail_url: 'some_url/baz_thumb.jpg'
  }
]
```
### Example

```ruby
#demo.rb

multi_upload_field :multi_upload_field,
  label: "Drop/Upload Files",
  presign_url: "http://localhost:3000/uploads/presign"
```

```js
// ast.js

[
  [
    "field",
    [
      "multi_upload_field",
      "multi_upload_field",
      null,
      [],
      [
        "object",
        [
          [
            "label",
            [
              "value",
              [
                "Upload many photos"
              ]
            ]
          ],
          [
            "presign_url",
            [
              "value",
              [
                "http://localhost:3000/uploads/presign"
              ]
            ]
          ]
        ]
      ]
    ]
  ]
```

## upload-field

This component just passes the prop `multiple={false}` to the `multi-upload-field` component. The same `props` apply.

```ruby
#demo.rb

upload_field :upload_field,
  label: "Drop/Upload Files",
  presign_url: "http://localhost:3000/uploads/presign"
```
