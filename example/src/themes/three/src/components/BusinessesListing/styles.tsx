import styled from 'styled-components/native'
import { colors } from '../../../../../theme.json'

export const Divider = styled.View`
  height: 8px;
  background-color: ${colors.backgroundGray};
`

export const BusinessList = styled.View`
  flex-wrap: wrap;
`

export const Search = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-vertical: 10px;
`

export const AddressInput = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  margin-horizontal: 10px;
  flex: 1;
  width: 100%;
  z-index: -10;
`

export const OrderControlContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  flex: 1;
`

export const WrapMomentOption = styled.TouchableOpacity`
  background-color: ${colors.primary};
  border-radius: 20px;
  margin-vertical: 5px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
  margin-horizontal: 10px;
  max-width: 240px;
`
