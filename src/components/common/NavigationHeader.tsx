import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/src/components/common/buttons/BackButton';
import Colors from '@/constants/Colors';
import { useBasketStore } from '@/src/state/useBasketStore';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import CustomButton from '@/src/components/common/CustomButton';

// Props that allow the NavigationHeader to be used standalone (outside of a native stack navigator)
type StandaloneExtras = {
  // title to display in the header
  title?: string;
  // this variable indicates whether to show the back button
  showBack?: boolean;
  onBack?: () => void;
  customStyles?: object;
};

// This element should be used as a header in stack navigator and in standalone pages
type NavigationHeaderProps = Partial<NativeStackHeaderProps> & StandaloneExtras;

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  route,
  options,
  back,
  navigation,
  title,
  onBack,
  customStyles,
  showBack = true,
}) => {
  const router = useRouter();
  const basketStore = useBasketStore();
  const shareNetworkIconSize = 28;

  const canGoBackFromStack = !!back || navigation?.canGoBack?.() === true;

  const handleBack = () => {
    console.warn('handleBack', { hasOnBack: !!onBack, route: route?.name });
    if (typeof onBack === 'function') {
      onBack();
      return;
    }
    if (navigation && canGoBackFromStack) {
      console.warn('goBack triggered');

      navigation.goBack();
      return;
    }
    console.warn('router.back');

    router.back();
  };

  const resolvedTitle = title ?? options?.title ?? route?.name ?? '';
  const isBasketPage = route?.name === 'basket/index';
  const handleShareButton = () => {
    basketStore.handleBasketShare();
  };

  return (
    <SafeAreaView edges={['top']} style={{ ...customStyles, ...styles.header }}>
      {/* Left */}
      <View style={styles.sideLeft}>
        {showBack ? <BackButton onClick={handleBack} /> : null}
      </View>
      {/* Center */}
      <View style={styles.center}>
        <Text style={styles.title} accessibilityRole='header'>
          {resolvedTitle}
        </Text>
        {isBasketPage && (
          <Text style={[styles.title, { paddingLeft: 8 }]}>
            ({basketStore.items.length})
          </Text>
        )}
      </View>
      {/* Right - spacer */}
      {isBasketPage ? (
        <CustomButton
          onPress={handleShareButton}
          customStyles={{
            backgroundColor: Colors.white,
            borderColor: 'transparent',
            padding: 0,
            width: shareNetworkIconSize + 4,
            height: shareNetworkIconSize + 4,
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.ShareNetwork}
            baseStyle={{
              width: shareNetworkIconSize,
              height: shareNetworkIconSize,
              color: Colors.blackMain,
            }}
          />
        </CustomButton>
      ) : (
        <View style={styles.sideRight} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideLeft: {
    height: 40,
    width: 48,
    justifyContent: 'center',
    paddingRight: 8,
  },
  sideRight: {
    width: 48,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  center: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Manrope',
    textAlign: 'center',
    color: Colors.blackMain,
  },
});
