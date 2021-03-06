import React from 'react';
import { ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';

import { OButton, OIcon, OText } from '../shared';
import { Container, InnerContainer } from './styles';

const OptionCard = (props: Props) => {
	const theme = useTheme();

	return (
		<TouchableOpacity
			onPress={props.onClick}
		>
			<Container
				source={props.bgImage}
				style={props.style}
			>
				<InnerContainer
					style={props.innerStyle}
				>
					<OIcon
						src={props.icon}
						style={{ marginBottom: 10, ...props?.iconStyle }}
					/>

					<OText
						weight="700"
						color="white"
						size={20}
						mBottom={10}
						style={props.titleStyle}
					>
						{props.title}
					</OText>

					<OText
						color="white"
						mBottom={20}
						style={{ width: 200, ...props?.descriptionStyle }}
					>
						{props.description}
					</OText>

					<OButton
						bgColor="transparent"
						borderColor="transparent"
						text={props.callToActionText}
						textStyle={{
							marginLeft: 0,
							fontWeight: '700',
							...props.callToActionTextStyle,
						}}
						imgRightStyle={{
							position: 'relative',
							left: 8,
							width: 24,
							height: 24,
							...props.callToActionIconStyle,
						}}
						imgRightSrc={
							props.callToActionIcon || theme.images.general.arrow_right_circular_outlined
						}
						style={{ justifyContent: 'flex-start', paddingLeft: 0 }}
					/>
				</InnerContainer>
			</Container>
		</TouchableOpacity>
	);
}

interface Props {
	title: string;
	titleStyle?: TextStyle;
	description: string;
	descriptionStyle?: TextStyle;
  isDisabled?: boolean;
  onClick?: () => void;
	style?: ViewStyle;
  bgImage: ImageSourcePropType;
	innerStyle?: ViewStyle;
  icon: ImageSourcePropType;
	iconStyle?: ImageStyle;
	callToActionText: string;
	callToActionTextStyle?: TextStyle;
	callToActionIcon?: ImageSourcePropType;
	callToActionIconStyle?: ImageStyle;
}

export default OptionCard;
  