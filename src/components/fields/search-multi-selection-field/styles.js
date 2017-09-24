import { css } from 'emotion'
import * as fields from "../field-styles";
import { buttons, colours, typography, inputBoxes } from "../../ui/styles";

export const base = css`
  composes: ${fields.base};
`;

export const baseInline = css`
  composes: ${fields.baseInline};
`;

export const header = css`
  baseInline & {
    padding-top: 0;
  }
`;

export const display = css`
  composes: ${inputBoxes.inputBox};
`

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
  composes: ${typography.normal} ${typography.sans};
  margin-top: 1px;
`

export const selectionPlaceholder = css`
  composes: ${colours.greyMidColor} ${typography.normal} ${typography.sans};
  align-items: center;
  display: flex;
  flex: 1;
  text-align: left;
  min-height: 2rem;
`

export const openSelectorButton = css`
  composes: ${buttons.small} ${buttons.buttonHighlight};
  margin-right: -0.3rem;
  margin-top: -0.2rem;
  margin-bottom: -0.4rem;
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
  composes: ${typography.normal} ${typography.sans};
  padding: 0.5em 1rem 0.7em;
`

export const search = css`
  composes: ${typography.normal} ${typography.sans} ${colours.greyTintBorder};
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
  composes: ${typography.normal} ${typography.sans} ${colours.greyTintBorder} ${colours.whiteBackground};
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
