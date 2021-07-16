import styled, { css } from 'styled-components/native'

export const Container = styled.View``

export const WrapHeader = styled.View`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: ${(props: any) => props.theme.colors.backgroundGray};
`

export const WrapperOption = styled.View`
  ${((props: any) => props.hidden && css `
    max-height: 0px;
  `)}
`

export const TitleContainer = styled.View`
  width: 70%;
  flex-direction: row;
  align-items: center;
`

export const WrapTitle = styled.View`
`

export const WrapperArrowIcon = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.colors.lightGray};
  padding: 2px;
  border-radius: 20px;
  ${((props: any) => props.rotate && css`
    transform: rotate(180deg);
  `)}
`