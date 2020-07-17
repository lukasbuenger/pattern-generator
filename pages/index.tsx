import { useEffect, FC, useState, useMemo } from 'react'
import { Transform } from '../lib/transform/transform'
import { Sequence } from '../lib/sequences'
import { Shape } from '../lib/shapes'

import {
  Layout,
  Header,
  Sidebar,
  Main,
} from '../components/layout'
import { TransformListControl } from '../components/controls/transforms/transform-list-control'
import { SequenceControl } from '../components/controls/sequence-control'
import { ShapeControl } from '../components/controls/shape-control'
import { AppProvider } from '../components/app'
import { AppState } from '../lib/app-state'
import { SVGRenderer } from '../components/renderers/svg-renderer'
import { Polygon } from '../lib/geom'

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

  const appState = useMemo(
    () => ({
      sequence,
      shape,
      transforms,
    }),
    [sequence, shape, transforms],
  )

  const [output, updateOutput] = useState<Polygon[]>(
    AppState.toPolygons(appState),
  )

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
          <button
            onClick={() =>
              updateOutput(AppState.toPolygons(appState))
            }
          >
            Boom
          </button>
        </Sidebar>
        <Main>
          <SVGRenderer polygons={output} />
        </Main>
      </Layout>
    </AppProvider>
  )
}

export default Page
