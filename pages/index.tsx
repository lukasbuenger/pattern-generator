import {
  Layout,
  Header,
  Sidebar,
  Canvas,
} from '../components/layout'

import { Renderer } from '../components/renderer'
import { GridControl } from '../components/control/grid'
import { useGrid } from '../components/state/grid'

import { polygon, vertex } from '../lib/geom'

const a = vertex(20, 20, 20)
const b = vertex(700, 20, 20)
const c = vertex(400, 300, 20)
const d = vertex(300, 150, 50)
const e = vertex(200, 300, 20)

const poly = polygon(a, b, c, d, e)

export default () => {
  const [grid, onGridChange] = useGrid()
  return (
    <Layout>
      <Header>Hellow App!</Header>
      <Sidebar>
        <GridControl
          onChange={onGridChange}
          width={grid.width}
          height={grid.height}
          spacing={grid.spacing}
        />
      </Sidebar>
      <Canvas>
        <Renderer polygons={[poly]} />
      </Canvas>
    </Layout>
  )
}
