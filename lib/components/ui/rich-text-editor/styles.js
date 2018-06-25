import uid from "uid";
import { css, injectGlobal } from "emotion";
import { colours, inputBoxes } from "../styles";

export var base = /*#__PURE__*/css(inputBoxes.inputBox, ";display:flex;padding:0;");

export var gutter = /*#__PURE__*/css("border-right:1px solid ", colours.values.greyLight, ";position:relative;width:5rem;");

export var content = /*#__PURE__*/css("padding:2rem 2rem 1rem;flex:1;");

export var contentPlaceholderUnorderedListItem = uid(10); // Empty placeholder class
export var contentPlaceholderOrderedListItem = uid(10); // Empty placeholder class
export var contentPlaceholderHeaderOne = uid(10); // Empty placeholder class

injectGlobal(".public-DraftEditorPlaceholder-root{.", contentPlaceholderUnorderedListItem, " &,.", contentPlaceholderOrderedListItem, " &{margin-left:1.5rem;}.", contentPlaceholderHeaderOne, " &{margin-left:0.2rem;}}");