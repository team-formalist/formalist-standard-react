import { css } from "emotion";
import * as fields from "../field-styles";
import { buttons, colours, typography, inputBoxes } from "../../ui/styles";

export const base = css`
  ${fields.base};
`;

export const baseInline = css`
  ${fields.baseInline};
`;

export const header = css`
  ${fields.header};
`;

export const display = css`
  ${inputBoxes.inputBox};
  padding-bottom: 0.3em;
`;

export const displayFocus = css`
  ${inputBoxes.focus};
`;

export const tagList = css`
  display: flex;
  flex-wrap: wrap;
`;

export const tag = css`
  ${buttons.button};
  ${buttons.normal};
  ${colours.greyMidBorder};
  ${colours.primaryColor};
  ${colours.whiteBackground};
  margin-right: 0.5em;
  margin-bottom: 0.5em;
`;

export const popunderWrapper = css`
  flex: 1;
  min-width: 200px;
`;

export const popunderContainer = css``;

export const popunderContainerHidden = css`
  display: none;
`;
export const tagInputWrapper = css`
  position: relative;
`;
export const tagInputWrapperNoSearch = css`
  flex: 1;
  position: relative;
  min-width: 200px;
`;

export const tagInput = css`
  ${typography.normal};
  border: none;
  background: transparent;
  padding: 0.4em 0;
  margin-left: 0.5em;
  margin-bottom: 0.5em;
  margin-right: 0.5em;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const spinner = css`
  position: absolute;
  right: 1rem;
  top: 0.9rem;
  z-index: 2;
`;

export const removeButton = css`
  display: inline-block;
  margin-left: 0.4em;
  &:focus,
  &:hover {
    color: ${colours.values.error};
  }
`;
