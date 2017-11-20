import { css } from "emotion";
import * as fields from "../field-styles";
import { buttons } from "../../ui/styles";

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
  visibility: inherit;
`;

export const nowButton = css`
  ${buttons.small};
  ${buttons.buttonHighlight};
  float: right;
  margin-top: -0.3rem;
`;
