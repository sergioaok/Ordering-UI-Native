import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

import {
  PaymentOptions as PaymentOptionsController,
  useLanguage,
  useSession
} from 'ordering-components/native';

import { PaymentOptionCash } from '../PaymentOptionCash';
import { PaymentOptionStripe } from '../PaymentOptionStripe';
import { StripeElementsForm } from '../StripeElementsForm'
// import { PaymentOptionPaypal } from '../PaymentOptionPaypal'
// import { StripeRedirectForm } from '../StripeRedirectForm'
// import { NotFoundSource } from '../NotFoundSource'

import { IMAGES, PAYMENT_IMAGES } from '../../config/constants';
import { OText, OButton, OIcon, OModal } from '../shared';

import {
  PMContainer,
  PMItem,
  PMCardSelected,
  PMCardItemContent
} from './styles'
import { colors } from '../../theme';
import { getIconCard } from '../../utils';

const stripeOptions = ['stripe_direct', 'stripe', 'stripe_connect']
const stripeRedirectOptions = [
  { name: 'Bancontact', value: 'bancontact' },
  { name: 'Alipay', value: 'alipay' },
  { name: 'Giropay', value: 'giropay' },
  { name: 'iDEAL', value: 'ideal' }
]

const getPayIcon = (method: string) => {
  switch (method) {
    case 'cash':
      return PAYMENT_IMAGES.cash
    case 'card_delivery':
      return PAYMENT_IMAGES.carddelivery
    case 'paypal':
      return PAYMENT_IMAGES.paypal
    case 'stripe':
      return PAYMENT_IMAGES.stripe
    case 'stripe_direct':
      return PAYMENT_IMAGES.stripecc
    case 'stripe_connect':
      return PAYMENT_IMAGES.stripes
    case 'stripe_redirect':
      return PAYMENT_IMAGES.stripesb
    default:
      return PAYMENT_IMAGES.creditCard
  }
}

const paypalBtnStyle = {
  color: 'gold',
  shape: 'pill',
  label: 'paypal',
  size: 'responsive'
}

