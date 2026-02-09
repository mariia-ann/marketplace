import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import CreateShop from '@/app/seller_profile/create-shop';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('@/src/components/ui/welcome_page/WelcomeBackground', () => {
  const React = require('react');
  const { View } = require('react-native');
  return function MockWelcomeBackground() {
    return React.createElement(View, { testID: 'welcome-background' });
  };
});

jest.mock('@/src/components/common/buttons/PrimaryButton', () => {
  const React = require('react');
  const { Text } = require('react-native');
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
  const React = require('react');
  const { Text } = require('react-native');
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

    expect(pushMock).toHaveBeenCalledWith('/seller_profile/create-shop/step1');
  });

  it('navigates to seller profile on cancel', () => {
    const { getByText } = render(<CreateShop />);

    fireEvent.press(getByText('Відмовитись'));

    expect(pushMock).toHaveBeenCalledWith('/seller_profile');
  });
});
