import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    style: any;
}

export default function BackArrowModified(props: Props) {
    const {style} = props;
    const navigation = useNavigation();

    const styles = StyleSheet.create(style);
    
    return (
        <TouchableOpacity style={styles.backArrowWrapper} onPress={() => navigation.goBack()}>
            <View style={styles.backIconCircle}>
                <CaretLeft size={18} color="#ffffff" weight="bold" />
            </View>
        </TouchableOpacity>
    );
}

