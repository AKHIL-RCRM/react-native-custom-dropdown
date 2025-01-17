import React, {
  useImperativeHandle,
  useMemo,
  useRef,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import DropDownWithDownIcon from '../DropDownWithDownIcon';
import { SelectCountryProps } from './model';
import { styles } from './styles';

const ic_check = require('../../assets/check.png');

const SelectCountryComponent: <T>(
  props: SelectCountryProps<T>
) => ReactElement<any, string | JSXElementConstructor<any>> | null =
  React.forwardRef((props, currentRef) => {
    const {
      data,
      value,
      valueField,
      labelField,
      dropdownField,
      imageField,
      selectedTextStyle,
      imageStyle,
    } = props;
    const ref: any = useRef(null);

    useImperativeHandle(currentRef, () => {
      return { open: eventOpen, close: eventClose };
    });

    const eventOpen = () => {
      ref.current.open();
    };

    const eventClose = () => {
      ref.current.close();
    };

    const _renderItem = (item: any) => {
      return (
        <View style={styles.item}>
          <Text style={[styles.selectedTextStyle, selectedTextStyle]}>
            {item[dropdownField]}
          </Text>
          {value === item[valueField] && <Image
            source={ic_check}
            style={StyleSheet.flatten([
              styles.icon,
              { tintColor: 'gray' }
            ])}
          />}
        </View>
      );
    };

    const selectItem: any = useMemo(() => {
      const index = data.findIndex((e: any) => e[valueField] === value);
      return data[index];
    }, [data, valueField, value]);

    return (
      <DropDownWithDownIcon
        ref={ref}
        {...props}
        renderItem={_renderItem}
        renderLeftIcon={() => {
          if (selectItem?.image) {
            return (
              <Image
                source={selectItem.image}
                style={[styles.image, imageStyle]}
              />
            );
          } else {
            return null;
          }
        }}
      />
    );
  });

export default SelectCountryComponent;
