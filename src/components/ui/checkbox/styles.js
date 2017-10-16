import { css } from 'emotion'
import { colours, inputBoxes, typography } from "../styles";

export const button = css`
  ${typography.lineHeightNormal};
  margin-bottom: 0.2em;
`

export const label = css`
  ${typography.sans};
  ${typography.normal};
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
  ${colours.errorColor};
`

export const focus = css`
  border-bottom: 1px solid ${colours.values.highlight};
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
