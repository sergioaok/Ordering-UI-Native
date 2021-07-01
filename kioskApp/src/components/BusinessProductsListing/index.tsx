import React from 'react'
import { Dimensions, View } from 'react-native'
import {
  BusinessAndProductList,
  useLanguage,
} from 'ordering-components/native'
import Carousel from 'react-native-snap-carousel';

import { BusinessProductsListingParams, Business, Product } from '../../types'
import { OCard, OText } from '../shared'
import GridContainer from '../../layouts/GridContainer'
import PromoCard from '../PromoCard';
import Spinner from 'react-native-loading-spinner-overlay';

const BusinessProductsListingUI = (props: BusinessProductsListingParams) => {
  const {
    navigation,
    errors,
    businessState,
    categoryState,
    handleChangeSearch,
    categorySelected,
    searchValue,
    handleChangeCategory,
    handleSearchRedirect,
    featuredProducts,
    errorQuantityProducts,
    header,
    logo
  } = props;

  const business: Business = businessState.business;

  const [, t] = useLanguage();

  const _categories:any = business?.original?.categories;
  let _promos:any = [];

  _categories?.forEach((categ:any) => {
    const _featuredProds = categ?.products?.filter((prod:any) => prod.featured);

    if(_featuredProds?.length > 0) {
      _promos = [
        ..._promos,
        ..._featuredProds,
      ]
    }
  });

  const _renderTitle = (title: string): React.ReactElement => (
    <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
      <OText
        size={_dim.width * 0.05}
        weight="bold"
      >
        {title}
      </OText>
    </View>
  );

  const _renderItem = ({item, index} : { item: Product, index: number }) => {
    return (
      <PromoCard
        title={item?.name}
        {...(!!item?.description && { description: item?.description } )}
        image={{uri: item?.images}}
        onPress={() => {
          navigation.navigate('ProductDetails', {
            businessId: business?.api?.businessId,
            businessSlug: business?.slug,
            product: item,
          });
        }}
      />
    );
  }

  const _renderPromos = (): React.ReactElement => (
    <>
      {_renderTitle(t('PROMOS', 'Promos'))}
      
      <Carousel
        keyExtractor={(item:any) => item.id}
        ref={(_) => {}}
        data={_promos}
        renderItem={_renderItem}
        sliderWidth={_dim.width}
        itemWidth={_dim.width * 0.4}
        alwaysBounceHorizontal={false}
        slideStyle={{
          width: _dim.width * 0.45,
          marginLeft: 20,
        }}
        inactiveSlideScale={1}
        snapToAlignment="start"
        activeSlideAlignment="start"
        inactiveSlideOpacity={1}
      />

    </>
  );

  const _renderCategories = (): React.ReactElement => (
    <>    
      {_renderTitle(t('CATEGORIES', 'Categories'))}
        
      <GridContainer>
        {
          _categories.map((category: any) => (
            <OCard
              key={category.id}
              title={category?.name || ''}
              image={{ uri: category?.image}}
              onPress={() => {
                navigation.navigate('Category', {
                  category,
                  categories: business.original.categories,
                  businessId: business?.api?.businessId,
                  businessSlug: business?.slug,
                });
              }}
              titleStyle={{ textAlign: 'center' }}
            />
          ))
        }
      </GridContainer>
    </>
  );

  if (businessState?.error) {
    return <OText>error!</OText>
  }

  return (
    <>
      <Spinner visible={businessState?.loading} />

      {_promos?.length > 0
        && _renderPromos()}
      
      {_categories?.length > 0
        && _renderCategories()}
    </>
  );
}

const _dim = Dimensions.get('window');

export const BusinessProductsListing = (props:any) => {
  const businessProductslistingProps = {
    ...props,
    UIComponent: BusinessProductsListingUI
  }
  return (
    <BusinessAndProductList {...businessProductslistingProps} />
  )
}