var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        parent: "myGame",
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);
var platforms;
var clown;
var won;
var cursors;
var spacebar;
var cam;
var rope;
var score = 0;
var scoreDisplay;
var gameOver = false;
var monkey, monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, moneky7;
var fireball, fireball1, fireball2, fireball3, fireball4;
var monkeyAll;
var fireballAll;
var starsAll;
var imageAll;
var soundJump;
var soundCollect;
var soundGameOver;
var song;

//Loading images for the game
function preload() {

    //Background
    this.load.image('bg', '/Images/bg.jpg');
    //Rope
    this.load.image('rope', '/Images/rope.png');
    //Cloud
    this.load.image('platform', '/Images/platform.png');
    //Finish
    this.load.image('finish', '/Images/finish.png');
    //Star
    this.load.image('star', '/Images/star.png');
    //Monkey
    this.load.spritesheet('monkey', '/Images/monkey.png', { frameWidth: 93.50, frameHeight: 67 });
    //Fireball
    this.load.image('fireball', '/Images/fireball.png');
    //Clown
    this.load.spritesheet('clown', '/Images/clown.png', { frameWidth: 23.62, frameHeight: 32 });
    //Jump sound
    this.load.audio('jump', '/Sound/jump.mp3');
    //Collect stars sound
    this.load.audio('collect', '/Sound/star.mp3');
    //Game Over sound
    this.load.audio('gameOver', '/Sound/gameover.mp3');
    //Game song
    this.load.audio('song', '/Sound/song.mp3');
}

