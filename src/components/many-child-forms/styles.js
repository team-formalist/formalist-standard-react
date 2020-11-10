import { css } from "emotion";
import { buttons, colours, inputBoxes, typography } from "../ui/styles";

export const base = css`
  margin-bottom: 5rem;
`;

export const header = css`
  display: flex;
  align-items: center;
  padding-bottom: 1.5rem;
`;

export const label = css`
  ${typography.headerSmallCaps};
  margin-right: auto;
`;
export const labelErrors = css`
  ${colours.errorColor};
`;

export const placeholder = css`
  ${inputBoxes.inputBox};
`;

export const placeholderText = css`
  ${colours.greyMidColor};
  display: inline-block;
  padding-top: 0.3rem;
  padding-bottom: 0.4rem;
  margin-right: 0.5rem;
`;
export const placeholderButton = css`
  ${colours.highlightDarkColor};
  text-decoration: underline;
`;

export const controls = css`
  margin-left: auto;
`;

export const addButton = css`
  ${buttons.small};
  ${buttons.buttonHighlight};
`;

export const set = css`
  padding-left: 0.6rem;
  padding-top: 1rem;
  width: 100%;
`;
