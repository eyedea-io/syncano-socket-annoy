import * as S from '@eyedea/syncano'
import Annoy from 'annoy'

interface Args {
  code: string
  state: string
}

class Endpoint extends S.Endpoint {
  async run(
    {response, users}: S.Core,
    {args}: S.Context<Args>
  ) {
    const annoyIndex1 = new Annoy(2, 'euclidean')

    const annoyPath = 'index'

    annoyIndex1.addItem(0, [
      0, // react
      0,
    ])
    annoyIndex1.addItem(1, [
      1, // react
      1,
    ])
    annoyIndex1.addItem(2, [
      0, // react
      0,
    ])
    annoyIndex1.addItem(3, [
      3, // react
      3,
    ])
    annoyIndex1.addItem(4, [
      4, // react
      4,
    ])

    annoyIndex1.build()

    console.log(annoyIndex1.getNNsByVector([4, 4], 5, -1, true))
  }
}

export default ctx => new Endpoint(ctx)
