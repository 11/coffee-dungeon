import { Vector2 } from '../engine/math/Vector2'
import { GridActorAttributes } from './actors/grid-actor'

interface LevelCell {
  gridPosition: Vector2,
  terrain: 'Grass' | 'Stone' | 'Water'
}

export interface Level {
  dimensions: Vector2
  cells: LevelCell[]
  actors: GridActorAttributes[]
}

export const level: Level = {
  dimensions: new Vector2(8, 8),
  cells: [
    {
      gridPosition: new Vector2(0, 0),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(0, 1),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(0, 2),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(0, 3),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(0, 4),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(0, 5),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(0, 6),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(0, 7),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(1, 0),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(1, 1),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(1, 2),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(1, 3),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(1, 4),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(1, 5),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(1, 6),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(1, 7),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(2, 1),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(2, 2),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(2, 3),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(2, 4),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(2, 5),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(2, 6),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(2, 7),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(3, 0),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(3, 1),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(3, 2),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(3, 3),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(3, 4),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(3, 5),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(3, 6),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(3, 7),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(4, 1),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(4, 2),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(4, 3),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(4, 4),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(4, 5),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(4, 6),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(4, 7),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(5, 0),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(5, 1),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(5, 2),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(5, 3),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(5, 4),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(5, 5),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(5, 6),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(5, 7),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(6, 0),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(6, 1),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(6, 2),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(6, 3),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(6, 4),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(6, 5),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(6, 6),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(6, 7),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(7, 0),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(7, 1),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(7, 2),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(7, 3),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(7, 4),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(7, 5),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(7, 6),
      terrain: 'Grass'
    },
    {
      gridPosition: new Vector2(7, 7),
      terrain: 'Grass'
    },
  ],
  actors: [
    {
      class: 'wizard',
      imageId: 'entity-wizard',
      energy: 3,
      maxEnergy: 3,
      health: 3,
      maxHealth: 3,
      range: 3,
      gridPosition: new Vector2(5, 3)
    },
    {
      class: 'town',
      imageId: 'decal-house',
      energy: 3,
      maxEnergy: 3,
      health: 3,
      maxHealth: 3,
      range: 3,
      gridPosition: new Vector2(1, 1)
    },
    {
      class: 'skull',
      imageId: 'entity-skull',
      energy: 3,
      maxEnergy: 3,
      health: 3,
      maxHealth: 3,
      range: 3,
      gridPosition: new Vector2(5, 1)
    },
    {
      class: 'skull',
      imageId: 'entity-skull',
      energy: 3,
      maxEnergy: 3,
      health: 3,
      maxHealth: 3,
      range: 0,
      gridPosition: new Vector2(1, 5)
    },
    {
      class: 'skull',
      imageId: 'entity-skull',
      energy: 3,
      maxEnergy: 3,
      health: 3,
      maxHealth: 3,
      range: 0,
      gridPosition: new Vector2(3, 0)
    }
  ]
}
