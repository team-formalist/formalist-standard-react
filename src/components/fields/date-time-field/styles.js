import { css } from 'emotion'
import * as fields from "../field-styles";
import { buttons } from "../../ui/styles";

export const base = css`
composes: ${fields.base};
`

export const baseInline = css`
composes: ${fields.baseInline};
`

export const header = css`
  composes: ${fields.header};
`;

export const nowButton = css`
composes: ${buttons.small} ${buttons.buttonHighlight};
float: right;
margin-top: -0.3rem;
`
