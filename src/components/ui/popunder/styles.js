import { css } from 'emotion'
import { colours, popovers, typography } from "../styles";

export const container = css`
  composes: ${typography.normal} ${typography.sans} ${colours.whiteBackground} ${typography.popover};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  max-height: 20rem;
  max-width: 20rem;
  min-width: 14rem;
  overflow-y: scroll;
  overflow-scroll: touch;
  position: absolute;
  z-index: 10000;
`
