import React, { FC, useRef, useState, useEffect, useCallback } from 'react'
import { validateIsDigit } from './utils'
import { View, Text, Pressable, Animated, TextInput, StyleSheet } from 'react-native'
import { Props } from './props'
/**
 * 
 * @param onChangeText - prop is a callback function that is called whenever the OTP (One-Time Password) input value changes
   @param inputBoxStyle - prop is used to customize the style of each individual input box in the OTP (One-Time Password) component. 
   It allows you to override the default styling of the input boxes and apply your own custom styles
   @param otpCodeStyle - prop is used to customize the style of the OTP code text inside each input box
  in the OTP (One-Time Password) component. It allows you to override the default styling of the OTP
  code text and apply your own custom styles
   @param length - The `length` prop is used to specify the number of input boxes in the OTP (One-Time Password)
  component. It determines the length of the OTP code that the user needs to enter. By default, the
  length is set to 4.
   @param cursorColor - The `cursorColor` prop is used to specify the color of the cursor in the OTP (One-Time Password)
  input field. By default, it is set to `#7C3AED`, which is a shade of purple.
   @param boxActiveStyle - The `boxActiveStyle` prop is used to customize the style of the active input box.
   @param allowDigits -  The `allowDigits` prop is used to determine whether only digits are allowed as input in the OTP
  (One-Time Password) input field. If `allowDigits` is set to `true` (which is the default value),
  the input field will only accept numeric digits. If `allowDigits` is set to `false`, the input
  field will accept any character.
   * 
 * @returns 
 */

const SimpleOtpInput: FC<Props> = ({
  onChangeText,
  inputBoxStyle,
  otpCodeStyle,
  length = 4,
  cursorColor = '#7C3AED',
  boxActiveStyle,
  allowDigits = true,
}) => {
  const inputRef = useRef<TextInput>()
  const opacityValue = useRef(new Animated.Value(0)).current
  const [otpValue, setOtpValue] = useState<string>('')
  const [inputFocus, setInputFocus] = useState<boolean>(false)

  useEffect(() => {
    toggleBlink()
  }, [otpValue])

  /**
   * The function `handleOTPChange` updates the OTP value and calls a callback function with the updated
   * value.
   * @param {string} value - The value parameter is a string that represents the new value of the OTP
   * (One-Time Password) input field.
   */
  const handleOTPChange = (value: string) => {
    const val = allowDigits ? validateIsDigit(value) : value
    setOtpValue(val)
    onChangeText(val)
  }

  const toggleBlink = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 100 },
    ).start()
  }

  const setCursorIndex = useCallback(
    (index: number) => {
      const inputValue = otpValue.slice(0, index)
      setOtpValue(inputValue)
      inputRef.current.focus()
    },
    [otpValue],
  )
  return (
    <View style={[styles.wrapper, styles.wrapperCommon]}>
      <View style={[styles.otpBoxWrapper, styles.wrapperCommon]}>
        {[...Array(length)].map((_, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setCursorIndex(index)
            }}
            style={[
              styles.wrapperCommon,
              inputBoxStyle || styles.otpBox,
              otpValue[index] && (boxActiveStyle || styles.otpBoxFocus),
            ]}
          >
            <Text style={[otpCodeStyle || styles.otpCode]}>{otpValue[index] || ''}</Text>
            {otpValue.length === index && inputFocus ? (
              <Animated.View style={[styles.cursor, { opacity: opacityValue, backgroundColor: cursorColor }]} />
            ) : (
              <View />
            )}
          </Pressable>
        ))}
      </View>
      <TextInput
        ref={inputRef}
        value={otpValue}
        caretHidden={true}
        maxLength={length}
        keyboardType='numeric'
        returnKeyType='done'
        style={styles.textInput}
        onChangeText={handleOTPChange}
        onBlur={() => setInputFocus(false)}
        onFocus={() => setInputFocus(true)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperCommon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
  },
  otpBoxWrapper: {
    flexDirection: 'row',
  },
  otpBox: {
    width: 44,
    height: 48,
    borderBottomWidth: 1,
    marginLeft: 3,
    borderBottomColor: '#D1D5DB',
  },
  otpCode: {
    fontSize: 24,
  },
  otpBoxFocus: {
    borderBottomColor: '#7C3AED',
  },
  textInput: {
    width: 1,
    height: 1,
    opacity: 0,
  },
  cursor: {
    width: 1,
    height: 25,
    position: 'absolute',
  },
})

export default SimpleOtpInput
