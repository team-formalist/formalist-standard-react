import { css } from 'emotion'
import { colours, typography } from "../styles";

export const base = css`
  min-width: 40rem;
  position: relative;
`

export const list = css`
  max-height: 60rem;
  overflow-y: scroll;
  overflow-scroll: touch;
`

export const search = css`
  ${typography.normal};
  ${typography.sans};
  appearance: none;
  box-sizing: border-box;
  border: none;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.02);
  padding: 0.5em 0.5em 0.7em 0.5em;
  position: relative;
  width: 100%;
  z-index: 1;
  &:focus {
    outline: none;
  }
`

export const spinner = css`
  position: absolute;
  right: 1rem;
  top: 0.9rem;
  z-index: 2;
`

export const results = css`
  opacity: 1;
  transition-duration: 100ms;
  transition-property: opacity;
`

export const resultsLoading = css`
  opacity: 0.5;
  position: relative;
  &:before {
    bottom: 0;
    content: '';
    left: 0;
    pointer-events: all;
    position: absolute;
    right: 0;
    top: 0;
    background-color: transparent;
    z-index: 100;
  }
`

export const pagination = css`
  ${typography.normal};
  ${typography.sans};
  ${colours.greyTintBorder};
  box-shadow: 0 3px 0 0 rgba(0, 0, 0, 0.05);
  border-width: 0;
  border-top-width: 1px;
  border-top-style: solid;
  position: relative;
  z-index: 1;
`

export const optionButton = css`
  ${typography.small};
  ${typography.sans};
  ${colours.greyTintBorder};
  ${colours.whiteBackground};
  border-width: 0;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-style: solid;
  cursor: pointer;
  display: block;
  padding: 0.7rem 1rem;
  margin-bottom: -1px;
  text-align: left;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
`

export const optionButtonSelected = css`
  ${colours.highlightLightBackground};
  ${colours.highlightDarkColor};
  border-color: color(#7fc2ea tint(40%));
  position: relative;
  z-index: 1;
`

export const noResults = css`
  text-align: center;
  padding: 2rem;
`
