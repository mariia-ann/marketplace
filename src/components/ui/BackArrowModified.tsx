import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
	style: any;
	onClick?: (e: any) => void;
}

export default function BackArrowModified(props: Props) {
	const { style, onClick } = props;
	const navigation = useNavigation();

	const styles = StyleSheet.create(style);

	const handleOnPressBackButton = (e: any) => {
		navigation.goBack();
		if (typeof onClick === "function") {
			onClick(e);
		}
	}

	return (
		<TouchableOpacity style={styles.backArrowWrapper} onPress={handleOnPressBackButton}>
			<View style={{ ...styles.backIconCircle, backgroundColor: '#AC94E8' }}>
				<CaretLeft size={18} color="#ffffff" weight="bold" />
			</View>
		</TouchableOpacity>
	);
}

