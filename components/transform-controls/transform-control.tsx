import { FC, useState } from 'react'
import {
  TextField,
  withStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@material-ui/core'

import { Transform } from '../../interfaces/transform'
import { ModulatorListControl } from '../modulator-controls/modulator-list-control'
import { OperationListControl } from '../operation-controls/operation-list-control'
import {
  ArrowUpward,
  ArrowDownward,
  Delete,
} from '@material-ui/icons'

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-of-type)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion)

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expanded: {},
})(AccordionSummary)

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexDirection: 'column',
  },
}))(AccordionDetails)

export interface TransformControlProps {
  transform: Transform
  onChange: (transform: Transform) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export const TransformControl: FC<TransformControlProps> = ({
  transform,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <ExpansionPanel
      expanded={isExpanded}
      onChange={(_, e) => setExpanded(e)}
    >
      <ExpansionPanelSummary>
        <TextField
          disabled={!isExpanded}
          value={transform.name}
          onChange={(e) => {
            onChange({
              ...transform,
              name: e.target.value,
            })
          }}
          onClick={(e) => {
            isExpanded && e.stopPropagation()
          }}
        />
        <div>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onMoveUp()
            }}
          >
            <ArrowUpward fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onMoveDown()
            }}
          >
            <ArrowDownward fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ModulatorListControl
          modulators={transform.modulators}
          onChange={(modulators) => {
            onChange &&
              onChange({ ...transform, modulators })
          }}
        />
        <OperationListControl
          operations={transform.operations}
          onChange={(operations) => {
            onChange &&
              onChange({ ...transform, operations })
          }}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
