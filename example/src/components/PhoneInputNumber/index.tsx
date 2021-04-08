import React, { useEffect, useRef, useState } from 'react';
import PhoneInput from "react-native-phone-number-input";
import { StyleSheet } from 'react-native';
import { useLanguage, useConfig } from 'ordering-components/native';

import { Wrapper } from './styles'

import { colors } from '../../theme'
import { PhoneInputParams } from '../../types';

export const PhoneInputNumber = (props: PhoneInputParams) => {
  const {
    data,
    handleData,
    defaultValue
  } = props

  const [, t] = useLanguage()
  const [{ configs }] = useConfig()
  const phoneInput = useRef<PhoneInput>(null);
  const [userphoneNumber, setUserphoneNumber] = useState('');

  const handleChangeNumber = (number) => {
    setUserphoneNumber(number)
  }

  useEffect(() => {
    if((defaultValue && userphoneNumber) || defaultValue === undefined || defaultValue === ''){
      if (userphoneNumber) {
        const checkValid = phoneInput.current?.isValidNumber(userphoneNumber);
        const callingCode = phoneInput.current?.getCallingCode();
        const formattedNumber = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
        const regex = /^[0-9]*$/
        const cellphone = userphoneNumber.slice(0, 0) + userphoneNumber.slice(1, userphoneNumber.length)
        const validNumber = regex.test(cellphone)
        if ((!checkValid && formattedNumber?.number) || !validNumber) {
          handleData && handleData({
            ...data,
            error: t('INVALID_ERROR_PHONE_NUMBER', 'The Phone Number field is invalid')
          })
          return
        }
        handleData && handleData({
          ...data,
          error: '',
          phone: {
            country_phone_code: callingCode,
            cellphone: formattedNumber?.number
          }
        })
      } else {
        handleData && handleData({
          ...data,
          error: '',
          phone: {
            country_phone_code: null,
            cellphone: null
          }
        })
      }
    }
    }, [userphoneNumber])
    return (
      <Wrapper>
      <PhoneInput
        ref={phoneInput}
        defaultValue={userphoneNumber || defaultValue}
        defaultCode={configs?.default_country_code?.value}
        onChangeFormattedText={(text) => handleChangeNumber(text)}
        withDarkTheme
        countryPickerProps={{withAlphaFilter:true}}
        textContainerStyle={style.input}
      />
    </Wrapper>
  )
}

const style = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.disabled,
    paddingVertical: 0
  }
})
