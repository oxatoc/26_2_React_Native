import dateMapper from '@/mappers/dateMapper';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {BaseTextInput} from '../TextInput/BaseTextInput';
import {DatePickerProps} from './BaseDateTimePicker.types';

export const BaseDateTimePicker = ({
  onChange,
  mode = 'date',
  value,
  style,
  minimumDate,
}: DatePickerProps) => {
  const handleChangePicker = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (selectedDate) {
      selectedDate.setSeconds(0);

      onChange(selectedDate);
    }
  };

  const handlePress = () => {
    let pickerValue = value;
    if (!pickerValue) {
      pickerValue = new Date();
    }

    DateTimePickerAndroid.open({
      value: pickerValue,
      onChange: handleChangePicker,
      mode,
      is24Hour: true,
      minimumDate,
    });
  };

  const [visibleValue, setVisibleValue] = useState('');

  useEffect(() => {
    switch (mode) {
      case 'date':
        setVisibleValue(dateMapper.getDdMmYy(value));
        break;
      case 'time':
        setVisibleValue(dateMapper.getHhMmSs(value));
        break;
    }
  }, [value]);

  return (
    <Pressable style={style} onPress={handlePress}>
      <BaseTextInput
        placeholder={mode === 'time' ? 'Время' : 'Дата'}
        disabled={true}
        value={visibleValue}
      />
    </Pressable>
  );
};
