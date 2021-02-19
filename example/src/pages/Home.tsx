import React from 'react';
import { Home as HomePage } from '../components/Home';
import { useLanguage } from 'ordering-components/native';
import { Container } from '../layouts/Container'

export const Home = ({navigation}: any) => {
  const [, t] = useLanguage();
  const homeProps = {
    navigation,
    onNavigationRedirect: (page: string) => {
      if (!page) return
      navigation.navigate(page);
    },
    sloganTitle: t('TITLE_HOME', 'Welcome!'),
    sloganSubtitle: t('SUBTITLE_HOME', "Let's start to order food now")
  }

  return (
    <Container>
      <HomePage {...homeProps} />
    </Container>
  );
};

export default Home;