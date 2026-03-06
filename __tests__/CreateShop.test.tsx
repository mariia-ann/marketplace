import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import CreateShop from '@/app/(seller)/create-shop';
import { View, Text } from 'react-native';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('@/src/components/ui/welcome_page/WelcomeBackground', () => {
  return function MockWelcomeBackground() {
    return React.createElement(View, { testID: 'welcome-background' });
  };
});

jest.mock('@/src/components/common/buttons/PrimaryButton', () => {
  return function MockPrimaryButton({
    title,
    onPress,
  }: {
    title: string;
    onPress?: () => void;
  }) {
    return React.createElement(Text, { onPress }, title);
  };
});

jest.mock('@/src/components/common/buttons/SecondaryButton', () => {
  return function MockSecondaryButton({
    title,
    onPress,
  }: {
    title: string;
    onPress?: () => void;
  }) {
    return React.createElement(Text, { onPress }, title);
  };
});

describe('CreateShop', () => {
  const pushMock = router.push as jest.Mock;

  beforeEach(() => {
    pushMock.mockClear();
  });

  it('renders title and buttons', () => {
    const { getByText } = render(<CreateShop />);

    expect(getByText('створіть свій магазин')).toBeTruthy();
    expect(getByText('Почати')).toBeTruthy();
    expect(getByText('Відмовитись')).toBeTruthy();
  });

  it('navigates to step1 on start', () => {
    const { getByText } = render(<CreateShop />);

    fireEvent.press(getByText('Почати'));

    expect(pushMock).toHaveBeenCalledWith('/(seller)/create-shop/step1');
  });

  it('navigates to seller profile on cancel', () => {
    const { getByText } = render(<CreateShop />);

    fireEvent.press(getByText('Відмовитись'));

    expect(pushMock).toHaveBeenCalledWith('/(seller)');
  });
});
