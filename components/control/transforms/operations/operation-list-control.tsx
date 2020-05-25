import { FC } from 'react'
import {
  Box,
  IconButton,
  makeStyles,
  Theme,
  Typography,
  Paper,
} from '@material-ui/core'

import {
  Delete,
  ArrowUpward,
  ArrowDownward,
  Add,
} from '@material-ui/icons'
import { Operation } from '../../../../lib/transform/operations'

import { OperationControl } from './operation-control'
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

interface OperationListControlProps {
  operations: Operation[]
  onChange: (operations: Operation[]) => void
}

export const OperationListControl: FC<OperationListControlProps> = ({
  operations,
  onChange,
}) => {
  const styles = useStyles()
  const displays = !operations.length ? (
    <Typography
      className={styles.operationItem}
      color="textSecondary"
    >
      No operations
    </Typography>
  ) : (
    operations.map((item, index) => (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={styles.operationItem}
      >
        <div>
          <OperationControl
            operation={item}
            onChange={(o) => {
              onChange(
                SimpleList.updateItem(operations, index, o),
              )
            }}
          />
        </div>
        <div>
          <IconButton
            size="small"
            onClick={() => {
              onChange(
                SimpleList.moveItemUp(operations, index),
              )
            }}
          >
            <ArrowUpward fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              onChange(
                SimpleList.moveItemDown(operations, index),
              )
            }}
          >
            <ArrowDownward fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              onChange(
                SimpleList.removeItem(operations, index),
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
          Operations
        </Typography>
        <IconButton
          size="small"
          onClick={() => {
            onChange(
              SimpleList.addItem(
                operations,
                Operation.createDefault(),
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
