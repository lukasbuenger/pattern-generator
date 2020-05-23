import { useEffect, FC } from 'react'
import {
  Layout,
  Header,
  Sidebar,
} from '../components/layout'

import { GridControl } from '../components/control/grid'
import { ShapeControl } from '../components/control/shape'
import { useGrid } from '../components/state/grid'

const Page: FC = () => {
  const [grid, onGridChange] = useGrid()

  useEffect(() => {
    document.getElementById('jss-server-side')?.remove()
  }, [])

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
        <ShapeControl />
      </Sidebar>
    </Layout>
  )
}

export default Page
