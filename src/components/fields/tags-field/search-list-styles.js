import { css } from 'emotion'
import { colours, typography } from "../../ui/styles";

export const optionButton = css`
  composes: ${typography.small} ${typography.sans} ${colours.greyTintBorder} ${colours.whiteBackground};
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  cursor: pointer;
  display: block;
  padding: 0.7rem 1rem;
  text-align: left;
  width: 100%;
`
export const optionButtonFocus = css`
  text-decoration: underline;
`
