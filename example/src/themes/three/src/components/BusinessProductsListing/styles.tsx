import styled, { css } from 'styled-components/native'

export const WrapHeader = styled.View`
  position: relative;
`
export const TopHeader = styled.View`
  position: absolute;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  flex: 1;
`
export const AddressInput = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: 20px;
  height: 40px;
  margin-horizontal: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const WrapSearchBar = styled.View`
  padding-horizontal: 20px;
  flex: 1;
  height: 90px;
`
export const WrapContent = styled.View`
  padding: 20px;
`

export const BusinessProductsListingContainer = styled.ScrollView`
  flex: 1;
  margin-bottom: ${(props: any) => props.isActiveFloatingButtom ? '50px' : '0px' };
`

export const WrapperOrderTypeSelector = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  height: 90px;
`

export const WrapBusinesssProductsCategories = styled.View`
  background: ${(props: any) => props.theme.colors.white};
`
