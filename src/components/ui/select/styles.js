import { css } from 'emotion'
import { colours, inputBoxes, typography } from "../styles";

export const label = css`
  position: relative;
  &:after {
    top: 50%;
    right: 1em;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-top-color: ${colours.values.greyLight};
    border-width: 0.3em;
    margin-left: -0.3em;
    margin-top: -0.1em;
  }
`

export const labelError = css`
  &:after {
    border-top-color: ${colours.values.error};
  }
`

export const labelFocus = css`
  &:after {
    border-top-color: ${colours.values.highlight};
  }
`

export const select = css`
  ${inputBoxes.inputBox};
  appearance: none;
`

/* States */

export const error = css`
  ${inputBoxes.error};
`

export const focus = css`
  ${inputBoxes.focus};
`

/* Sizes */

export const xsmall = css`
  ${inputBoxes.xsmall};
`

export const small = css`
  ${inputBoxes.small};
`

export const normal = css`
  ${inputBoxes.normal};
`

export const large = css`
  ${inputBoxes.large};
`

export const xlarge = css`
  ${inputBoxes.xlarge};
`
