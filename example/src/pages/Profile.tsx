import * as React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { UserProfileForm as ProfileController } from '../components/UserProfileForm';
import { Container } from '../layouts/Container'
import theme from '../theme.json';

const KeyboardView = styled.KeyboardAvoidingView`
  flex-grow: 1;
`;
interface Props {
  navigation: any;
  route: any;
}

const Profile = (props: Props) => {
  const profileProps = {
    ...props,
    theme,
    useSessionUser: true,
    useValidationFields: true,
    goToBack: () => props.navigation?.canGoBack() && props.navigation.goBack(),
    onNavigationRedirect: (route: string, params: any) => props.navigation.navigate(route, params)
  }

  return (
    <>
      <KeyboardView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Container>
          <ProfileController {...profileProps} />
        </Container>
      </KeyboardView>
    </>
  );
};

export default Profile;
