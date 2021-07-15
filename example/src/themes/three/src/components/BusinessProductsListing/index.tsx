import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  BusinessAndProductList,
  useLanguage,
  useOrder,
  useSession,
  useUtils
} from 'ordering-components/native'
import { OButton, OModal, OText } from '../../../../../components/shared'
import { BusinessBasicInformation } from '../BusinessBasicInformation'
import { SearchBar } from '../SearchBar'
import { BusinessProductsCategories } from '../../../../../components/BusinessProductsCategories'
import { BusinessProductsList } from '../BusinessProductsList'
import { BusinessProductsListingParams } from '../../../../../types'
import {
  WrapHeader,
  TopHeader,
  AddressInput,
  WrapSearchBar,
  WrapContent,
  BusinessProductsListingContainer
} from './styles'
import { colors, images } from '../../../../../theme.json'
import { FloatingButton } from '../../../../../components/FloatingButton'
import { ProductForm } from '../../../../../components/ProductForm'
import { UpsellingProducts } from '../../../../../components/UpsellingProducts'
import { BusinessInformation } from '../../../../../components/BusinessInformation'

const BusinessProductsListingUI = (props: BusinessProductsListingParams) => {
  const {
    navigation,
    errors,
    businessState,
    categoryState,
    handleChangeSearch,
    categorySelected,
    searchValue,
    handleSearchRedirect,
    featuredProducts,
    errorQuantityProducts,
    header,
    logo,
    productModal,
    handleChangeCategory,
    setProductLogin,
    updateProductModal
  } = props

  const [, t] = useLanguage()
  const [{ auth }] = useSession()
  const [orderState] = useOrder()
  const [{ parsePrice }] = useUtils()
  const { business, loading, error } = businessState
  const [openBusinessInformation, setOpenBusinessInformation] = useState(false)
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false)
  const [curProduct, setCurProduct] = useState(null)
  const [openUpselling, setOpenUpselling] = useState(false)
  const [canOpenUpselling, setCanOpenUpselling] = useState(false)

  const currentCart: any = Object.values(orderState.carts).find((cart: any) => cart?.business?.slug === business?.slug) ?? {}

  const onRedirect = (route: string, params?: any) => {
    navigation.navigate(route, params)
  }

  const onProductClick = (product: any) => {
    setCurProduct(product)
  }

  const handleCancel = () => {
    setIsOpenSearchBar(false)
    handleChangeSearch('')
  }

  const handleCloseProductModal = () => {
    setCurProduct(null)
    updateProductModal && updateProductModal(null)
  }

  const handlerProductAction = () => {
    handleCloseProductModal()
  }

  const handleUpsellingPage = () => {
    onRedirect('CheckoutNavigator', {
      screen: 'CheckoutPage',
      cartUuid: currentCart?.uuid,
      businessLogo: logo,
      businessName: business?.name,
      cartTotal: currentCart?.total
    })
    setOpenUpselling(false)
  }

  return (
    <>
      <BusinessProductsListingContainer
        style={styles.mainContainer}
        isActiveFloatingButtom={currentCart?.products?.length > 0 && categoryState.products.length !== 0}
      >
        <WrapHeader>
          {!loading && business?.id && (
            <TopHeader>
              <View style={{ ...styles.headerItem, flex: 1 }}>
                <TouchableOpacity
                  onPress={() => (navigation?.canGoBack() && navigation.goBack()) || (auth && navigation.navigate('BottomTab'))}
                  style={styles.iconBtn}
                >
                  <MaterialComIcon
                    name='arrow-left'
                    color={colors.black}
                    size={24}
                  />
                </TouchableOpacity>
                <AddressInput
                  onPress={() => auth
                    ? onRedirect('AddressList', { isGoBack: true, isFromProductsList: true })
                    : onRedirect('AddressForm', { address: orderState.options?.address })}
                >
                  <OText color={colors.black} numberOfLines={1}>
                    {orderState?.options?.address?.address}
                  </OText>
                </AddressInput>
                <TouchableOpacity
                  onPress={() => setOpenBusinessInformation(true)}
                  style={styles.iconBtn}
                >
                  <MaterialComIcon
                    name='dots-horizontal'
                    color={colors.black}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </TopHeader>
          )}
          
          {/* {!errorQuantityProducts && (
            <View style={{ ...styles.headerItem }}>
              <TouchableOpacity
                onPress={() => setIsOpenSearchBar(true)}
                style={styles.searchIcon}
              >
                <MaterialIcon
                  name='search'
                  color={colors.white}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          )}
          {isOpenSearchBar && (
            <WrapSearchBar>
              <SearchBar
                onSearch={handleChangeSearch}
                onCancel={() => handleCancel()}
                isCancelXButtonShow
                noBorderShow
                placeholder={t('SEARCH_PRODUCTS', 'Search Products')}
                lazyLoad={businessState?.business?.lazy_load_products_recommended}
              />
            </WrapSearchBar>
          )}  */}
          <BusinessBasicInformation
            businessState={businessState}
            header={header}
            logo={logo}
          />
        </WrapHeader>
        {!loading && business?.id && (
          <>
            {!(business?.categories?.length === 0) && (
              <BusinessProductsCategories
                categories={[{ id: null, name: t('ALL', 'All') }, { id: 'featured', name: t('FEATURED', 'Featured') }, ...business?.categories.sort((a: any, b: any) => a.rank - b.rank)]}
                categorySelected={categorySelected}
                onClickCategory={handleChangeCategory}
                featured={featuredProducts}
              />
            )}
            <WrapContent>
              <BusinessProductsList
                categories={[
                  { id: null, name: t('ALL', 'All') },
                  { id: 'featured', name: t('FEATURED', 'Featured') },
                  ...business?.categories.sort((a: any, b: any) => a.rank - b.rank)
                ]}
                category={categorySelected}
                categoryState={categoryState}
                businessId={business.id}
                errors={errors}
                onProductClick={onProductClick}
                handleSearchRedirect={handleSearchRedirect}
                featured={featuredProducts}
                searchValue={searchValue}
                handleClearSearch={handleChangeSearch}
                errorQuantityProducts={errorQuantityProducts}
                handleCancelSearch={handleCancel}
              />
            </WrapContent>
          </>
        )}
        {loading && !error && (
          <>
            <BusinessProductsCategories
              categories={[]}
              categorySelected={categorySelected}
              onClickCategory={handleChangeCategory}
              featured={featuredProducts}
              loading={loading}
            />
            <WrapContent>
              <BusinessProductsList
                categories={[]}
                category={categorySelected}
                categoryState={categoryState}
                isBusinessLoading={loading}
                errorQuantityProducts={errorQuantityProducts}
              />
            </WrapContent>
          </>
        )}
      </BusinessProductsListingContainer>
      {!loading && auth && currentCart?.products?.length > 0 && categoryState.products.length !== 0 && (
        <FloatingButton
          btnText={
            currentCart?.subtotal >= currentCart?.minimum
              ? !openUpselling ? t('VIEW_ORDER', 'View Order') : t('LOADING', 'Loading')
              : `${t('MINIMUN_SUBTOTAL_ORDER', 'Minimum subtotal order:')} ${parsePrice(currentCart?.minimum)}`
          }
          isSecondaryBtn={currentCart?.subtotal < currentCart?.minimum}
          btnLeftValueShow={currentCart?.subtotal >= currentCart?.minimum && !openUpselling && currentCart?.products?.length > 0}
          btnRightValueShow={currentCart?.subtotal >= currentCart?.minimum && !openUpselling && currentCart?.products?.length > 0}
          btnLeftValue={currentCart?.products?.length}
          btnRightValue={parsePrice(currentCart?.total)}
          disabled={openUpselling || currentCart?.subtotal < currentCart?.minimum}
          handleClick={() => setOpenUpselling(true)}
        />
      )}
      <OModal
        open={!!curProduct || (!!productModal.product && !orderState.loading)}
        onClose={handleCloseProductModal}
        entireModal
        customClose
      >
        <ProductForm
          product={curProduct || productModal.product}
          businessSlug={business?.slug}
          businessId={business?.id || productModal?.product?.category?.business_id}
          onClose={handleCloseProductModal}
          navigation={navigation}
          onSave={handlerProductAction}
          setProductLogin={setProductLogin}
        />
      </OModal>
      <OModal
        titleSectionStyle={styles.modalTitleSectionStyle}
        open={openBusinessInformation}
        onClose={() => setOpenBusinessInformation(false)}
        styleCloseButton={{color: colors.white, backgroundColor: 'rgba(0,0,0,0.3)'}}
        isNotDecoration
      >
        <BusinessInformation
          businessState={businessState}
          business={business}
        />
      </OModal>
      {openUpselling && (
        <UpsellingProducts
          businessId={currentCart?.business_id}
          business={currentCart?.business}
          cartProducts={currentCart?.products}
          handleUpsellingPage={handleUpsellingPage}
          openUpselling={openUpselling}
          canOpenUpselling={canOpenUpselling}
          setCanOpenUpselling={setCanOpenUpselling}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    width: 40,
    height: 40,
    color: '#FFF',
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  searchIcon: {
    borderWidth: 0,
    color: '#FFF',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 24,
    padding: 15,
    justifyContent: 'center'
  },
  modalTitleSectionStyle: {
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 100
  }
})

export const BusinessProductsListing = (props: BusinessProductsListingParams) => {
  const businessProductslistingProps = {
    ...props,
    UIComponent: BusinessProductsListingUI
  }
  return (
    <BusinessAndProductList {...businessProductslistingProps} />
  )
}
