import { useEffect, FC, useState } from 'react'
import {
  Layout,
  Header,
  Sidebar,
} from '../components/layout'

import { GridControl } from '../components/control/grid'
import { ShapeControl } from '../components/control/shape'
import { useGrid } from '../components/state/grid'
import { Transform } from '../lib/transform/transform'
import { TransformListControl } from '../components/control/transforms/transform-list-control'

const Page: FC = () => {
  const [grid, onGridChange] = useGrid()

  const [transforms, updateTransforms] = useState<
    Transform[]
  >([])

  useEffect(() => {
    document.getElementById('jss-server-side')?.remove()
  }, [])

  return (
    <Layout>
      <Header>Hellow App!</Header>
      <Sidebar>
        <ShapeControl />
        <GridControl
          onChange={onGridChange}
          width={grid.width}
          height={grid.height}
          spacing={grid.spacing}
        />
        <TransformListControl
          transforms={transforms}
          onChange={updateTransforms}
        />
      </Sidebar>
    </Layout>
  )
}

export default Page