//Create world
function create() {

    //Set camera and world bounds to the size 1920 * 2
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1200);
    this.physics.world.setBounds(0, 0, 1920 * 2, 1200);

    //Mash 2 images togheter to create background
    this.add.image(0, 0, 'bg').setOrigin(0);
    this.add.image(1920, 0, 'bg').setOrigin(0).setFlipX(true);

    //Add sounds
    soundJump = this.sound.add('jump');
    soundCollect = this.sound.add('collect');
    soundGameOver = this.sound.add('gameOver');
    song = this.sound.add('song');
    song.play();

    //Create rope
    rope = this.physics.add.staticGroup();
    rope.create(0, 1200, 'rope').setScale(2).refreshBody();

    //Create platforms
    platforms = this.physics.add.staticGroup();
    //First group of platforms
    platforms.create(800, 800, 'platform').setScale(0.5).refreshBody();
    platforms.create(1000, 700, 'platform').setScale(0.5).refreshBody();
    platforms.create(1200, 800, 'platform').setScale(0.5).refreshBody();
    //Second group of platforms
    platforms.create(1900, 800, 'platform').setScale(0.2).refreshBody();
    platforms.create(2050, 700, 'platform').setScale(0.5).refreshBody();
    platforms.create(2200, 800, 'platform').setScale(0.2).refreshBody();
    //Platform
    platforms.create(3000, 750, 'platform').setScale(0.5).refreshBody();
    //Finish
    platforms.create(3775, 840, 'finish').setScale(0.5).refreshBody();

    //Create character 
    clown = this.physics.add.sprite(100, 450, 'clown').setScale(1.8);
    clown.setBounce(0.2);
    clown.setCollideWorldBounds(true);

    //Create follow camera
    this.cameras.main.startFollow(clown);
    this.cameras.main.followOffset.set(-5, 0);

    //Clown sprite sheet when walking left
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('clown', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    //Clown sprite sheet when standing
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'clown', frame: 5 }],
        frameRate: 20
    });
    //Clown sprite sheet when walking right
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('clown', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //Create cursors keys
    cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Create stars
    //First group of stars
    var stars  = this.physics.add.staticGroup({ key: 'star', repeat: 5, setXY: { x: 730, y: 780, stepX: 30 } });
    var stars1 = this.physics.add.staticGroup({ key: 'star', repeat: 5, setXY: { x: 1125, y: 780, stepX: 30 } });
    var stars2 = this.physics.add.staticGroup({ key: 'star', repeat: 5, setXY: { x: 925, y: 680, stepX: 30 } });

    //Second group of stars
    var stars3 = this.physics.add.staticGroup({ key: 'star', repeat: 1, setXY: { x: 1885, y: 780, stepX: 30 } });
    var stars4 = this.physics.add.staticGroup({ key: 'star', repeat: 5, setXY: { x: 1975, y: 675, stepX: 30 } });
    var stars5 = this.physics.add.staticGroup({ key: 'star', repeat: 1, setXY: { x: 2185, y: 780, stepX: 30 } });

    //Third group of stars
    var stars6 = this.physics.add.staticGroup({ key: 'star', repeat: 5, setXY: { x: 2922, y: 730, stepX: 30 } });
    var stars7 = this.physics.add.staticGroup({ key: 'star', repeat: 5, setXY: { x: 2922, y: 700, stepX: 30 } });
    var stars8 = this.physics.add.staticGroup({ key: 'star', repeat: 5, setXY: { x: 2922, y: 670, stepX: 30 } });

    //Add monkeys
    monkey  = this.physics.add.sprite(600, 450, 'monkey').setScale(0.8);
    monkey1 = this.physics.add.sprite(955, 450, 'monkey').setScale(0.8);
    monkey2 = this.physics.add.sprite(1300, 450, 'monkey').setScale(0.8);
    monkey3 = this.physics.add.sprite(1800, 450, 'monkey').setScale(0.8);
    monkey4 = this.physics.add.sprite(2200, 450, 'monkey').setScale(0.8);
    monkey5 = this.physics.add.sprite(2600, 450, 'monkey').setScale(0.8);
    monkey6 = this.physics.add.sprite(3100, 450, 'monkey').setScale(0.8);
    monkey7 = this.physics.add.sprite(3600, 450, 'monkey').setScale(0.8);

    this.anims.create({
        key: 'monkeyLeft',
        frames: this.anims.generateFrameNumbers('monkey', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'monkeyRight',
        frames: this.anims.generateFrameNumbers('monkey', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //Add fireballs
    fireball = this.physics.add.image(950, 450, 'fireball');
    fireball1 = this.physics.add.image(2000, 450, 'fireball');
    fireball2 = this.physics.add.image(2950, 450, 'fireball');
    fireball3 = this.physics.add.image(600, 450, 'fireball');
    fireball4 = this.physics.add.image(1920, 450, 'fireball');

    //Score
    scoreDisplay = this.add.text(0, 630, 'Points:', { fontSize: '32px', fill: '#000' });

    //Won 
    won = this.add.text(3290, 800, 'You Won', { fontSize: '60px', fill: '#000' });
    won.visible = false;

    //Create collider between clown and rope 
    this.physics.add.collider(clown, platforms);
    this.physics.add.collider(clown, rope);

    //Create collider between monkeys and rope
    monkeyAll = [monkey, monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7];

    for (var i = 0; i < monkeyAll.length; i += 1) {
        this.physics.add.collider(monkeyAll[i], rope);
    }

    //Create collider between fireballs and platforms
    fireballAll = [fireball, fireball1, fireball2, fireball3, fireball4];

    for (var i = 0; i < fireballAll.length; i += 1) {
        this.physics.add.collider(fireballAll[i], platforms);
    }
    //Create collider between fireballs and rope
    this.physics.add.collider(fireball3, rope);
    this.physics.add.collider(fireball4, rope);


    //Checks to see if the clown overlaps with the stars, if it does call the collectStar function
    starsAll = [stars, stars1, stars2, stars3, stars4, stars5, stars6, stars7, stars8];

    for (var i = 0; i < starsAll.length; i += 1) {
        this.physics.add.overlap(clown, starsAll[i], collectStar, null, this);
    }

    //Checks to see if the clown overlaps with the monkeys and fireballs, if it does call the catchClown function
    for (i = 0; i < monkeyAll.length; i += 1) {
        this.physics.add.collider(clown, monkeyAll[i], catchClown, null, this);
    }

    for (i = 0; i < fireballAll.length; i += 1) {
        this.physics.add.collider(clown, fireballAll[i], catchClown, null, this);
    }
}

//Update
function update() {
    
    //Update score fromm local storage
    updateScore(score)

    //Monkey 
    if (monkey.x < 605) {
        monkey.setVelocityX(50);
        monkey.anims.play('monkeyRight', true);
    }
    if (monkey.x > 700) {
        monkey.setVelocityX(-50);
        monkey.anims.play('monkeyLeft', true);
    }
    //Monkey 1
    if (monkey1.x < 960) {
        monkey1.setVelocityX(50);
        monkey1.anims.play('monkeyRight', true);
    }
    if (monkey1.x > 1060) {
        monkey1.setVelocityX(-50);
        monkey1.anims.play('monkeyLeft', true);
    }
    //Monkey 2
    if (monkey2.x < 1305) {
        monkey2.setVelocityX(50);
        monkey2.anims.play('monkeyRight', true);
    }
    if (monkey2.x > 1400) {
        monkey2.setVelocityX(-50);
        monkey2.anims.play('monkeyLeft', true);
    }
    //Monkey 3
    if (monkey3.x < 1805) {
        monkey3.setVelocityX(50);
        monkey3.anims.play('monkeyRight', true);
    }
    if (monkey3.x > 1900) {
        monkey3.setVelocityX(-50);
        monkey3.anims.play('monkeyLeft', true);
    }
    //Monkey 4
    if (monkey4.x < 2205) {
        monkey4.setVelocityX(50);
        monkey4.anims.play('monkeyRight', true);
    }
    if (monkey4.x > 2300) {
        monkey4.setVelocityX(-50);
        monkey4.anims.play('monkeyLeft', true);
    }
    //Monkey 5
    if (monkey5.x < 2605) {
        monkey5.setVelocityX(50);
        monkey5.anims.play('monkeyRight', true);
    }
    if (monkey5.x > 2700) {
        monkey5.setVelocityX(-50);
        monkey5.anims.play('monkeyLeft', true);
    }
    //Monkey 6
    if (monkey6.x < 3105) {
        monkey6.setVelocityX(50);
        monkey6.anims.play('monkeyRight', true);
    }
    if (monkey6.x > 3200) {
        monkey6.setVelocityX(-50);
        monkey6.anims.play('monkeyLeft', true);
    }
    //Monkey 7
    if (monkey7.x < 3605) {
        monkey7.setVelocityX(50);
        monkey7.anims.play('monkeyRight', true);
    }
    if (monkey7.x > 3700) {
        monkey7.setVelocityX(-50);
        monkey7.anims.play('monkeyLeft', true);
    }

    //Fireball
    if (fireball.x < 955) {
        fireball.setVelocityX(50);
    }
    if (fireball.x > 1055) {
        fireball.setVelocityX(-50);
    }
    //Fireball 1
    if (fireball1.x < 2005) {
        fireball1.setVelocityX(50);
    }
    if (fireball1.x > 2100) {
        fireball1.setVelocityX(-50);
    }
    //Fireball 2
    if (fireball2.x < 2955) {
        fireball2.setVelocityX(50);
    }
    if (fireball2.x > 3055) {
        fireball2.setVelocityX(-50);
    }
    //Fireball 3
    if (fireball3.x < 605) {
        fireball3.setVelocityX(150);
    }
    if (fireball3.x > 1920) {
        fireball3.setVelocityX(-150);
    }
    //Fireball 4
    if (fireball4.x < 1925) {
        fireball4.setVelocityX(150);
    }
    if (fireball4.x > 3400) {
        fireball4.setVelocityX(-150);
    }

    if (gameOver) {
        return;
    }
    
    //Finish line
    if (clown.body.x > 3750) {
        this.physics.pause();
        clown.anims.play('turn', true);
        //Display "You Won"
        won.visible = true;
        song.stop();
    }

    //Score follows the clown
    scoreDisplay.x = clown.body.position.x - 100;

    //Check left cursor and clown turns left and camera follows
    if (cursors.left.isDown) {
        clown.setVelocityX(-200);
        clown.anims.play('left', true);
        this.cameras.main.followOffset.x = 5;
    }
    //Check right cursor and clown turns right and camera follows
    else if (cursors.right.isDown) {
        clown.setVelocityX(200);
        clown.anims.play('right', true);
        this.cameras.main.followOffset.x = -5;
    }
    else {
        clown.setVelocityX(0);
        clown.anims.play('turn', true);
    }

    //Check spacebar if pressed and clown jumps
    if (this.spacebar.isDown && clown.body.touching.down) {
        clown.setVelocityY(-300);
        soundJump.play();
    }
}

//Collect stars and update score
function collectStar(clown, star) {
    star.disableBody(true, true);
    score += 50;
    scoreDisplay.setText('Points: ' + score);
    soundCollect.play();
};

//Catch clown and game over output
function catchClown() {
    this.physics.pause();
    clown.setTint(0xff0000);
    clown.anims.play('turn');
    gameOver = true;
    this.add.text((clown.body.x - 80), (clown.body.y - 30), 'Game Over', { fontSize: '60px', fill: '#000' });
    soundGameOver.play();
    song.stop();
}