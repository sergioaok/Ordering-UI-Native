import React from 'react'
import { Modal, TouchableWithoutFeedback, Dimensions, StyleSheet, View, ScrollView, Text } from 'react-native'
import { OText } from '../../../../../components/shared'
import Icon from 'react-native-vector-icons/Feather'

const deviceHeight = Dimensions.get('window').height

interface Props {
  open: boolean;
  title?: string;
  children?: any;
  onClose?: any;
  customHeaderShow?: boolean;
}
const OBottomPopup = (props: Props) => {
  const {
    open,
    title,
    onClose,
    customHeaderShow,
    children
  } = props
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={open}
      onRequestClose={() => onClose()}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.touchableOutsideStyle}
          onPress={() => onClose()}
        >
          <View style={styles.touchableOutsideStyle} />
        </TouchableWithoutFeedback>
        <View style={styles.bottomContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {customHeaderShow ? (
              <View style={{ marginVertical: 10 }}>
                <OText size={16} numberOfLines={1} style={styles.customTitleStyle}>
                  {title}
                </OText>
                <Icon
                  name='x'
                  size={30}
                  style={styles.closeBtnStyle}
                  onPress={onClose}
                />
              </View>
            ) : (
              <Text style={styles.titleStyle}>
                {title}
              </Text>
            )}
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  touchableOutsideStyle: {
    flex: 1,
    width: '100%'
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: 20,
    maxHeight: deviceHeight - 100,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center'
  },
  closeBtnStyle: {
    position: 'absolute',
    top: 15,
    right: 0
  },
  customTitleStyle: {
    fontSize: 20,
    marginVertical: 15,
    textAlign: 'center',
    paddingHorizontal: 30
  }
})

export default OBottomPopup
