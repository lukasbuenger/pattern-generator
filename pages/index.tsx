import { useEffect, FC, useState } from 'react'
import {
  Layout,
  Header,
  Sidebar,
} from '../components/layout'

import { ShapeControl } from '../components/control/shape-control'
import { Transform } from '../lib/transform/transform'
import { TransformListControl } from '../components/control/transforms/transform-list-control'
import { Sequence } from '../lib/sequences'
import { SequenceControl } from '../components/control/sequence-control'
import { Shape } from '../lib/shapes'

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

  return (
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
  )
}

export default Page
