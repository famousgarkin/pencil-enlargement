var pencilEnlargement = {
    start: function(game) {
        game.state.add('play', this.Play)
        game.state.start('play')
    }
}

pencilEnlargement.Pencil = function(game) {
    var scale = 1
    var scaleIncrement = 0.1
    var scaleDecrement = 0.3
    var sprite = this.sprite = new Phaser.Sprite(game, game.world.centerX, game.world.centerY, 'pencil')
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    sprite.inputEnabled = true
    sprite.events.onInputDown.add(function () {
        scale += scaleIncrement
    })
    sprite.update = function () {
        if (scale > 1) {
            scale -= scaleDecrement * game.time.physicsElapsed
        }
        sprite.scale.x = scale
        sprite.scale.y = scale
    }
}

pencilEnlargement.Play = function() {
    this.pencil = null
}
pencilEnlargement.Play.prototype = {
    init: function() {
        this.game.stage.backgroundColor = '#fff'
        this.input.maxPointers = 1
    },
    preload: function() {
        this.load.image('pencil', 'pencil.png')
    },
    create: function() {
        this.pencil = new pencilEnlargement.Pencil(this.game)
        this.game.add.existing(this.pencil.sprite)
    },
}

;(function () {
    var game = new Phaser.Game('100', '100')
    pencilEnlargement.start(game)
}())