const PaymentOptionsUI = (props: any) => {
  const {
    cart,
    errorCash,
    isLoading,
    isDisabled,
    paymethodSelected,
    paymethodData,
    paymethodsList,
    isPaymethodNull,
    onNavigationRedirect,
    handlePaymethodClick,
    handlePaymethodDataChange
  } = props
  const [, t] = useLanguage();
  // const [{ token }] = useSession()

  useEffect(() => {
    if (paymethodsList.paymethods.length === 1) {
      handlePaymethodClick && handlePaymethodClick(paymethodsList.paymethods[0])
    }
  }, [paymethodsList.paymethods])

  useEffect(() => {
    if (paymethodSelected?.gateway !== 'cash' && errorCash) {
      props.setErrorCash(false)
    }
  }, [paymethodSelected])

  useEffect(() => {
    !isPaymethodNull &&
    handlePaymethodClick &&
    handlePaymethodClick(isPaymethodNull)
  }, [isPaymethodNull])

  const renderPaymethods = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => handlePaymethodClick(item)}
      >
        <PMItem
          key={item.id}
          isDisabled={isDisabled}
          isActive={paymethodSelected?.id === item.id}
        >
          <OIcon
            src={getPayIcon(item.gateway)}
            width={40}
            height={40}
            />
          <OText
            size={12}
            style={{ margin: 0 }}
            color={paymethodSelected?.id === item.id ? colors.white : '#000'}
          >
            {item.name}
          </OText>
        </PMItem>
      </TouchableOpacity>
    )
  }

  const excludeIds = [3, 32]; //exclude paypal & stripe redirect

  return (
    <PMContainer>
      {paymethodsList.paymethods.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          // data={paymethodsList.paymethods.sort((a: any, b: any) => a.id - b.id)}
          data={paymethodsList.paymethods.sort((a: any, b: any) => a.id - b.id).filter((p: any) => !excludeIds.includes(p.id))}
          renderItem={renderPaymethods}
          keyExtractor={paymethod => paymethod.id.toString()}
        />
      )}

      {(paymethodsList.loading || isLoading) && (
        <Placeholder style={{ marginTop: 10 }} Animation={Fade}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {[...Array(3)].map((_, i) => (
              <PlaceholderLine
              key={i}
              width={37}
              height={80}
              noMargin
              style={{ borderRadius: 10, marginRight: 10 }}
              />
            ))}
          </View>
        </Placeholder>
      )}

      {paymethodsList.error && paymethodsList.error.length > 0 && (
        <OText size={12} style={{ margin: 0 }}>
          {paymethodsList?.error[0]?.message || paymethodsList?.error[0]}
        </OText>
      )}

      {!(paymethodsList.loading || isLoading) &&
        !paymethodsList.error &&
        (!paymethodsList?.paymethods || paymethodsList.paymethods.length === 0) &&
      (
        <OText size={12} style={{ margin: 0 }}>
          {t('NO_PAYMENT_METHODS', 'No payment methods!')}
        </OText>
      )}

      {paymethodSelected?.gateway === 'cash' && (
        <PaymentOptionCash
          orderTotal={cart.total}
          onChangeData={handlePaymethodDataChange}
          setErrorCash={props.setErrorCash}
        />
      )}

      {stripeOptions.includes(paymethodSelected?.gateway) && paymethodData?.card && (
        <PMCardSelected>
          <PMCardItemContent>
            <View style={styles.viewStyle}>
              <MaterialCommunityIcons
                name='radiobox-marked'
                size={24}
                color={colors.primary}
              />
            </View>
            <View style={styles.viewStyle}>
              <OText>
                {getIconCard(paymethodData?.card?.brand, 26)}
              </OText>
            </View>
            <View style={styles.viewStyle}>
              <OText>
                XXXX-XXXX-XXXX-{paymethodData?.card?.last4}
              </OText>
            </View>
          </PMCardItemContent>
        </PMCardSelected>
      )}

      {/* Stripe */}
      <OModal
        isNotDecoration
        open={paymethodSelected?.gateway === 'stripe' && !paymethodData.id}
        title={t('SELECT_A_CARD', 'Select a card')}
        onClose={() => handlePaymethodClick(null)}
      >
        {paymethodSelected?.gateway === 'stripe' && (
          <PaymentOptionStripe
            paymethod={paymethodSelected}
            businessId={props.businessId}
            publicKey={paymethodSelected.credentials.publishable}
            payType={paymethodsList?.name}
            onSelectCard={handlePaymethodDataChange}
            onNavigationRedirect={onNavigationRedirect}
            onCancel={() => handlePaymethodClick(null)}
          />
        )}
      </OModal>


      {/* Stripe Connect */}
      <OModal
        isNotDecoration
        open={paymethodSelected?.gateway === 'stripe_connect' && !paymethodData.id}
        title={t('SELECT_A_CARD', 'Select a card')}
        onClose={() => handlePaymethodClick(null)}
      >
        {paymethodSelected?.gateway === 'stripe_connect' && (
          <PaymentOptionStripe
            paymethod={paymethodSelected}
            businessId={props.businessId}
            publicKey={paymethodSelected.credentials.stripe.publishable}
            clientSecret={paymethodSelected.credentials.publishable}
            payType={paymethodsList?.name}
            onSelectCard={handlePaymethodDataChange}
            onCancel={() => handlePaymethodClick(null)}
          />
        )}
      </OModal>

      {/* Stripe direct */}
      <OModal
        isNotDecoration
        title={t('ADD_CREDIT_OR_DEBIT_CARD', 'Add credit or debit card')}
        open={paymethodSelected?.gateway === 'stripe_direct' && !paymethodData.id}
        onClose={() => handlePaymethodClick(null)}
      >
        {paymethodSelected?.gateway === 'stripe_direct' && (
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 0}
            enabled={Platform.OS === 'ios' ? true : false}
          >
            <StripeElementsForm
              businessId={props.businessId}
              publicKey={paymethodSelected.credentials.publishable}
              handleSource={handlePaymethodDataChange}
              onCancel={() => handlePaymethodClick(null)}
            />
          </KeyboardAvoidingView>
        )}
      </OModal>

      {/* Paypal */}
      {/* <Modal
        className='modal-info'
        open={paymethodSelected?.gateway === 'paypal' && !paymethodData.id}
        onClose={() => handlePaymethodClick(null)}
        title={t('PAY_WITH_PAYPAL', 'Pay with PayPal')}
      >
        {paymethodSelected?.gateway === 'paypal' && (
          <PaymentOptionPaypal
            clientId={paymethodSelected?.credentials?.client_id}
            body={{
              paymethod_id: paymethodSelected.id,
              amount: cart.total,
              delivery_zone_id: cart.delivery_zone_id,
              cartUuid: cart.uuid
            }}
            btnStyle={paypalBtnStyle}
            noAuthMessage={
              !token
                ? t('NEED_LOGIN_TO_USE', 'Sorry, you need to login to use this method')
                : null
            }
            handlerChangePaypal={(uuid) => onNavigationRedirect && onNavigationRedirect('OrderDetails', { orderId: uuid })}
          />
        )}
      </Modal> */}

      {/* Stripe Redirect */}
      {/* <Modal
        title={t('STRIPE_REDIRECT', 'Stripe Redirect')}
        open={['stripe_redirect'].includes(paymethodSelected?.gateway) && !paymethodData.type}
        className='modal-info'
        onClose={() => handlePaymethodClick(null)}
      >
        <StripeRedirectForm
          businessId={props.businessId}
          currency={props.currency}
          paymethods={stripeRedirectOptions}
          handleStripeRedirect={handlePaymethodDataChange}
        />
      </Modal> */}
    </PMContainer>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    marginRight: 10
  },
})

export const PaymentOptions = (props: any) => {
  const paymentOptions = {
    ...props,
    UIComponent: PaymentOptionsUI
  }
  return (
    <PaymentOptionsController {...paymentOptions} />
  )
}
