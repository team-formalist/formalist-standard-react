import { css } from 'emotion'
import * as fields from "../field-styles";
import { buttons, colours, typography, inputBoxes } from "../../ui/styles";

export const base = css`
  ${fields.base};
`;

export const baseInline = css`
  ${fields.baseInline};
`;

export const header = css`
  ${fields.header};
`;

export const display = css`
  ${inputBoxes.inputBox};
`

/**
 *
 */

export const wrapper = css`
  align-items: center;
  display: flex;
  padding: 0;
  width: 100%;
  &:focus {
    outline: none;
  }
`

export const selectionItems = css`
  ${typography.normal};
  ${typography.sans};
  margin-top: 1px;
`

export const selectionPlaceholder = css`
  ${colours.greyMidColor};
  ${typography.normal};
  ${typography.sans};
  align-items: center;
  display: flex;
  flex: 1;
  text-align: left;
  min-height: 2rem;
`

export const openSelectorButton = css`
  ${buttons.small};
  ${buttons.buttonHighlight};
  margin-right: -0.3rem;
  margin-top: -0.2rem;
  margin-bottom: -0.4rem;
`

/* Selection exists */

export const remove = css`
  ${colours.primaryColor};
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.17em;
  margin-top: -0.3rem;
  margin-bottom: -0.3rem;
  transition-property: color;
  transition-duration: 100ms;
  &:focus,
  &:hover {
    colour: ${colours.values.error};
  }
`

export const removeText = css`
  display: none;
`

export const removeX = css`
  ${typography.fallback};
${typography.large};
`

/**
 * Selections
 */

export const options = css`
  min-width: 30rem;
`

export const optionsList = css`
  max-height: 40rem;
  overflow-y: scroll;
  overflow-scroll: touch;
  padding-top: 0.5rem;
`

export const noResults = css`
  ${typography.normal};
  ${typography.sans};
  padding: 0.5em 1rem 0.7em;
`

export const search = css`
  ${typography.normal};
  ${typography.sans};
  ${colours.greyTintBorder};
  appearance: none;
  border-width: 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  box-sizing: border-box;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.02);
  padding: 0.5em 0.5em 0.7em 0.5em;
  position: relative;
  width: 100%;
  z-index: 1;
  &:focus {
    outline: none;
  }
`

export const optionButton = css`
  ${typography.normal};
  ${typography.sans};
  ${colours.greyTintBorder};
  ${colours.whiteBackground};
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  cursor: pointer;
  display: block;
  padding: 0.7rem 1rem;
  text-align: left;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
  strong {
    font-weight: ${typography.fonts.weights.sansBold};
  }
  italic {
    font-style: italic;
  }
`

export const selection = css`
  strong {
    font-weight: ${typography.fonts.weights.sansBold};
  }
  italic {
    font-style: italic;
  }
`
