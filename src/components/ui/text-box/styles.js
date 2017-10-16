import { css } from 'emotion'
import { inputBoxes } from "../styles";

export const textBox = css`
  composes: ${inputBoxes.inputBox};
`

/* States */

export const error = css`
  composes: ${inputBoxes.error};
`

export const focus = css`
  composes: ${inputBoxes.focus};
`

/* Sizes */

export const xsmall = css`
  composes: ${inputBoxes.xsmall};
`

export const small = css`
  composes: ${inputBoxes.small};
`

export const normal = css`
  composes: ${inputBoxes.normal};
`

export const large = css`
  composes: ${inputBoxes.large};
`

export const xlarge = css`
  composes: ${inputBoxes.xlarge};
`
