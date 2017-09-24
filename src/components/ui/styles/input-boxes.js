import { css } from 'emotion'
import * as colours from './colours'
import * as typography from "./typography";

export const inputBox = css`
  composes: ${typography.sans} ${typography.normal} ${colours.primaryColor} ${colours.greyLightBorder} ${colours.greyTintBackground};
  box-shadow: inset 0px 2px 0px 0px rgba(20,15,10,0.03);
  border-width: 0;
  border-top-width: 1px;
  border-top-style: solid;
  border-radius: 0;
  box-sizing: border-box;
  padding: 0.6em 0.7em 0.8em;
  width: 100%;
  transition-property: border-color, background-color;
  transition-duration: 100ms;
`

/* States */

export const error = css`
  composes: ${colours.errorColor} ${colours.errorBorder} ${colours.errorLightBackground};
  &::placeholder {
    color: rgba(0,0,0,0.2);
  }
`

export const focus = css`
  composes: ${colours.darkBlendColor} ${colours.highlightBorder} ${colours.highlightLightBackground};
  outline: none;
  &::placeholder {
    color: ${colours.lightBlend};
  }
`

/* Sizes */

export const xsmall = css`
  composes: ${typography.xSmall};
`

export const small = css`
  composes: ${typography.small};
`

export const normal = css`
  composes: ${typography.normal};
`

export const large = css`
  composes: ${typography.large};
`

export const xlarge = css`
  composes: ${typography.xLarge};
`
