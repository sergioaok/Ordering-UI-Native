import React from 'react'
import { View } from 'react-native'
import { colors } from '../../theme.json'
import { OButton, OIcon, OText } from '../shared'
import {NotFoundSourceParams} from '../../types'
import { GENERAL_IMAGES } from '../../config/constants'

import {
  NotFound,
  NotFoundImage
} from './styles'

export const NotFoundSource = (props: NotFoundSourceParams) => {
  const {
    image,
    content,
    btnTitle,
    conditioned,
    onClickButton
  } = props

  const errorImage = image || GENERAL_IMAGES.notFound

  return (
    <NotFound>
      {errorImage && (
        <NotFoundImage>
          <OIcon src={errorImage} width={300} height={260} />
        </NotFoundImage>
      )}
        {content && conditioned && !errorImage && <OText color={colors.disabled} size={18} style={{textAlign: 'center'}}>{content}</OText>}
        {content && !conditioned && <OText color={colors.disabled} size={18} style={{textAlign: 'center'}}>{content}</OText>}
      {!onClickButton && props.children && (
        props.children
      )}
      {onClickButton && (
        <View style={{marginTop: 10,width: '100%'}}>
          <OButton
            style={{width: '100%', height: 50}}
            bgColor={colors.primary}
            borderColor={colors.primary}
            onClick={() => onClickButton()}
            text={btnTitle}
            textStyle={{color: colors.white}}
          />
        </View>
      )}
    </NotFound>
  )
}