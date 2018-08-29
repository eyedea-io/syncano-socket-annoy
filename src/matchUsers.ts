import * as S from '@eyedea/syncano'

interface Args {
  id: string
}

class Endpoint extends S.Endpoint {
  async run(
    {response, users}: S.Core,
    {args}: S.Context<Args>
  ) {
    const usersObject = await users
      .fields([
        'id',
        'image72',
        'title',
        'realName',
      ])
      .find(args.id)
    response.json(usersObject)
  }
}

export default ctx => new Endpoint(ctx)
