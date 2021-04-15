import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components/native'
import { ScrollView, TouchableOpacity  } from 'react-native-gesture-handler'
import { ScrollView as CustomScrollView, TouchableOpacity as CustomTouchableOpacity } from 'react-native'
import { colors } from '../../theme'

interface Props {
  secondary?: boolean,
  options?: any;
  defaultValue?: any,
  placeholder?: string,
  onSelect?: any,
  style?: any,
  dropViewMaxHeight?: any,
  isModal?: any,
}

const Wrapper = styled.View`
  position: relative;
`
const Selected = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props: any) => props.secondary ? colors.lightGray : colors.primary};
  background-color: ${(props: any) => props.secondary ? colors.white : colors.primary};
`
const SelectedLabel = styled.Text`
  color: ${(props: any) => props.secondary ? 'black' : colors.white};
`
const DropIcon = styled.Image`
  tint-color: ${(props: any) => props.secondary ? 'black' : colors.white};
  resize-mode: contain;
  width: 7px;
  height: 7px;
  margin-left: 5px;
`
const DropView = styled.View`
  position: absolute;
  z-index: 9999;
  top: 42px;
  border-width: 1px;
  border-color: ${colors.lightGray};
  background-color: ${(props: any) => props.secondary ? colors.white : '#FFF5F5'};
  border-radius: 10px;
  width: 100%;
`
const DropOption = styled.Text`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGray};
  ${(props: any) => props.selected && css`
    color: ${colors.primary};
  `};
`
const ODropDown = (props: Props) => {
  const {
    secondary,
    options,
    defaultValue,
    placeholder,
    onSelect,
    dropViewMaxHeight,
    isModal
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const defaultOption = options?.find((option: any) => option.value === defaultValue)
  const [selectedOption, setSelectedOption] = useState<any>(defaultOption)
  const [value, setValue] = useState(defaultValue)

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  const onSelectOption = (option: any) => {
    setSelectedOption(option)
    setValue(option.value)
    onSelect(option.value || option.name)
    setIsOpen(false)
  }

  useEffect(() => {
    const _defaultOption = options?.find((option: any) => option.value === defaultValue)
    setSelectedOption(_defaultOption)
    setValue(defaultValue)
  }, [defaultValue, options])

  return (
    <Wrapper style={props.style}>
      <Selected
        secondary={secondary}
        onPress={() => onToggle()}
      >
        <SelectedLabel
          secondary={secondary}
        >
          {selectedOption?.content || selectedOption?.name || placeholder}
        </SelectedLabel>
        <DropIcon
          secondary={secondary}
          source={require('../../assets/icons/drop_down.png')}
        />
      </Selected>
      {isOpen && options && (
        <DropView
          secondary={secondary}
        >
          {!isModal ? (
            <ScrollView style={{
              maxHeight: dropViewMaxHeight || null }}
            >
              {options.map((option: any, index: number) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => onSelectOption(option)}
                >
                  <DropOption
                    numberOfLines={1}
                    selected={value === option.value}
                  >
                    {option.content || option.name}
                  </DropOption>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <CustomScrollView style={{
              maxHeight: dropViewMaxHeight || null }}
            >
              {options.map((option: any, index: number) => (
                <CustomTouchableOpacity 
                  key={index}
                  onPress={() => onSelectOption(option)}
                >
                  <DropOption
                    numberOfLines={1}
                    selected={value === option.value}
                  >
                    {option.content || option.name}
                  </DropOption>
                </CustomTouchableOpacity>
              ))}
            </CustomScrollView>
          )}
        </DropView>
      )}
    </Wrapper>
  )
}

export default ODropDown
