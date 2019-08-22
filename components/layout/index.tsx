import { SFC } from 'react'
import { Box, Grid } from 'grommet'

export const Layout: SFC<{}> = ({ children }) => {
  return (
    <Grid
      fill
      rows={['auto', 'auto']}
      columns={['medium', 'auto']}
      gap="small"
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'sidebar', start: [0, 1], end: [0, 1] },
        { name: 'canvas', start: [1, 1], end: [1, 1] },
      ]}
    >
      {children}
    </Grid>
  )
}

export const Header: SFC<{}> = ({ children }) => {
  return (
    <Box gridArea="header" tag="header">
      {children}
    </Box>
  )
}

export const Sidebar: SFC<{}> = ({ children }) => {
  return (
    <Box gridArea="sidebar" tag="div">
      {children}
    </Box>
  )
}

export const Canvas: SFC<{}> = ({ children }) => {
  return (
    <Box gridArea="canvas" tag="div">
      {children}
    </Box>
  )
}
