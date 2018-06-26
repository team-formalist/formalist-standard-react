import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import classNames from "classnames";
import { EditorState } from "draft-js";

// Import components
import FieldErrors from "../common/errors";
import FieldHeader from "../common/header";

// Import styles
import * as styles from "./styles";
import RichTextEditor from "../../ui/rich-text-editor";

// HTML
import exporter from "draft-js-ast-exporter";
import importer from "draft-js-ast-importer";

/**
 * Text Area field
 */
class RichTextArea extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    name: PropTypes.string,
    config: PropTypes.object,
    attributes: PropTypes.shape({
      label: PropTypes.string,
      hint: PropTypes.string,
      placeholder: PropTypes.string,
      inline: PropTypes.bool,
      box_size: PropTypes.oneOf([
        "single",
        "small",
        "normal",
        "large",
        "xlarge"
      ]),
      inline_formatters: PropTypes.array,
      block_formatters: PropTypes.array,
      embeddable_forms: PropTypes.object
    }),
    bus: PropTypes.object.isRequired,
    hint: PropTypes.string,
    label: PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      ImmutablePropTypes.list
    ])
  };

  constructor(props) {
    super(props);
    let { value } = props;
    // Convert from an Immutable structure?
    value = value && value.toJS ? value.toJS() : value;
    // Convert from a string?
    value = typeof value === "string" ? JSON.parse(value) : value;

    this.state = {
      editorState: value
        ? EditorState.createWithContent(importer(value))
        : EditorState.createEmpty()
    };
  }

  /**
   * onChange handler
   *
   * @param  {EditorState} editorState State from the editor
   */
  onChange = (editorState, forceChange = false) => {
    if (forceChange || editorState !== this.state.editorState) {
      // Check if contentState has changed
      if (
        forceChange ||
        editorState.getCurrentContent() !==
          this.state.editorState.getCurrentContent()
      ) {
        const { value } = this.props;
        const exporterOptions = {
          entityModifiers: {
            formalist: data => {
              const copy = Object.assign({}, data);
              delete copy["label"];
              delete copy["form"];
              return copy;
            }
          }
        };
        const currentContent = editorState.getCurrentContent();
        const hasText = currentContent.hasText();
        const newValue = hasText
          ? exporter(editorState, exporterOptions)
          : null;
        const hasChangedToNull = newValue === null && value !== null;

        // Persist the value to the AST, but only if it is:
        // * Not null
        // * Has changed to null
        if (newValue != null || hasChangedToNull) {
          this.props.actions.edit(val => {
            return newValue;
          });
        }
      }
      // Keep track of the state here
      this.setState({
        editorState
      });
    }
  };

  render() {
    const { attributes, config, errors, hint, label, name, bus } = this.props;
    const { editorState } = this.state;
    let hasErrors = errors.count() > 0;

    // Set up field classes
    let fieldClassNames = classNames(styles.base, {
      [`${styles.baseInline}`]: attributes.inline
    });

    return (
      <div
        className={fieldClassNames}
        data-field-name={name}
        data-field-type="rich-text-area"
      >
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          <RichTextEditor
            editorState={editorState}
            config={config}
            onChange={this.onChange}
            inlineFormatters={attributes.inline_formatters}
            blockFormatters={attributes.block_formatters}
            embeddableForms={attributes.embeddable_forms}
            boxSize={attributes.box_size}
            textSize={attributes.text_size}
            placeholder={attributes.placeholder}
            webDriverTestID={name}
            fieldBus={bus}
          />
          {hasErrors ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    );
  }
}

export default RichTextArea;
