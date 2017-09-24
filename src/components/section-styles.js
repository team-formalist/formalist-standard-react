import { css } from 'emotion'
import { colours, typography } from "./ui/styles";

export const base = css`
  margin-bottom: 5rem;
`

export const label = css`
  composes: ${typography.headerSmallCaps};
  border-bottom: 3px solid ${colours.values.greyTint};
  margin-bottom: 1.8rem;
  padding-bottom: 1.8rem;
`
