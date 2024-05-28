export const level = {
  dimensions: {
    x: 8,
    y: 8
  },
  map: [
    {
      cell: {
        x: 5,
        y: 3
      },
      actor: {
        class: 'wizard',
        imageId: 'entity-wizard',
        energy: 3,
        maxEnergy: 3,
        health: 3,
        maxHealth: 3,
        range: 3,
        gridPosition: {
          x: 5,
          y: 3
        }
      }
    },
    {
      cell: {
        x: 1,
        y: 1
      },
      actor: {
        class: 'town',
        imageId: 'decal-house',
        energy: 3,
        maxEnergy: 3,
        health: 3,
        maxHealth: 3,
        range: 3,
        gridPosition: {
          x: 1,
          y: 1
        }
      }
    },
    {
      cell: {
        x: 5,
        y: 1
      },
      actor: {
        class: 'skull',
        imageId: 'entity-skull',
        energy: 3,
        maxEnergy: 3,
        health: 3,
        maxHealth: 3,
        gridPosition: {
          x: 5,
          y: 1
        }
      }
    },
    {
      cell: {
        x: 1,
        y: 5
      },
      actor: {
        class: 'skull',
        imageId: 'entity-skull',
        energy: 3,
        maxEnergy: 3,
        health: 3,
        maxHealth: 3,
        gridPosition: {
          x: 1,
          y: 5
        }
      }
    },
    {
      cell: {
        x: 3,
        y: 0
      },
      actor: {
        class: 'skull',
        imageId: 'entity-skull',
        energy: 3,
        maxEnergy: 3,
        health: 3,
        maxHealth: 3,
        gridPosition: {
          x: 3,
          y: 0
        }
      }
    }
  ]
}
