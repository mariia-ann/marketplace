import AppleIcon from "./Icons/Apple";
import Eye from "./Icons/Eye";
import Facebook from "./Icons/Facebook";
import Google from "./Icons/Google";
import Info from "./Icons/Info";

export enum CUSTOM_ICON_REF {
	Google = 'Google',
	Facebook = 'Facebook',
	Apple = 'Apple',
	EyeIcon = 'EyeIcon',
	Info = 'Info',
}

export const CustomIconRef:any = {
	[CUSTOM_ICON_REF.Google]: Google,
	[CUSTOM_ICON_REF.Facebook]: Facebook,
	[CUSTOM_ICON_REF.Apple]: AppleIcon,
	[CUSTOM_ICON_REF.EyeIcon]: Eye,
	[CUSTOM_ICON_REF.Info]: Info,
}