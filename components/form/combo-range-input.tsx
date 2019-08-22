import {
  Box,
  RangeInput,
  TextInput,
  RangeInputProps,
  Text,
} from 'grommet'
import { SFC } from 'react'

export interface ComboRangeInputProps
  extends RangeInputProps {
  label?: string
}

export const ComboRangeInput: SFC<ComboRangeInputProps> = ({
  label,
  ...props
}) => {
  return (
    <Box direction="column">
      {label && <Text as="label">{label}</Text>}
      <Box direction="row" gap="xsmall" align="center">
        <Box flex="grow">
          <RangeInput {...props} />
        </Box>
        <Box flex={false} width="80px">
          <TextInput type="number" {...props} />
        </Box>
      </Box>
    </Box>
  )
}
