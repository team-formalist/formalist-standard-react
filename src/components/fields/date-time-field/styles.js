import { css } from 'emotion'
import * as shared from "../shared-styles";
import * as button from "../../ui/button/styles";

export const base = css`
composes: ${shared.base};
`

export const baseInline = css`
composes: ${shared.baseInline};
`

export const nowButton = css`
composes: ${button.small} ${button.buttonHighlight};
float: right;
margin-top: -0.3rem;
`
