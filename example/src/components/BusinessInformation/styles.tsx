import styled from 'styled-components/native'
import { colors } from '../../theme'

export const BusinessInformationContainer = styled.View`
  width: 100%;
  height: 100%;
`
export const GrayBackground = styled.View`
  background-color: ${colors.inputDisabled};
  border-radius: 10px;
  padding: 10px 15px;
`
export const WrapMainContent = styled.ScrollView`
  flex: 1;
  margin-top: 40px;
`
export const InnerContent = styled.View`
  padding: 30px 20px;
`
export const WrapScheduleBlock = styled.ScrollView`
  margin: 20px 0;
  max-height: 90px;
`
export const ScheduleBlock = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  border-left-width: 1;
  border-color: ${colors.lightGray};
`
export const WrapBusinessMap = styled.View`
  max-height: 200px;
`