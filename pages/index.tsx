import { Accordion, AccordionPanel } from 'grommet'

import {
  Layout,
  Header,
  Sidebar,
} from '../components/layout'

import { GridControl } from '../components/control/grid'
import { ShapeControl } from '../components/control/shape'
import { useGrid } from '../components/state/grid'

export default () => {
  const [grid, onGridChange] = useGrid()
  return (
    <Layout>
      <Header>Hellow App!</Header>
      <Sidebar>
        <Accordion multiple={true}>
          <AccordionPanel label="Grid">
            <GridControl
              onChange={onGridChange}
              width={grid.width}
              height={grid.height}
              spacing={grid.spacing}
            />
          </AccordionPanel>
          <AccordionPanel label="Shape">
            <ShapeControl />
          </AccordionPanel>
        </Accordion>
      </Sidebar>
    </Layout>
  )
}
