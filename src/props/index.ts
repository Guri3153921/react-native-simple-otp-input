import { StyleProp, ViewStyle, TextStyle } from 'react-native'
export interface Props {
  length?: number
  value: string
  cursorColor?: string
  allowDigits?: boolean
  boxActiveStyle?: StyleProp<ViewStyle>
  otpCodeStyle?: StyleProp<TextStyle>
  inputBoxStyle?: StyleProp<ViewStyle>
  onChangeText: (value: string) => void
}
