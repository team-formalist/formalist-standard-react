import { css } from "emotion";
import { colours, typography } from "../../../ui/styles";

export const base = css`
  ${colours.errorColor};
  ${typography.sans};
  ${typography.normal};
  ${typography.lineHeightNormal};
  margin-top: 0.6em;
`;

export const list = css`
  list-style: disc;
  margin-left: 1.6em;
`;

export const item = css`
  margin-bottom: 0.3rem;
`;
