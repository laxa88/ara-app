// Reference: https://www.styled-components.com/docs/api#typescript

import * as styledComponents from 'styled-components';

import ITheme from './ITheme';

const {
  default: styled,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>;

export default styled;
