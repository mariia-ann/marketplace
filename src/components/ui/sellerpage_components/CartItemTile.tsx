import React from 'react'
import { Image, Text, View } from 'react-native'
import SvgIcons from '../../common/SvgIcons/SvgIcons';
import { CartItem } from '@/app/(main)/write-to-seller';
import { CUSTOM_ICON_REF } from '../../common/SvgIcons/IconRef';


function CartItemTile(props: CartItem) {
	const { title, price, id, image, quantity, variant, brand, currency } = props;

	const colorDotSize: number = 35;

	return (
		<View style={{ display: "flex", flexDirection: "row", alignItems: "center", borderRadius: 10, marginBottom: 30 }}>
			<Image source={image} style={{height: 140, width: 140}} />
			<View style={{display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: 20, height: 130}}>
				<Text>{title}</Text>
				<Text style={{paddingBottom: 10}}>Ap: {id}</Text>
				<View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
					<Text style={{color: "#8E6CEF"}}>{brand}</Text>
					<SvgIcons name={CUSTOM_ICON_REF.StorefrontIcon} baseStyle={{width: 30, height: 30}} />
				</View>
				<View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
					<View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
						<View style={{ backgroundColor: variant.hex, width: colorDotSize, height: colorDotSize, borderRadius: 1000 }}></View>
						<Text style={{paddingLeft: 10, color: "#666666", fontWeight: "bold"}}>{variant.size ? variant.size + " /" + quantity + " шт." : quantity + "шт." }</Text>
					</View>
					<Text style={{fontWeight: "bold", color: "#170F2B"}}>{price}{currency}</Text>
				</View>
			</View>
		</View>
	)
}

export default CartItemTile