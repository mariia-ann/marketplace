import { AntDesign } from '@expo/vector-icons';

interface Props {
	name?: any;
	color?: string;
	size?: number;
}

function AntIcons(props: Props) {
	const { name, color, size } = props;
	return (
		<AntDesign name={name} size={size} color={color} />
	)
}

export default AntIcons;