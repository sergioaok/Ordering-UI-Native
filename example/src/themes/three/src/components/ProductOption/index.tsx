import React, { useState } from 'react'
import { ProductOption as ProductOptionController, useLanguage, useUtils } from 'ordering-components/native'
import {
  Container,
  WrapHeader,
  WrapperOption,
  TitleContainer,
  WrapTitle,
  WrapperArrowIcon
} from './styles'
import { OText, OIcon } from '../../../../../components/shared'
import { useTheme } from 'styled-components/native'
import { StyleSheet, I18nManager } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const ProductOptionUI = (props: any) => {
  const {
    children,
    option,
    error
  } = props

  const theme = useTheme()

  const styles = StyleSheet.create({
    optionImgStyle: {
      width: 40,
      height: 40,
      marginRight: I18nManager.isRTL ? 0 : 5,
      marginLeft: I18nManager.isRTL ? 5 : 0,
    }
  })

  const [, t] = useLanguage()
  const [{ optimizeImage }] = useUtils()

  const [setActive, setActiveState] = useState('active')

  let maxMin = `(${t('MIN', 'Min')}: ${option.min} / ${t('MAX', 'Max')}: ${option.max})`
  if (option.min === 1 && option.max === 1) {
    maxMin = t('REQUIRED', 'Required')
  } else if (option.min === 0 && option.max > 0) {
    maxMin = `(${t('MAX', 'Max')}: ${option.max})`
  } else if (option.min > 0 && option.max === 0) {
    maxMin = `(${t('MIN', 'Min')}: ${option.min})`
  }

  const toggleAccordion = () => {
    setActiveState(setActive === '' ? 'active' : '')
  }

  return (
    <Container style={{color: error ? 'orange' : theme.colors.white}}>
      <WrapHeader>
        <TitleContainer>
          {option?.image && (
            <OIcon
              cover
              url={optimizeImage(option?.image, 'h_200,c_limit')}
              style={styles.optionImgStyle}
            />
          )}
          <WrapTitle>
            <OText size={16} weight={600}>{option.name}</OText>
            <OText color={theme.colors.gray}>{maxMin}</OText>
          </WrapTitle>
        </TitleContainer>
        <WrapperArrowIcon
          rotate={!setActive}
          onPress={() => toggleAccordion()}
        >
          <MaterialIcon
            name='keyboard-arrow-down'
            size={30}
          />
        </WrapperArrowIcon>
      </WrapHeader>
      <WrapperOption
        hidden={!setActive}
      >
        {children}
      </WrapperOption>
    </Container>
  )
}

export const ProductOption = (props: any) => {
  const productOptionProps = {
    ...props,
    UIComponent: ProductOptionUI
  }

  return (
    <ProductOptionController {...productOptionProps} />
  )
}
