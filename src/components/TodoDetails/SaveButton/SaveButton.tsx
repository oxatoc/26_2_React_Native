import {CommonButtonLayout} from '@/components/Common/ButtonLayout/CommonButtonLayout';
import {COLORS} from '@/constants/colors';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {styles} from './SaveButton.styles';
import {SaveButtonProps} from './SaveButton.types';

export const SaveButton = ({onPress, isDisabled = false}: SaveButtonProps) => {
  return (
    <CommonButtonLayout
      onPress={onPress}
      style={styles.root}
      isDisabled={isDisabled}>
      <Svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <Path
          d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
          fill={COLORS.lightRoyalBlue}
        />
      </Svg>
    </CommonButtonLayout>
  );
};
