import { NotImplementedError } from '../engine/errors.js'

export default class Deck {
  card = null

  constructor() {
    this.card = this.#createDeck()
  }

  #createDeck() {
    // TODO: create a random a deck
    return [

    ]
  }

  shuffle() {
    throw new NotImplementedError('Not yet implemented')
  }
}
