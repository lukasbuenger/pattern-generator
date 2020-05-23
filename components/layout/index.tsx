import { FC } from 'react'
import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    width: '100vw',
    height: '100vh',
    gridTemplateAreas: `"header header"
                       "sidebar  main"`,
    gridTemplateRows: `${theme.mixins.toolbar.minHeight}px 1fr`,
    gridTemplateColumns: '250px 1fr',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
  },
  main: {
    gridArea: 'main',
  },
}))

export const Layout: FC = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.container}>{children}</div>
}

export const Header: FC = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.header}>{children}</div>
}

export const Sidebar: FC = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.sidebar}>{children}</div>
}

export const Main: FC = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.main}>{children}</div>
}
