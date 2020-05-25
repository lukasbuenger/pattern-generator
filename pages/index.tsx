import { useEffect, FC, useState } from 'react'
import { Transform } from '../lib/transform/transform'
import { Sequence } from '../lib/sequences'
import { Shape } from '../lib/shapes'

import {
  Layout,
  Header,
  Sidebar,
} from '../components/layout'
import { TransformListControl } from '../components/control/transforms/transform-list-control'
import { SequenceControl } from '../components/control/sequence-control'
import { ShapeControl } from '../components/control/shape-control'
import { AppProvider } from '../components/app'

const Page: FC = () => {
  useEffect(() => {
    document.getElementById('jss-server-side')?.remove()
  }, [])

  const [transforms, updateTransforms] = useState<
    Transform[]
  >([])

  const [sequence, updateSequence] = useState<Sequence>(
    Sequence.createDefault(),
  )
  const [shape, updateShape] = useState<Shape>(
    Shape.createDefault(),
  )

  const appState = {
    sequence,
    shape,
    transforms,
  }

  return (
    <AppProvider state={appState}>
      <Layout>
        <Header>Hellow App!</Header>
        <Sidebar>
          <ShapeControl
            shape={shape}
            onChange={updateShape}
          />
          <SequenceControl
            sequence={sequence}
            onChange={updateSequence}
          />
          <TransformListControl
            transforms={transforms}
            onChange={updateTransforms}
          />
        </Sidebar>
      </Layout>
    </AppProvider>
  )
}

export default Page
