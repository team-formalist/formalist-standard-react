import { css, injectGlobal } from 'emotion'
import { colours, inputBoxes, typography } from "../styles";

export const base = css`
  composes: ${inputBoxes.inputBox};
  display: flex;
  padding: 0;
`

export const gutter = css`
  border-right: 1px solid ${colours.values.greyLight};
  position: relative;
  width: 5rem;
`

export const content = css`
  padding: 2rem 2rem 1rem;
  flex: 1;
`

export const contentPlaceholderUnorderedListItem = css``
export const contentPlaceholderOrderedListItem = css``
export const contentPlaceholderHeaderOne = css``

injectGlobal`
  .public-DraftEditorPlaceholder-root {
    .${contentPlaceholderUnorderedListItem} &,
    .${contentPlaceholderOrderedListItem} & {
      margin-left: 1.5rem;
    }
    .${contentPlaceholderHeaderOne} & {
      margin-left: 0.2rem;
    }
  }
`