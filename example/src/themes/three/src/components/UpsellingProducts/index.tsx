import React,{ useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  UpsellingPage as UpsellingPageController,
  useUtils,
  useLanguage
} from 'ordering-components/native'
import { OText, OIcon, OModal, OButton } from '../../../../../components/shared'
import { UpsellingProductsParams } from '../../../../../types'
import {
  Container,  
  Item,
  ItemContent,
  Details,
  AddButton,
  CloseUpselling
} from './styles'
import { ProductForm } from '../ProductForm';
import { useTheme } from 'styled-components/native'

const UpsellingProductsUI = (props: UpsellingProductsParams) => {
  const {
    isCustomMode,
    upsellingProducts,
    business,
    handleUpsellingPage,
    openUpselling,
    canOpenUpselling,
    setCanOpenUpselling
  } = props

  const theme = useTheme();

  const styles = StyleSheet.create({
    imageStyle: {
      width: 60,
      height: 60,
      resizeMode: 'cover'
    },
    closeUpsellingButton: {
      borderRadius: 0,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
      borderWidth: 1,
      height: 48,
      marginBottom: 10
    },
    upsellingModal: {
      height: '50%',
      top: 250
    }
  })

  const [actualProduct, setActualProduct] = useState<any>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [{ parsePrice }] = useUtils()
  const [, t] = useLanguage()

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
      <Container showsVerticalScrollIndicator={false}>
        <OText size={20} weight={500} mBottom={30}>
          {t('WANT_SOMETHING_ELSE', 'Do you want something else?')}
        </OText>
        {
          !upsellingProducts.loading && (
            <>
              {
                !upsellingProducts.error ? upsellingProducts.products.map((product: any) => (
                  <Item
                    key={product.id}
                  >
                    <ItemContent>
                      <OIcon
                        url={product.images}
                        style={styles.imageStyle}
                      />
                      <Details>
                        <OText numberOfLines={1} ellipsizeMode='tail'>{product.name}</OText>
                        <OText color={theme.colors.gray}>{parsePrice(product.price)}</OText>
                      </Details>
                    </ItemContent>
                    <AddButton onPress={() => handleFormProduct(product)}>
                      <MaterialComIcon
                        name='plus-circle'
                        color={theme.colors.green}
                        size={24}
                      />
                      <OText style={{ marginLeft: 5 }}>
                        {t('ADD_PRODUCT', 'Add product')}
                      </OText>
                    </AddButton>
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
              <OModal
                entireModal
                open={openUpselling}
                onClose={() => handleUpsellingPage()}
              >
               <UpsellingLayout />
                <CloseUpselling>
                  <OButton
                    imgRightSrc=''
                    text={t('NO_THANKS', 'No Thanks')}
                    style={styles.closeUpsellingButton}
                    textStyle={{ color: theme.colors.white }}
                    onClick={() => handleUpsellingPage()}
                  />
                </CloseUpselling>
              </OModal>
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

export const UpsellingProducts = (props : UpsellingProductsParams) => {
  const upsellingProductsProps = {
    ...props,
    UIComponent: UpsellingProductsUI
  }
  return (
    <UpsellingPageController {...upsellingProductsProps} />
  )
}
