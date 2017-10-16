import { css } from 'emotion'
import { colours, typography } from "../../../../styles";

export const wrapper = css`
  position: relative;
`

export const caret = css`
  position: absolute;
  overflow: hidden;
  width: 0;
`

export const container = css`
  ${colours.whiteBackground};
  margin-bottom: 1.5rem;
  outline: 3px transparent solid;
  transition-property: outline;
  transition-duration: 100ms;
`

export const containerSelected = css`
  outline: 3px ${colours.values.highlight} solid;
`

export const header = css`
  ${colours.greyTintBorder};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  align-items: center;
  display: flex;
  padding: 0.5rem 1.5rem;
`
export const label = css`
  ${typography.small};
  ${colours.greyMidColor};
  margin-left: 0;
  margin-right: auto;
`

export const toolbar = css`
  margin-right: 0;
  margin-left: auto;
`

export const remove = css`
  ${colours.primaryColor};
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition-property: color;
  transition-duration: 100ms;
  &:focus,
  &:hover {
    color: ${colours.values.error};
  }
`

export const removeText = css`
  display: none;
`

export const removeX = css`
  ${typography.fallback};
  ${typography.large};
  &:hover {
    color: ${colours.values.error};
  }
`

export const content = css`
  padding: 1rem 1.5rem 0.1rem;
`

