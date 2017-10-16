import { css } from 'emotion'
import { colours, typography } from "../../../styles";

export const container = css`
  ${colours.greyLightBorder};
  border-style: solid;
  border-left-width: 1px;
  flex: 1;
`

export const list = css`
  padding-top: 0.8em;
  padding-bottom: 0.8em;
`

export const button = css`
  ${typography.sans};
  display: block;
  padding: 0.4em 0.8em;
  white-space: nowrap;
`
