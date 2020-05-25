import { FC } from 'react'
import {
  Typography,
  Box,
  IconButton,
  makeStyles,
  Theme,
  Paper,
} from '@material-ui/core'

import {
  Delete,
  ArrowUpward,
  ArrowDownward,
  Add,
} from '@material-ui/icons'
import { Modulator } from '../../../../lib/transform/modulators'

import { ModulatorControl } from './modulator-control'
import { SimpleList } from '../../../../lib/utils/simple-list2'

const useStyles = makeStyles(
  ({ palette, spacing }: Theme) => ({
    operationList: {},
    operationItem: {
      '&:not(:last-of-type)': {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: palette.grey[300],
      },
      padding: spacing(1),
    },
  }),
)

interface ModulatorListConrolProps {
  modulators: Modulator[]
  onChange: (operations: Modulator[]) => void
}

export const ModulatorListControl: FC<ModulatorListConrolProps> = ({
  modulators,
  onChange,
}) => {
  const styles = useStyles()
  const displays = !modulators.length ? (
    <Typography
      className={styles.operationItem}
      color="textSecondary"
    >
      No modulators
    </Typography>
  ) : (
    modulators.map((item, index) => (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={styles.operationItem}
      >
        <div>
          <ModulatorControl
            modulator={item}
            onChange={(o) => {
              onChange(
                SimpleList.updateItem(modulators, index, o),
              )
            }}
          />
        </div>
        <div>
          <IconButton
            size="small"
            onClick={() => {
              onChange(
                SimpleList.moveItemUp(modulators, index),
              )
            }}
          >
            <ArrowUpward fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              onChange(
                SimpleList.moveItemDown(modulators, index),
              )
            }}
          >
            <ArrowDownward fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              onChange(
                SimpleList.removeItem(modulators, index),
              )
            }}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </div>
      </Box>
    ))
  )

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle1" gutterBottom>
          Modulators
        </Typography>
        <IconButton
          size="small"
          onClick={() => {
            onChange(
              SimpleList.addItem(
                modulators,
                Modulator.createDefault(),
              ),
            )
          }}
        >
          <Add />
        </IconButton>
      </Box>
      <Paper
        variant="outlined"
        className={styles.operationList}
      >
        {displays}
      </Paper>
    </div>
  )
}
