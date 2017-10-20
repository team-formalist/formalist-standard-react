import { css } from "emotion";
import * as fields from "../field-styles";

export const base = css`
  ${fields.base};
`;

export const baseInline = css`
  ${fields.baseInline};
`;

export const header = css`
  ${fields.header};
  .${baseInline} & {
    padding-top: 0;
  }
`;

export const display = css``;
