import CustomButton from '@/app-example/components/CustomButton'
import BackArrow from '@/app-example/components/ui/BackArrowModified'
import OptionToggle from '@/app-example/components/ui/OptionToggle/OptionToggle'
import { CUSTOM_ICON_REF } from '@/app-example/components/ui/SvgIcons/IconRef'
import SvgIcons from '@/app-example/components/ui/SvgIcons/SvgIcons'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

function ForgotPassword() {
	return (
		<ScrollView style={styles.container}>
			{/* Header */}
			<View style={[styles.row, styles.header]}>
				<BackArrow style={styles.backArrowWrapper} />
				<Text style={styles.headerTitle}>Забули пароль?</Text>
				<Text /> 
			</View>

			{/* Illustration + Title */}
			<View style={styles.centeredColumn}>
				<SvgIcons 
					name={CUSTOM_ICON_REF.ForgotPasswordIllustrations} 
					baseStyle={styles.illustration} 
				/>
				<Text style={styles.subtitle}>Як ви хочете отримати код?</Text>
			</View>

			{/* Options */}
			<View style={[styles.row, styles.optionWrapper]}>
				<OptionToggle title='SMS' baseStyle={{...styles.optionBox, ...styles.shadow,  marginRight: 15 }} textStyle={styles.optionToggleText} />
				<OptionToggle title='Email' baseStyle={{...styles.optionBox, ...styles.shadow, marginLeft: 15 }} textStyle={styles.optionToggleText}/>
			</View>

			{/* Info */}
			<View style={styles.infoWrapper}>
				<Text style={styles.infoText}>Код буде надіслано на:</Text>
				<Text style={styles.infoEmail}>konnovalova@gmail.com</Text>
			</View>

			{/* Buttons */}
			<View style={styles.buttonWrapper}>
				<CustomButton 
					customStyles={{ marginBottom: 10 }} 
					title='Відправити код' 
					onPress={() => { }} 
				/>
				<CustomButton 
					title='Відміна' 
					customStyles={styles.cancelButton} 
					customTextStyles={styles.cancelButtonText} 
					onPress={() => { }} 
				/>
			</View>
		</ScrollView>
	)
}

export default ForgotPassword

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingTop: 20,
		backgroundColor: "#fff",
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	centeredColumn: {
		flexDirection: "column",
		alignItems: "center",
	},

	header: {
		paddingLeft: 12,
	},

	headerTitle: {
		fontSize: 22,
	},

	backArrowWrapper: {
		// Uncomment if needed:
		// position: 'absolute',
		// left: 20,
		// top: 70,
		// zIndex: 1,
	},

	illustration: {
		width: 300,
		height: 300,
	},

	subtitle: {
		textAlign: "center",
		fontSize: 18,
	},

	optionWrapper: {
		justifyContent: "center",
		padding: 30,
	},

	optionBox: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 8,
		width: "50%",
		padding: 20,
	},

	optionToggleText: {
		color: "#8E6CEF",
		fontWeight: "bold",
	},

	shadow: {
		boxShadow: '0 0 10px #00000020'
	},

	infoWrapper: {
		paddingTop: 30,
	},

	infoText: {
		textAlign: "center",
		fontSize: 16,
	},

	infoEmail: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},

	buttonWrapper: {
		padding: 12,
		paddingTop: 20,
	},

	cancelButton: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#8E6CEF",
	},

	cancelButtonText: {
		color: "#170F2B",
	},
})


// import CustomButton from '@/app-example/components/CustomButton'
// import BackArrow from '@/app-example/components/ui/BackArrowModified'
// import OptionToggle from '@/app-example/components/ui/OptionToggle/OptionToggle'
// import { CUSTOM_ICON_REF } from '@/app-example/components/ui/SvgIcons/IconRef'
// import SvgIcons from '@/app-example/components/ui/SvgIcons/SvgIcons'
// import React from 'react'
// import { ScrollView, Text, View } from 'react-native'

// function forgotpassword() {

// 	const style = {
// 		backArrowWrapper: {
// 			// position: 'absolute',
// 			// left: 20,
// 			// top: 70,
// 			// zIndex: 1,
// 		},
// 		backIconCircle: {
// 			backgroundColor: '#AC94E8',
// 			borderRadius: 20,
// 			width: 40,
// 			height: 40,
// 			justifyContent: 'center',
// 			alignItems: 'center',
// 		},
// 	}

// 	return (
// 		<ScrollView style={{ display: "flex", flexDirection: "column", paddingTop: 20, backgroundColor: "#fff" }}>
// 			<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 12 }}>
// 				<BackArrow style={style} />
// 				<Text style={{ fontSize: 22 }}>Забули пароль?</Text>
// 				<Text></Text>
// 			</View>
// 			<View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// 				<SvgIcons name={CUSTOM_ICON_REF.ForgotPasswordIllustrations} baseStyle={{ width: 300, height: 300 }} />
// 				<View style={{}}>
// 					<Text style={{ textAlign: "center", fontSize: 18 }}>Як ви хочете отримати код?</Text>
// 				</View>
// 			</View>
// 			<View style={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: 30 }}>
// 				<OptionToggle title='SMS' baseStyle={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)' // offsetX offsetY blurRadius spreadDistance color
// , shadowColor: "#000", borderWidth: 1, borderColor: "#fff", borderRadius: 8, width: "50%", padding: 20, marginRight: 15 }} />
// 				<OptionToggle title='Email' baseStyle={{ boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)', borderWidth: 1, borderColor: "#fff", borderRadius: 8, width: "50%", padding: 20, marginLeft: 15 }} />
// 			</View>
// 			<View style={{ paddingTop: 30 }}>
// 				<Text style={{ textAlign: "center", fontSize: 16 }}>Код буде надіслано на:</Text>
// 				<Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>konnovalova@gmail.com</Text>
// 			</View>
// 			<View style={{ padding: 12, paddingTop: 20 }}>
// 				<CustomButton customStyles={{ marginBottom: 10 }} title='Відправити код' onPress={() => { }} />
// 				<CustomButton title='Відміна' customStyles={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#8E6CEF" }} customTextStyles={{ color: "#170F2B" }} onPress={() => { }} />
// 			</View>
// 		</ScrollView>
// 	)
// }

// export default forgotpassword