/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import App from '../components/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-awesome-card-io', () => {
  return {
    CardIOUtilities: {
      preload: jest.fn(() => Promise.resolve('the response')),
    },
  }
})

it('renders correctly', () => {
  renderer.create(<App />);
});
