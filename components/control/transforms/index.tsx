import { FC } from 'react'
import { useSimpleList } from '../../../lib/utils/simple-list'
import {
  Typography,
  Box,
  IconButton,
  Link,
} from '@material-ui/core'

import {
  Delete,
  ArrowUpward,
  ArrowDownward,
} from '@material-ui/icons'

type Transform = { name: string }

interface TransformControlProps {
  transforms: Transform[]
}

export const TransformControl: FC<TransformControlProps> = ({
  transforms,
}) => {
  const [list, methods] = useSimpleList(transforms)

  const onAdd = () => {
    methods.addItem({ name: 'foo' })
  }
  const createOnRemove = (index: number) => () => {
    methods.removeItem(index)
  }
  const createOnMoveUp = (index: number) => () => {
    methods.moveItemUp(index)
  }
  const createOnMoveDown = (index: number) => () => {
    methods.moveItemDown(index)
  }

  const displays = list.map((item, index) => (
    <Box
      key={index}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Typography>{item.name}</Typography>
      <div>
        <IconButton
          size="small"
          onClick={createOnMoveUp(index)}
        >
          <ArrowUpward fontSize="inherit" />
        </IconButton>
        <IconButton
          size="small"
          onClick={createOnMoveDown(index)}
        >
          <ArrowDownward fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={createOnRemove(index)}
          size="small"
        >
          <Delete fontSize="inherit" />
        </IconButton>
      </div>
    </Box>
  ))
  return (
    <Box>
      {displays}
      <Box display="flex">
        <Link
          component="button"
          variant="body2"
          onClick={onAdd}
        >
          Add new transform
        </Link>
      </Box>
    </Box>
  )
}
