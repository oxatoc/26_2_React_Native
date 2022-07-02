import React from 'react';
import {Image} from 'react-native';
import {styles} from './BaseThumbnail.styles';
import {BaseThumbnailProps} from './BaseThumbnail.types';

export const BaseThumbnail = ({
  style,
  uri,
  kind = 'kind_default',
}: BaseThumbnailProps) => (
  <Image
    style={[styles.image, styles[kind], style]}
    source={{uri}}
    resizeMode="contain"
    resizeMethod="resize"
  />
);
