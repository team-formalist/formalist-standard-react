# UploadField

This component just passes the prop `multiple={false}` to the [`multi-upload-field`](multi-upload-field.md) component. The same `props` apply.

```ruby
# demo.rb

upload_field :upload_field,
  label: "Drop/Upload Files",
  presign_url: "http://localhost:3000/uploads/presign"
```