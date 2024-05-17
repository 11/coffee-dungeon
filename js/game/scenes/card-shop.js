import ScreenUtils from '../../engine/gfx/screen-utils.js'
import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import Viewport from '../../engine/gfx/viewport.js'

export default class CardShop {
  deck = null
  onSale = null
  shapeRenderer = null

  constructor() {
    this.shapeRenderer = new ShapeRenderer()

    this.deck = this.#createDeck()
    this.onSale = []
  }

  initialize() {

  }

  /**
   *
   * @returns {Array<Card>} an array of cards to buy from in the shop
   */
  #createDeck() {
    const deck = []
    for (const card of CARDS) {
      deck.push(card)
    }

    return deck
  }

  #shuffle() {

  }

  update() {

  }

  draw(ctx) {
    ScreenUtils.clear(ctx)

    const padding = Viewport.Width - (152 * 5)
    this.shapeRenderer.FillStyle = 'red'
    this.shapeRenderer.begin()
    this.shapeRenderer.drawRectangle(Viewport.Left, Viewport.Top + 16, 152, 200)
    this.shapeRenderer.drawRectangle(Viewport.Left + (152 + 129), Viewport.Top + 16, 152, 200)
    this.shapeRenderer.drawRectangle(Viewport.Left + (3 * 129), Viewport.Top + 16, 152, 200)
    this.shapeRenderer.drawRectangle(Viewport.Left + (4 * 129), Viewport.Top + 16, 152, 200)
    this.shapeRenderer.drawRectangle(Viewport.Left + (5 * 129), Viewport.Top + 16, 152, 200)
    this.shapeRenderer.end()
  }
}

const CARDS = [
  {
    'range-up': {
      type: 'range',
      name: 'range up',
      description: 'increases range attack by 1 tile',
      imageId: null,
      shopValue: 3,
      sellValue: 1,
      ability: ({ character }) => {
        if (!character) {
          console.error(`range-up character is falsey - character: ${character}`)
        }

        return character.range += 1
      },
    }
  },
  {
    'attack-up-by-card-count': {
      type: 'attack',
      name: 'attack up by card count',
      description: 'attack is increased by the number of cards on table',
      imageId: null,
      shopValue: 3,
      sellValue: 1,
      ability: ({ cardsInHand, character }) => {
        if (!character) {
          console.error(`attack up by cards count - character is falsey - character: ${character}`)
        }

        if (!cardsInHand || cardsInHand.length === 0) {
          console.error(`attack up by card count - cardsInHand is falsey - character: ${cardsInHand}`)
        }

        character.attack += cardsInHand.length
      }
    }
  },
  {
    'shield': {
      type: 'defense',
      name: 'shield',
      description: 'the initial hit on this character causes no damage',
      imageId: null,
      shopValue: 3,
      sellValue: 1,
      ability: ({ character, attack }) => {
        if (!character) {
          console.error(`shield - character is falsey - character: ${character}`)
        }

        if (character.hitCount == 0) {
          return true
        }

        return false
      }
    }
  },
  {
    'loot': {
      type: 'money',
      name: 'loot',
      description: 'this card sells for 3 gold',
      imageId: null,
      shopValue: 3,
      sellValue: 3,
    }
  },
  {
    'spell-cast-hp-bump': {
      type: 'health',
      name: 'spell case hp bump',
      description: 'any spells cast during the round increase a random units health by 1 permanently',
      imageId: null,
      shopValue: 3,
      sellValue: 1,
      ability: ({ characters }) => {
        const randIdx = Math.floor(Math.random() * characters.length) + 1
        character[randIdx].health += 1
      }
    }
  },
  {
    'attack-twice': {
      type: 'attack',
      name: 'attack twice',
      imageId: null,
      description: 'a selected character\'s attack happens twice',
      shopValue: 3,
      sellvalue: 1,
      ability: () => {}
    }
  },
  {
    'strong-attack-after-skipping': {
      type: 'attack',
      name: '3x attack after recieving damage',
      imageId: null,
      description: 'a selected unit gains 3x attack after recieving damage',
      shopValue: 3,
      sellValue: 1,
      ability: () => {}
    }
  },
]