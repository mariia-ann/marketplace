// ILLUSTRTIONS
import ForgotPasswordIllustration from "./Icons/Illustrations/ForgotPasswordIllustrations";

//ICONS
import AppleIcon from "./Icons/Apple";
import Eye from "./Icons/Eye";
import Facebook from "./Icons/Facebook";
import Google from "./Icons/Google";
import Info from "./Icons/Info";
import ImageIcon from "./Icons/ImageIcon";
import StorefrontIcon from "./Icons/StorefrontIcon";
import Camera from "./Icons/Camera";

export enum CUSTOM_ICON_REF {
	Google = 'Google',
	Facebook = 'Facebook',
	Apple = 'Apple',
	EyeIcon = 'EyeIcon',
	Info = 'Info',
	ImageIcon = 'ImageIcon',
	StorefrontIcon = 'StorefrontIcon',
	ForgotPasswordIllustrations = 'ForgotPasswordIllustrations',
	Camera = 'Camera'
}

export const CustomIconRef:any = {
	[CUSTOM_ICON_REF.Google]: Google,
	[CUSTOM_ICON_REF.Facebook]: Facebook,
	[CUSTOM_ICON_REF.Apple]: AppleIcon,
	[CUSTOM_ICON_REF.EyeIcon]: Eye,
	[CUSTOM_ICON_REF.Info]: Info,
	[CUSTOM_ICON_REF.ImageIcon]: ImageIcon,
	[CUSTOM_ICON_REF.StorefrontIcon]: StorefrontIcon,
	[CUSTOM_ICON_REF.ForgotPasswordIllustrations]: ForgotPasswordIllustration,
	[CUSTOM_ICON_REF.Camera]: Camera
}