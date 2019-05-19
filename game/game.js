const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
        },
    },
    scene: {
        key: 'map',
        preload: preload,
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);

let map, player, keys, lground, lcoin, text;

function preload() {
    this.load.baseURL = './assets/assets/';

    this.load.image('bg', 'Background/png/2048x1536/All/Sky.png');
    this.load.image('ground', 'Tiles/png/512x512/Grass.png');
    this.load.spritesheet('coin', 'Coin%20Animation/png/2048x256.png', {
        frameWidth: 256,
        frameHeight: 256
    })
    this.load.image('player', 'Character/png/1x/Body.png');
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(.5);

    player = this.physics.add.sprite(0, 0, 'player');
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);

    ground = this.add.tileSprite(0, (768 - 512) * 2, 1024 * 2, 1024, 'ground').setScale(.25);
}

function update() {
    this.physics.add.collider(player, ground);

    if (cursors.left.isDown) {
        player.scaleX = -1;
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.scaleX = 1;
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }
    if (cursors.up.isDown && player.body.touching.down)
        player.setVelocityY(800);
}
