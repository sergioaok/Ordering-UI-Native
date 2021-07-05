import React from 'react';
import { Platform, Text } from 'react-native';
import { useOrder, useLanguage } from 'ordering-components/native';

import { Checkout } from '../components/Checkout';
import { ToastType, useToast } from '../providers/ToastProvider';
import { SafeAreaContainer } from '../layouts/SafeAreaContainer';

const PaymentMethodsPage = (props:any): React.ReactElement => {
  
	const {
    navigation,
    cartUuid,
    route,
	} = props;

  const checkoutProps = {
    ...props,
    cartUuid: cartUuid || route?.params?.cartUuid,
    onPlaceOrderClick: async (data: any, paymethod: any, cart: any) => {
      if (cart?.order?.uuid) {
        navigation.reset({
          routes: [{ name: 'OrderDetails', params: { orderId: cart.order?.uuid, isFromCheckout: true } }],
        });
        return
      }
    },
    onNavigationRedirect: (page: string, params: any) => {
      if (!page) return
      navigation.navigate(page, params);
    }
  }

  return (
    <SafeAreaContainer>
      <Checkout {...checkoutProps} />
    </SafeAreaContainer>
	);
};

export default PaymentMethodsPage;