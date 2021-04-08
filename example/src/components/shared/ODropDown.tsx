import * as React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import styled, { css } from 'styled-components/native'
import { colors } from '../../theme'

interface Props {
  secondary?: boolean,
  options?: any,
  onSelect?: any,
  selectedIndex?: number,
  kindImage?: any,
  placeholder?: string,
  style?: any,
  defaultValue?: any,
  dropViewMaxHeight?: any,
}

const Wrapper = styled.View`  
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 9999;
`
const InnerWrapper = styled.TouchableOpacity`
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
const SelLabel = styled.Text`
  flex: 1;
  color: black;
  flex-grow: 1;
  color: ${(props: any) => props.secondary ? 'black' : colors.white};
`
const DropIcon = styled.Image`
  tint-color: ${(props: any) => props.secondary ? 'black' : colors.white};
  resize-mode: contain;
  width: 7px;
  height: 7px;
  margin-left: 5px;
`
const KindIcon = styled.Image`
  tint-color: ${colors.primary};
  resize-mode: contain;
  width: 14px;
  height: 14px;
`
const DropView = styled.View`
  z-index: 9999;
  position: absolute;
  box-shadow: 0 4px 3px #00000022;
  background-color: white;
  width: 100%;
  top: 42px;
  left: 0px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${colors.lightGray};
  background-color: ${(props: any) => props.secondary ? colors.white : '#FFF5F5'};
`
const DropOption = styled.Text`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.lightGray};
  margin-bottom: 2px;
  ${(props: any) => props.selected && css`
    color: ${colors.primary};
  `};
  z-index: 9999;
`
const ODropDown = (props: Props) => {
  const [isOpen, onOffToggle] = React.useState(false);
  const defaultOption = props.options?.find((option: any) => option.value === props.defaultValue)
  const [selectedOption, setSelectedOption] = React.useState<any>(defaultOption)
  const [value, setValue] = React.useState(props.defaultValue)

  const onSelectItem = (option: any) => {
    setSelectedOption(option);
    setValue(option.value);
    props.onSelect(option);
    onOffToggle(false);
  }

  const onToggle = () => {
    onOffToggle(!isOpen)
  }

  React.useEffect(() => {
    const _defaultOption = props.options?.find((option: any) => option.value === props.defaultValue)
    setSelectedOption(_defaultOption)
    setValue(props.defaultValue)
  }, [props.defaultValue, props.options])

  return (
    <Wrapper style={props.style}>
      <InnerWrapper
        secondary={props.secondary}
        onPress={onToggle}
      >
        {props.kindImage
          ? (<KindIcon source={props.kindImage} />)
          : null
        }
        <SelLabel secondary={props.secondary} numberOfLines={1} ellipsizeMode={'tail'}>
          {selectedOption?.content || selectedOption?.name || props.placeholder}
        </SelLabel>
        <DropIcon
          secondary={props.secondary}
          source={require('../../assets/icons/drop_down.png')}
        />
      </InnerWrapper>
      {isOpen && props.options &&
        (
          <DropView secondary={props.secondary}>
            <ScrollView style={{
              width: '100%',
              maxHeight: props.dropViewMaxHeight || null,
            }}>
              {props.options && props.options.map((option: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelectItem(option)}
                  style={{ zIndex: 9999 }}
                >
                  <DropOption
                    numberOfLines={1}
                    selected={value === option.value}
                  >
                    {option.content || option.name}
                  </DropOption>
                </TouchableOpacity>))
              }
            </ScrollView>
          </DropView>
        )
      }
    </Wrapper>
  )
}

export default ODropDown
