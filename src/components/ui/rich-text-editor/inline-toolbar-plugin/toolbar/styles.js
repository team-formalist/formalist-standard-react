import { css } from 'emotion'
import { colours } from "../../../styles";

export const positioner = css`
  position: absolute;
  height: 0;
`

export const entityWrapper = css`
  composes: ${colours.greyTintBorder};
  border-top-width: 1px;
  border-top-style: solid;
  padding: 0.8rem 1rem 1rem;
`
