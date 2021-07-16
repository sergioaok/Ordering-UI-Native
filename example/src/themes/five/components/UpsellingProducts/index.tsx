import React,{ useState, useEffect } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  UpsellingPage as UpsellingPageController,
  useUtils,
  useLanguage
} from 'ordering-components/native'
import { OText, OIcon, OModal, OBottomPopup, OButton } from '../../../../components/shared'
import { colors, images } from '../../theme.json'
import { UpsellingProductsParams } from '../../../../types'
import {
  Container,
  UpsellingContainer,
  Item,
  Details,
  AddButton,
  CloseUpselling,
  TopBar,
  TopActions
} from './styles'
import { ProductForm } from '../ProductForm';
import { OrderSummary } from '../OrderSummary';
import { ScrollView } from 'react-native-gesture-handler';
import NavBar from '../NavBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UpsellingProductsUI = (props: UpsellingProductsParams) => {
  const {
    isCustomMode,
    upsellingProducts,
    business,
	 cart,
    handleUpsellingPage,
	 handleCloseUpsellingPage,
    openUpselling,
    canOpenUpselling,
    setCanOpenUpselling
  } = props
  const [actualProduct, setActualProduct] = useState<any>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [{ parsePrice }] = useUtils()
  const [, t] = useLanguage()
  const { bottom } = useSafeAreaInsets()

  useEffect(() => {
    if (!isCustomMode) {
      if (upsellingProducts?.products?.length && !upsellingProducts.loading) {
        setCanOpenUpselling && setCanOpenUpselling(true)
      }
      if ((!upsellingProducts?.products?.length && !upsellingProducts.loading && !canOpenUpselling && openUpselling) ||
          (!upsellingProducts?.products?.length && !upsellingProducts.loading && openUpselling)) {
            handleUpsellingPage && handleUpsellingPage()
      }
    }
  }, [upsellingProducts.loading, upsellingProducts?.products.length])

  const handleFormProduct = (product: any) => {
    setActualProduct(product)
    setModalIsOpen(true)
  }

  const handleSaveProduct = () => {
    setActualProduct(null)
    setModalIsOpen(false)
  }

  const UpsellingLayout = () => {
    return (
      <Container>
        <UpsellingContainer
          horizontal
          showsHorizontalScrollIndicator={false}
			 contentContainerStyle={{paddingHorizontal: 40}}
        >
          {
            !upsellingProducts.loading && (
              <>
                {
                  !upsellingProducts.error ? upsellingProducts.products.map((product: any) => (
                    <Item key={product.id}>
                      <View style={{flexBasis: '57%'}}>
								<Details>
									<OText size={12} lineHeight={18} numberOfLines={1} ellipsizeMode='tail'>{product.name}</OText>
									<OText size={12} lineHeight={18} color={colors.textNormal}>{parsePrice(product.price)}</OText>
								</Details>
								<AddButton onPress={() => handleFormProduct(product)}>
									<OText size={10} color={colors.primary}>{t('ADD', 'Add')}</OText>
								</AddButton>
							 </View>
							 <View style={{}}>
                      	<OIcon url={product.images} style={styles.imageStyle} />
							 </View>
                    </Item>
                  )) : (
                    <OText>
                      {upsellingProducts.message}
                    </OText>
                  )
                }
              </>
            )
          }
        </UpsellingContainer>
      </Container>
    )
  }

  return (
	  <>
		{isCustomMode ? (
        <UpsellingLayout />
      ) : (
        <>
          {!canOpenUpselling || upsellingProducts?.products?.length === 0 ? null : (
            <>
            {!modalIsOpen && (
				  <OBottomPopup
                title={''}
                open={openUpselling}
                onClose={() => handleUpsellingPage()}
              >
					  <TopBar>
						<TopActions onPress={() => handleCloseUpsellingPage()}>
							<OIcon src={images.general.arrow_left} width={15} />
						</TopActions>
						<TopActions style={styles.cancelBtn} onPress={() => handleCloseUpsellingPage()}>
							<OText size={12} color={colors.textSecondary}>{t('CANCEL', 'Cancel')}</OText>
						</TopActions>
					  </TopBar>
					  <ScrollView style={{marginBottom: bottom + 16}} showsVerticalScrollIndicator={false}>
					  	<View style={{paddingHorizontal: 40}}>
							<OText size={20} lineHeight={30} weight={600} style={{marginTop: 10, marginBottom: 17}}>{t('YOUR_CART', 'Your cart')}</OText>
							<OrderSummary
								cart={cart}
								isCartPending={cart?.status === 2}
								isFromCheckout
							/>
						  </View>
						<View style={{height: 8, backgroundColor: colors.backgroundGray100, marginHorizontal: -40, marginBottom: 23}} />
						<View style={{paddingHorizontal: 40, overflow: 'visible'}}>
							<OText size={16} lineHeight={24} weight={'500'}>{t('WANT_SOMETHING_ELSE', 'Do you want something else?')}</OText>
							<UpsellingLayout />
							<CloseUpselling>
								<OButton
								imgRightSrc=''
								text={t('CHECKOUT', 'Checkout')}
								style={styles.closeUpsellingButton}
								textStyle={{color: colors.white, fontSize: 14}}
								onClick={() => handleUpsellingPage()}
								/>
							</CloseUpselling>
						</View>
					  </ScrollView>
              </OBottomPopup>
            )}
            </>
          )}
        </>
      )}
      <OModal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        entireModal
        customClose
      >
        {actualProduct && (
         <ProductForm
          product={actualProduct}
          businessId={actualProduct?.api?.businessId}
          businessSlug={business.slug}
          onSave={() => handleSaveProduct()}
          onClose={() => setModalIsOpen(false)}
        />
        )}
      </OModal>
	 </>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 73,
    height: 73,
    resizeMode: 'cover',
    borderRadius: 7.6,
  },
  closeUpsellingButton: {
    borderRadius: 7.6,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderWidth: 1,
    height: 44,
    marginBottom: 10,
	 shadowOpacity: 0
  },
  cancelBtn: {
	paddingHorizontal: 18,
	borderWidth: 1,
	borderRadius: 7.6,
	borderColor: colors.textSecondary,
	height: 38
  }
})

export const UpsellingProducts = (props : UpsellingProductsParams) => {
  const upsellingProductsProps = {
    ...props,
    UIComponent: UpsellingProductsUI
  }
  return (
    <UpsellingPageController {...upsellingProductsProps} />
  )
}
