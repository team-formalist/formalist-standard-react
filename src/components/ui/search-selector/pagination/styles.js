import { css } from 'emotion'
import { colours, typography } from "../../styles";

export const base = css`
  display: flex;
  padding: 0.7rem 1rem;
`

export const info = css`
  margin-left: 0;
  margin-right: auto;
`

export const buttons = css`
  margin-left: auto;
  margin-right: 0;
`
export const prevButton = css`
  margin-right: 1rem;
  &:hover {
    color: ${colours.values.error};
  }
`

export const nextButton = css`
  &:hover {
    color: ${colours.values.error};
  }
`

export const buttonText = css`
  text-decoration: underline;
`

export const buttonArrow = css`
  composes: ${typography.fallback};
`
