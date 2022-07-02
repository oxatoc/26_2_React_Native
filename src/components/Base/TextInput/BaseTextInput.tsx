import {COLORS} from '@/constants/colors';
import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from './BaseTextInput.styles';
import {BaseTextInputProps} from './BaseTextInput.types';

export const BaseTextInput = ({
  value = '',
  placeholder = '',
  onSubmit = () => {},
  style,
  disabled = false,
}: BaseTextInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const onSubmitEditing = () => {
    if (inputValue) {
      onSubmit(inputValue);
      setInputValue(value);
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <View style={style}>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={placeholder}
        placeholderTextColor={COLORS.cadetGrey}
        onSubmitEditing={onSubmitEditing}
        style={[styles.input, focused ? styles.focused : styles.unfocused]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectTextOnFocus={!disabled}
        editable={!disabled}
      />
    </View>
  );
};
