import { SFC } from 'react'
import { Box } from 'grommet'

export const AppBar: SFC<{}> = ({ children }) => {
  return (
    <Box
      tag="header"
      direction="row"
      align="start"
      margin="xsmall"
    >
      {children}
    </Box>
  )
}
