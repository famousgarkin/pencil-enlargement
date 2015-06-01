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
        this.game.stage.backgroundColor = 0xffffff
        this.input.maxPointers = 1
    },
    preload: function() {
        this.load.image('pencil', 'pencil.png')
    },
    create: function() {
        this.game.add.text(25, 20, 'Pencil Enlargement', {
            font: '30pt Georgia',
        })
        this.game.add.text(25, 70, 'It works! Add inches in seconds!', {
            font: '15pt Georgia',
            fill: 'gray',
        })
        this.game.add.text(25, this.game.world.height - 100, 'Click the pencil to make it bigger.\nSpeed and persistence bring best results.\nEnlarge until satisfied, or till it crashes the browser or something.', {
            font: '12pt Georgia',
            fill: 'gray',
        })
        this.pencil = new pencilEnlargement.Pencil(this.game)
        this.game.add.existing(this.pencil.sprite)
    },
}

;(function () {
    var game = new Phaser.Game('100', '100')
    pencilEnlargement.start(game)
}())
