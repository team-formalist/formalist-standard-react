import { css } from 'emotion'
import { colours, typography } from "../styles";

export const button = css`
  composes: ${typography.sans};
  appearance: none;
  cursor: pointer;
`

export const buttonSecondary = css`
  composes: ${button} ${colours.highlightLightBackground} ${colours.highlightColor};
  & :hover {
    background-color: ${colours.error};
    color: ${colours.white};
  }
`

export const buttonHighlight = css`
  composes: ${button} ${colours.whiteColor} ${colours.highlightBackground};
  &:hover {
    background-color: ${colours.error};
  }
`

export const xsmall = css`
  composes: ${typography.xsmall};
  border-radius: 0.2rem;
  padding: 0.2em 0.4em 0.3em;
`

export const small = css`
  composes: ${typography.small};
  border-radius: 0.3rem;
  padding: 0.4em 0.6em 0.5em;
`

export const normal = css`
  composes: ${typography.normal};
  border-radius: 0.3rem;
  padding: 0.4em 0.8em 0.7em;
`

export const large = css`
  border-radius: 0.4rem;
  padding: 0.8em 1em;
`

export const xlarge = css`
  border-radius: 0.5rem;
  padding: 1em 1.2em;
`
