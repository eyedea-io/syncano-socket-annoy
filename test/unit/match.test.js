/* global describe it */
import {run} from '@syncano/test'

describe('generate', function () {
  it('simple match', async () => {

    require('@syncano/core').__setMocks({
      data: {
        profiles: {
          list: jest.fn().mockImplementationOnce((eventName, params) => {
            return Promise.resolve([
              {username: 'qk', react: 10, js: 2, css: 3},
              {username: 'nik', react: 1, js: 1, css: 3},
              {username: 'gustavo', react: 5, js: 3, css: 7},
              {username: 'pedro', react: 2, js: 2, css: 4}
            ])
          })
        }
      }
    })
    const args = {
      model: 'profiles',
      query: ['react', 'js'],
      matchWith: [10,3]
    }
    const result = await run('match', {args})
    expect(result).toHaveProperty('code', 200)
    expect(result.data).toHaveProperty('objects')
    expect(result.data).toHaveProperty('distances')
  })

  it('match with number of suggestions', async () => {

    require('@syncano/core').__setMocks({
      data: {
        profiles: {
          list: jest.fn().mockImplementationOnce((eventName, params) => {
            return Promise.resolve([
              {username: 'qk', react: 10, js: 2, css: 3},
              {username: 'nik', react: 1, js: 1, css: 3},
              {username: 'gustavo', react: 5, js: 3, css: 7},
              {username: 'pedro', react: 2, js: 2, css: 4}
            ])
          })
        }
      }
    })

    const args = {
      model: 'profiles',
      query: ['react', 'js'],
      matchWith: [10,3],
      suggestionsNumber: 1
    }

    const result = await run('match', {args})
    expect(result).toHaveProperty('code', 200)
    expect(result.data).toHaveProperty('objects')
    expect(result.data).toHaveProperty('distances')
    expect(result.data.objects.length == 1)
  })

  it('match with number of suggestions biger than list length', async () => {

    require('@syncano/core').__setMocks({
      data: {
        profiles: {
          list: jest.fn().mockImplementationOnce((eventName, params) => {
            return Promise.resolve([
              {username: 'qk', react: 10, js: 2, css: 3},
              {username: 'nik', react: 1, js: 1, css: 3},
              {username: 'gustavo', react: 5, js: 3, css: 7},
              {username: 'pedro', react: 2, js: 2, css: 4}
            ])
          })
        }
      }
    })

    const args = {
      model: 'profiles',
      query: ['react', 'js'],
      matchWith: [10,3],
      suggestionsNumber: 5
    }

    const result = await run('match', {args})
    expect(result).toHaveProperty('code', 200)
    expect(result.data).toHaveProperty('objects')
    expect(result.data).toHaveProperty('distances')
    expect(result.data.objects.length == 4)
  })
})
