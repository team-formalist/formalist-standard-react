import { css } from "emotion";
import * as colours from "./colours";
import * as typography from "./typography";

export const button = css`
  ${typography.sans};
  appearance: none;
  cursor: pointer;
`;

export const buttonSecondary = css`
  ${button};
  ${colours.highlightLightBackground};
  ${colours.highlightColor};
  & :hover {
    background-color: ${colours.values.error};
    color: ${colours.values.white};
  }
`;

export const buttonHighlight = css`
  ${button};
  ${colours.whiteColor};
  ${colours.highlightBackground};
  &:hover {
    background-color: ${colours.values.error};
  }
`;

export const xsmall = css`
  ${typography.xsmall};
  border-radius: 0.2rem;
  padding: 0.2em 0.4em 0.3em;
`;

export const small = css`
  ${typography.small};
  border-radius: 0.3rem;
  padding: 0.4em 0.6em 0.5em;
`;

export const normal = css`
  ${typography.normal};
  border-radius: 0.3rem;
  padding: 0.4em 0.8em 0.7em;
`;

export const large = css`
  border-radius: 0.4rem;
  padding: 0.8em 1em;
`;

export const xlarge = css`
  border-radius: 0.5rem;
  padding: 1em 1.2em;
`;
