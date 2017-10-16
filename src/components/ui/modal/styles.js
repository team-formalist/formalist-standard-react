import { css } from 'emotion'
import { colours, typography } from "../styles";

export const container = css`
  bottom: 0;
  left: 0;
  overflow-scroll: touch;
  overflow-y: scroll;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10000;
`

export const close = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 3;
`

export const closeText = css`
  display: none;
`
export const closeX = css`
  composes: ${typography.fallback} ${typography.large} ${colours.primaryColor};
  cursor: pointer;
  padding: 1rem;
  &:hover {
    color: error;
  }
`

export const overlay = css`
  composes: ${colours.lightBlendBackground};
  border: none;
  bottom: 0;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;
`

export const content = css`
  position: relative;
  z-index: 2;
  max-width: 300px;
  margin: 0 auto;
`
