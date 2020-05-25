import { FC } from 'react'
import { Box, Typography, Button } from '@material-ui/core'

import { Transform } from '../../../lib/transform/transform'
import { SimpleList } from '../../../lib/utils/simple-list2'

import { TransformControl } from './transform-control'
import { Add } from '@material-ui/icons'

interface TransformListControlProps {
  transforms: Transform[]
  onChange: (transforms: Transform[]) => void
}

export const TransformListControl: FC<TransformListControlProps> = ({
  transforms,
  onChange,
}) => {
  const displays = transforms.map((item, index) => (
    <TransformControl
      key={index}
      transform={item}
      onChange={(o) => {
        onChange(
          SimpleList.updateItem(transforms, index, o),
        )
      }}
      onMoveUp={() => {
        onChange(SimpleList.moveItemUp(transforms, index))
      }}
      onMoveDown={() => {
        onChange(SimpleList.moveItemDown(transforms, index))
      }}
      onRemove={() => {
        onChange(SimpleList.removeItem(transforms, index))
      }}
    />
  ))

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={1}
      >
        <Typography variant="h5">Transforms</Typography>
        <Button
          color="primary"
          size="small"
          onClick={() => {
            onChange(
              SimpleList.addItem(
                transforms,
                Transform.create(),
              ),
            )
          }}
          startIcon={<Add />}
        >
          Add new
        </Button>
      </Box>
      <div>{displays}</div>
    </div>
  )
}
