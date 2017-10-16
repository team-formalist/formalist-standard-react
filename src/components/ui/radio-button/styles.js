import { css } from 'emotion'
import { colours, inputBoxes, typography } from "../styles";

export const button = css`
  composes: ${typography.lineHeightNormal};
  margin-bottom: 0.2em;
`

export const label = css`
  composes: ${typography.sans} ${typography.normal};
  cursor: pointer;
  margin-left: 0.5em;
  padding-bottom: 0.2em;
`

export const input = css`
  cursor: pointer;
  position: relative;
  top: -0.1em;
`


/* States */

export const error = css`
  composes: ${colours.errorColor};
`

export const focus = css`
  border-bottom: 1px solid ${colours.values.highlight};
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
