import {BaseButton} from '@/components/Base/Button/BaseButton';
import {BaseDateTimePicker} from '@/components/Base/DateTimePicker/BaseDateTimePicker';
import {BaseSwitch} from '@/components/Base/Switch/BaseSwitch';
import {BaseTextInput} from '@/components/Base/TextInput/BaseTextInput';
import {BaseThumbnail} from '@/components/Base/Thumbnail/BaseThumbnail';
import {CommonText} from '@/components/Common/CommonText/CommonText';
import {CommonLabel} from '@/components/Common/Label/CommonLabel';
import {SaveButton} from '@/components/TodoDetails/SaveButton/SaveButton';
import todoNotificationService from '@/services/todoNotificationService';
import {changeTodo} from '@/store/todos-reducer/actions';
import {selectTodoById} from '@/store/todos-reducer/selectors';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './TodoDetails.styles';
import {TodoDetailsProps} from './TodoDetails.types';

export const TodoDetails = ({navigation, route}: TodoDetailsProps) => {
  const dispatch = useDispatch();
  const todo = useSelector(selectTodoById(route.params.todoId));
  const [newName, setNewName] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const [notifState, setNotifState] = useState<boolean>(false);

  const [dateInput, setDateInput] = useState<Date>();
  const [timeInput, setTimeInput] = useState<Date>();

  const handleSave = useCallback(() => {
    const todoItem = {...todo, title: newName};
    dispatch(changeTodo(todoItem));
    navigation.goBack();
  }, [todo, newName, dispatch, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton onPress={handleSave} isDisabled={!isDirty} />
      ),
    });
  }, [navigation, handleSave]);

  const getNotifByTodo = async () => {
    const notifItem = await todoNotificationService.getByTodoId(todo.id);
    setDateInput(notifItem?.triggerDate);
    setTimeInput(notifItem?.triggerDate);
    setNotifState(!!notifItem);
  };

  useEffect(() => {
    getNotifByTodo();
  }, []);

  const handlePressThumbnail = (uri: string | undefined) => {
    if (uri) {
      navigation.navigate('ImageFull', {uri, todoId: todo.id});
    }
  };

  const handleSubmitName = (newName: string) => {
    if (newName.length > 0) {
      setNewName(newName);
      setIsDirty(newName !== todo.title);
    }
  };

  const handlePressAdd = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
      },
      ({assets}) => {
        if (assets) {
          dispatch(
            changeTodo({
              ...todo,
              assets: [...todo.assets, ...assets],
            }),
          );
        }
      },
    );
  };

  const handleChangeNotif = async (value: boolean) => {
    setNotifState(value);

    let date;

    if (value) {
      if (dateInput && timeInput) {
        date = new Date(
          dateInput.getFullYear(),
          dateInput.getMonth(),
          dateInput.getDate(),
          timeInput.getHours(),
          timeInput.getMinutes(),
          timeInput.getSeconds(),
        );
      } else {
        date = new Date();
        if (date.getHours() > 12) {
          date.setDate(date.getDate() + 1);
        }
        date.setHours(12);
        date.setMinutes(0);
        date.setSeconds(0);
      }

      await todoNotificationService.createDaily(todo, date);
      setDateInput(date);
      setTimeInput(date);
      return;
    }
    await todoNotificationService.removeByTodoId(todo.id);
    setDateInput(undefined);
    setTimeInput(undefined);
  };

  const minumumDate = new Date();

  // const handleTest = async () => {
  //   console.log('notifList', await todoNotificationService.getAll());
  // };

  return (
    <ScrollView contentContainerStyle={styles.rootContentContainer}>
      {/* <BaseButton onPress={handleTest}>Показать уведомления</BaseButton> */}
      <CommonLabel style={styles.todoLabel}>Название</CommonLabel>
      <CommonText style={styles.section}>{todo.title}</CommonText>
      <CommonLabel style={styles.todoLabel}>Новое название</CommonLabel>
      <BaseTextInput
        value={newName}
        placeholder="название задачи"
        onSubmit={handleSubmitName}
        style={styles.section}
      />
      <CommonLabel style={styles.todoLabel}>Уведомления</CommonLabel>
      <View style={[styles.section, styles.switchWrapper]}>
        <View style={styles.pickerWrapper}>
          <CommonText kind="kind_plain" style={styles.todoLabel}>
            Ежедневно, в 12:00
          </CommonText>
          <CommonText kind="kind_plain" style={styles.todoLabel}>
            или выбрать вручную:
          </CommonText>
          <View style={styles.customNotificationWrapper}>
            <BaseDateTimePicker
              mode="date"
              value={dateInput}
              onChange={setDateInput}
              style={[styles.picker, styles.pickerDate]}
              minimumDate={minumumDate}
            />
            <BaseDateTimePicker
              mode="time"
              value={timeInput}
              onChange={setTimeInput}
              style={[styles.picker, styles.pickerDate]}
              minimumDate={minumumDate}
            />
          </View>
        </View>
        <BaseSwitch value={notifState} onToggle={handleChangeNotif} />
      </View>
      <View style={styles.section}>
        {todo.assets.length > 0 && (
          <>
            <CommonLabel style={styles.todoLabel}>Вложения</CommonLabel>
            <View style={styles.assetsList}>
              {todo.assets.map((asset, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePressThumbnail(asset.uri)}
                  style={styles.assetsItem}>
                  <BaseThumbnail uri={asset.uri} kind="kind_todo_details" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
      <View style={styles.addButtonWrapper}>
        <BaseButton style={styles.addButton} onPress={handlePressAdd}>
          Добавить вложение
        </BaseButton>
      </View>
    </ScrollView>
  );
};
