import styled, { css } from 'styled-components'

interface RowProps {
  type: 'horizontal' | 'vertical'
}

export const Row = styled.div<RowProps>`
  display: flex;

  ${({ type = 'vertical' }) => {
    if (type === 'horizontal')
      return css`
        justify-content: space-between;
        align-items: center;
      `

    if (type === 'vertical')
      return css`
        flex-direction: column;
        gap: 1.6rem;
      `
  }}
`

Row.defaultProps = {
  type: 'vertical',
}
