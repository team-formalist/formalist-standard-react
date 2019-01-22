# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

# v4.1.5 2019-01-22

* [Add method for updating individual selection within search selection field](https://github.com/icelab/formalist-standard-react/pull/168)
* Expose `refetchSelections` method for search selection field

# v4.1.4 2018-11-27

* Upgrade `nodemon` to avoid `event-stream` and `flatmap-stream` security issue.

# v4.1.3 2018-11-23

* Fix bug in rich text link editor (from mismatch with controlled status)

# v4.1.2 2018-11-22

* [Fix bug setting timepicker values](https://github.com/icelab/formalist-standard-react/pull/165)

# v4.1.1 2018-10-16

* Use americanized spelling for initialize references

# v4.1.0 2018-10-11

* [Make all fields controlled and support `namePath`s](https://github.com/icelab/formalist-standard-react/pull/164)

# v4.0.20 2018-10-10

* [Add support for fetching initial attributes for an upload from a specified endpoint](https://github.com/icelab/formalist-standard-react/pull/162)

# v4.0.19 2018-09-24

* Allow `total_pages` to be missing from pagination hash. Fallback to rendering only next/prev buttons for pagination.

# v4.0.18 2018-09-12

* Fix broken `attache-upload` import reference

# v4.0.17 2018-08-01

* [Adds support for clearing search selection queries](https://github.com/icelab/formalist-standard-react/pull/159) when selection occurs (via a clear_query_on_selection attribute)

# v4.0.15 2018-08-01

* Fix breaking error in 4.0.14

# v4.0.14 2018-07-31

* [Fix bug in Firefox](https://github.com/icelab/formalist-standard-react/pull/157) when trying to find inline entities to render.

# v4.0.13 2018-07-30

* [Santise file names for uploads](https://github.com/icelab/formalist-standard-react/pull/156) to avoid issues with escaping (particularly on S3)

# v4.0.12 2018-07-19

* [Usability improvements for sortable lists](https://github.com/icelab/formalist-standard-react/pull/155)

# v4.0.11 2018-07-17

* [Allow time formats to be passed to time-related fields](https://github.com/icelab/formalist-standard-react/pull/154)

# v4.0.10 2018-07-09

* [Fix up keyboard selection behaviour for tags field](https://github.com/icelab/formalist-standard-react/pull/153)

# v4.0.9 2018-07-06

* Ensure invalid atomic blocks remove themselves
* [Fix an issue with upload fields in embedded forms](https://github.com/icelab/formalist-standard-react/pull/151)

# v4.0.8 2018-07-04

* Fix bug where link changes to inline entities wouldn’t be recognised until their text was edited

# v4.0.7 2018-06-27

* [Improve rich text editor performance](https://github.com/icelab/formalist-standard-react/pull/148) by avoiding unnecessary changes
* [Fix bug that could result in duplicate atomic blocks/entities](https://github.com/icelab/formalist-standard-react/pull/149)

# v4.0.6 2018-06-27

* Replace debounce behaviour introduced in v4.0.3 with a [*manual* className change to avoid a render cycle](https://github.com/icelab/formalist-standard-react/pull/147).

# v4.0.5 2018-06-26

* Ensure we don’t recursively debounce ourselves

# v4.0.4 2018-06-26

* Adjust debounce behaviour added in v4.0.3 to avoid issue with first pass rendering of validation errors on rich text editor fields

# v4.0.3 2018-06-26

* Work around [bug with draft-js updating in certain selection-situations](https://github.com/icelab/formalist-standard-react/pull/146)
* Bump version of draft-js-editor-plugin

# v4.0.2 2018-06-25

* Breaking changes:
  * Update to be React 16 compatible
  * Replace attache uploader with direct to S3 version
  * Removes CSS Modules in favour of [Emotion](https://github.com/emotion-js/emotion/blob/master/docs/css.md)
* Remove `react-portal`, adds first-party implementation instead
* Adds better data-attr hooks for testing
* Add button to copy URL for uploads
* Add ability to set an "Option control" for search selection fields. This will be rendered before any options in the search box.
* Fix issues in rich text fields:
  * Ensure configuration is passed down to child formalist instances
  * Make sure events bubble out of child formalist instances to the parent instance (for blocking uploads etc)
* Fix bug where date/time fields would not be cleared properly

# v3.0.4 2018-03-20

* Fix issue with removing atomic blocks using button

# v3.0.3 2018-02-21

* Atomic blocks remove themselves when invalid. I.e., they have no entity or their entity is not of type "formalist".

# v3.0.2 2018-02-14

* Automatically break excessively long words in the rich text editor.

# v3.0.1 2017-08-02

* Fix issue with breaking draft-js API signatures.

# v3.0.0 2017-08-02

* Add horizontal rule/divider as block type.
* Bump draft-js dependencies.

# v2.0.0 2017-03-12

* Update to [formalist-compose](http://github.com/icelab/formalist-compose) 2.x.
* Use the internal event bus in formalist-compose 2.x to busy/idle states from the multi-upload field.

# v1.0.1 2017-02-23

* Fixed ignore case when matching filenames for image-type uploads.

# v1.0.0 2017-02-23

* Releasing as v1.0.0 for better semver compatibility.

# v0.0.6 2017-02-23

* Use file preview blobs for rendering thumbnails on all new uploads.

# v0.0.5 2017-02-15

* Fix error in import reference for search-multi-selection field, bump deps.

# v0.0.4 2017-02-14

* Add tags field.

# v0.0.3 2017-02-14

* Fix errors uploading files in Safari.

# v0.0.2 2017-01-26

* Fix up references to other `formalist-` deps.

# v0.0.1 2017-01-23

First release.
