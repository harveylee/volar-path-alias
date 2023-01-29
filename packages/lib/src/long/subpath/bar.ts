import { Foo } from '~/other/subpath/foo'

export class Bar extends Foo {
  y: string

  constructor () {
    super()
    this.y = 'world'
  }
}