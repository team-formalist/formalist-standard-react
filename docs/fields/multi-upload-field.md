# MultiUploadField

Here are the potential props we can have for the `multi-upload-field`.

| Prop name              | Type   | Required | Example                                                                   | Default             | Description              |
| :----------------------|:------:| :-------:| :------------------------------------------------------------------------ | :-------------------| :------------------------|
| **label**               | String | `false`  | `label: 'Drop/Upload Files'`                                              | Drop/Upload File(s) | Field label and button text |
| **presign_url**          | String | `true`   | `presign_url: 'http://url_to/presign'`                    |                     | URL to XHR `presign`. `presign` should return `url`, `expiration`, `hmac` and `uuid` to perform upload. |
| **token**                | String | `false`  | `token: 'XYZ'`                                                            | `null`              | optional csrf-token |
| **multiple**             | Bool   | `false`  | `multiple: false`                                                         | `true`              | Differentiate between multiple or singular uploads |
| **permitted_file_type_regex**        | Regex  | `false`  | `permitted_file_type_regex: /image\/(`jpg`)$/`                       | `null`              | Provide an explicit file type validation rule |
| **permitted_file_type_message** | String | `false`  | `permitted_file_type_message: 'Supported image formats are JPEG, PNG, and GIF.'` | `null`              | Supporting validation message for the `fileTypeRegex` prop |
| **max_file_size**          | Number | `false`  | `max_file_size: 5000000`                                                    | `null`              | Provide an explicit maximum file size validation rule |
| **max_file_size_message**   | String | `false`  | `max_file_size_message: 'The file you tried to upload exceed our limit (5MB)'` | `null`              | Supporting validation message for the `maxFileSize` prop |
| **upload_action_label**           | String | `false`  | `upload_action_label: 'Upload file'`                                               | Fallback to `label`, otherwise 'Drop/Upload File(s)' | Provide custom button text |

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
# demo.rb

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

## Custom uploaded item template

Pass through a custom template for rendering an uploaded item, by defining a
`component`.

Here we assign our `admin` component to the `components` array of our new `multiUploadField`. The `multiUploadField` will then extract this template
when rendering uploaded files passing it the parameters `fileObject` and `index`.

```js
import template from 'formalist-standard-react'
const configuredTemplate = template({}, formConfig)
const AST = '../ast.js'
const form = configuredTemplate(AST)
const app = document.querySelector('.app')

const formConfig = {
  fields: {
    multiUploadField: {
      components: [
        {
          name: 'admin',
          component: (fileObject, index) => (<div key={index}>I see {fileObject.file_name}</div>)
        }
      ]
    }
  }
}

ReactDOM.render(<App form={form} />, app)
```

A `fileObject` is an object that contains the original file as well as similar
properties so as to not modify the originla File itself.

```js
{
  file_name: small.jpg,
  file: File,
  lastModifiedDate: Tue May 17 2016 15:28:11 GMT+1000 (AEST),
  size: 5000000000,
  type: 'image/png',
  uid: "wyertyiopdop_small.jpg"
}
```