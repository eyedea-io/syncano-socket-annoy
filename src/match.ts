import * as S from '@eyedea/syncano'
import Annoy from 'annoy'
import _get from 'lodash.get'

interface Args {
  model: string
  query: Array<string>
  matchWith: Array<number>
  suggestionsNumber: number
}

class Endpoint extends S.Endpoint {
  async run(
    {response, data}: S.Core,
    {args}: S.Context<Args>
  ) {
    const annoyIndex = new Annoy(args.query.length, 'euclidean')

    const rows = await data[args.model].list()

    rows.forEach((row, i) => {
      annoyIndex.addItem(i, this.serializeRow(row, args.query))
    })

    annoyIndex.build()

    const noOfSuggestions = args.suggestionsNumber > rows.length ? rows.length : args.suggestionsNumber

    const nearest = annoyIndex.getNNsByVector(args.matchWith, noOfSuggestions || 3, -1, true)

    nearest.objects = []
    nearest.neighbors.forEach(neighbors => {
      nearest.objects.push(rows[neighbors])
    })
    delete nearest.neighbors
    response.json(nearest)
  }

  serializeRow(row: object, query: Array<string>) {
    return query.map(field => {
      return _get(row, field)
    })
  }

}

export default ctx => new Endpoint(ctx)
