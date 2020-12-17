
//? GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
    
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [30,    1,     0.2,    0.6,    1.5,    0.5,    1,      3,      1,      2.5,    1,      15,     3], 
      frag:             [2,     1,     1,      1,      2,      3,      1.5,    0,      0.4,    1.5,    4,      5,      1], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],  
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    shootonce:          [999999999999999999999999999999999999999999999999999999999999999999999999999999,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      1,      1,      1.05,   1,      1,      1,      1,      1],  
    sniper:             [1.35,  1,     0.25,   1,      1,      1.1,    1.2,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1.5,    1,      1,      1,      2,      1],     
        assass:         [1.75,  1,     0.25,   1,      1.15,   2,      1.3,    1.28,   1.18,   0.8,    3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.35,  1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   2,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    2.4,    1,      0.2,    0.5,    2,      1,      1.1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      0.7,      0.2,    0.5,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [1.25,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
            stream:     [1,     0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],    
        shotgun:        [8,     0.5,   1,      1.3,    1,      0.5,    10,     1.6,    0.6,    0.5,    1.2,    1.825,    1], 
        pointblank:     [1,     1,     1,      1,      2,      4,      10,     1,      1,      0.15,  2,      1.825,    1], 
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     1.2,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
              bombtrap: [2,     3,     1,      1,      0.7,    1,      0.5,    1,      1,      0.12,   1,      3,      1],
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1.1,      3,    1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      1.6,    1.5,  1.2,    0.65,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1,      1.7,    1.1,    0.95,   1,      1,      1.1,    1,      1],    
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.3,    1,      1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    3.10,   0.8,    1,      0.3,    0.3,    1,      1,      1,      1.1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [0.25,  0.1,   1,      1,      0.8,    0.6,    0.7,    1.01,   1,      1,      0.1,    1,      1], //owowoow
    apprentice:         [1,     1,     1,      1,      1.2,    0.8,    1,      1.1,    1,      1,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [0.75,  1,     1,      1.5,    0.8,    1.3,    10,     8,      1.5,    1.3,    0.0001,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.5,   1,     0.1,    1.5,    1,      1,      1,      0.8,    1,      0.4,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    0.5,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1], 
        sunchip:        [100,   1,     1,      1.4,    0.12,    0.2,    0.3,    1,      1,      1,      0.8,    1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
  halfrecoil:           [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    fricktonmorrecoil:  [1,     10,    1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
      doublereload:     [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
  halfreload:           [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
eighthreload:           [8,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1],
      doublespeed:      [1,     1,     1,      1,      1,      1,      1,      2,      2,      1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
  halfspeed:            [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
  halfrange:            [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1], 
      doublerange:      [1,     1,     1,      1,      1,      1,      1,      1,      1,      2,      1,      1,      1], 
      doubledamage:     [1,     1,     1,      1,      1,      2,      1,      1,      1,      1,      1,      1,      1], 
  halfdamage:           [1,     1,     1,      1,      1,      0.5,    1,      1,      1,      1,      1,      1,      1],
tenthdamage:            [1,     1,     1,      1,      1,      0.1,    1,      1,      1,      1,      1,      1,      1],
  halfhealth:           [1,     1,     1,      1,      0.5,    1,      1,      1,      1,      1,      1,      1,      1],
tenthhealth:            [1,     1,     1,      1,      0.1,    1,      1,      1,      1,      1,      1,      1,      1],
    thicc:              [0.8,   1.5,   0.1,    5,      1,      1,      1,      1.1,    1,      1,      1,      0.1,    1],
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
  halfsize:             [1,     1,     1,      0.5,    1,      1,      1,      1,      1,      1,      1,      1,      1],
      doublesize:       [1,     1,     1,      2,      1,      1,      1,      1,      1,      1,      1,      1,      1],
      doublepenetration:[1,     1,     1,      1,      1,      1,      2,      1,      1,      1,      1,      1,      1],
    lessshud:           [1,     1,     0.1,    1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    lesslagpls:         [3,    3,      1,      1.3,    1,      3,      0.33,   1,      1,      1,      3,      1,      1],
    hellf:              [80,   5,     0.01,    0.8,    1.2,    2,      4,      1.1,    1,      1,      1,      1,      1],
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],       
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,     0.5,     5,      1,      10], 
    hspray:             [1,     1,     1.1,    1,      2,      2.4,    2,      0.8,    300,    3,      1,      1,      1],
    fissiona:           [1,     1,     2,     0.1,     1,      2,      1,      2,      0.5,    2,      0.1,    10,     1],
    fusiona:            [1,     1,     2,    0.01,     1,      2,      1,      2,      1,      2,      1,      60,     1],
    antisciencea:       [4,     4,     5,    0.1,      1,      2,      1,     15,      100,    2,      1,      180,    1],
    fissionb:           [50, 0.000001, 0.1,    2,      1,      1,      1,      0,      0,      1,    0.1,      1,      1],
    antiscienceb:       [55, 0.000001, 0.1,    2,      1,      4,      1,      0,      0,      1,    0.1,      1,      1],
    fissionc:           [400,  10,    0.1,     1,      1,      75,     1,      1,      1,      1,      30,     1,      1],
    fusionc:            [600,  20,    0.1,     1,      1,      75,     1,      1,      1,      1,      60,     1,      1],
    antisciencec:       [800,  50,    0.1,   0.5,      1,      100,    1,      1,      1,      1,      60,     1,      1],
    antiscienced:       [800,  50,    0.1,     2,      1,      300,    1,      2,      1,      1,      120,    1,      1],
    invisturret:        [50,    0,    0.1,     1,   0.11,      1,      1,     20,    100,    0.1,      0.01,   0.5,    1],
    heal:               [1,     1,     1,      1,      1,      -1,     1,      1,      1,      1,      1,      1,      1],
    healmage:           [1,     1,     1,      1,      1,      0.1,    1,      1,      1,      1,      1,      1,      1],
    arrowtank:          [150,   15,    1,      1.3,    1,      100,    1,      -1,     1,      0.02,   1,      1,      1],
    reversespeed:       [1,     1,     1,      1,      1,      1,      1,      -1,     1,      1,      1,      1,      1],
    slowsamedist:       [1,     1,     1,      1,      1,      1,      1,      0.5,    1,      2,      2,      1,      1],
    autoobstacle:       [16.875,0.12,  0.09,   0.429,  0.8,    0.24,   0.37,   4.09,   1.36,   2,      1.8,    11.25,  1.8], 
}

const dfltskl = 9;


// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 'default',
    bullet: 'bullet',
    drone: 'drone',
    swarm: 'swarm',
    fixedReload: 'fixed reload',
    thruster: 'thruster',
    sustained: 'sustained',
    necro: 'necro',
    trap: 'trap',
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    INVULNERABLE: false,
    IS_SMASHER: false,
    IS_EVIS: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    DIE_OF_HUNGER: false,
    RCTD: false,
    CHASE_BOOST: false, // meant for things that chase things, such as crashers. If the chase lasts for a long time, they get a boost to hopefully end the chase quicker.
    BCR: 0, // (Boost Cooldown Reduction) the reduction of the chase boost cooldown. Best to think about it as a percentage.
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    BUFF_VS_NECRO: false,
    BUFF_VS_SMASH: false,
    FRIENDLY_FIRE: false, // if true, you can hurt your friends and even yourself
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    EXTRA_UPGRADE_MESSAGE: null, // Used with ' '. It's an extra message that displays when you upgrade your tank.
    EXTRA_DAMAGE_WITH_VELOCITY: null, // If the thing is moving, it gets extra damage. Input a number which multiplies with the velocity for additional damage
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    UPGRADES_TIER_4: [],
    UPGRADES_TIER_5: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0, //reload   pen      b-health b-dmg    b-speed  sh-cap   bod-dmg  health   sh-regen mov-spd  
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 1,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 1,
        REGEN: 1,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1, //jump to me
        DENSITY: 1,//n o, thats for everything
        STEALTH: 1,//that's my intention? oh
        PUSHABILITY: 1,        //all players or like literally everything everything
        HETERO: 1,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 0.25,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 2;
const basePolygonHealth = 5;
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: 5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 500 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 75 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 7,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 7,
        DENSITY: 20,
        HEALTH: 11,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 3000000000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 700000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
}; //owo wuts this

/*
k
this is the shape section
also LABEL is the tihgn's name
*/

exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',// make sure to put "//" that too yee
    VALUE: 20000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 3,
    DANGER: -1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -10,
    BODY: {
        PUSHABILITY: 0,
        FOV: 0.5,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 100,
        DAMAGE: 0,
        RESIST: 50,
        STEALTH: 0,
        SPEED: 0,
    },
    VALUE: 1,
    SIZE: 84,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: true,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 31,
        SHAPE: -7, 
        LABEL: "Gravel",
       ACCEPTS_SCORE: true,
    };

// WEAPONS
const wepHealthFactor = 0.75;
const wepDamageFactor = 1.5; //bullets etc
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 10.75,
        RANGE: 100,
        DENSITY: 420.69,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.invisbull = {
  PARENT: [exports.bullet],
  ALPHA: 0,
  BUFF_VS_NECRO: true,
};
exports.ASBullet = {
    PARENT: [exports.genericEntity],
    LABEL: 'Bullet',
    TYPE: 'bullet',
    INDEPENDENT: true,
    DRAW_HEALTH: true,
};
    exports.clarisethigh = {
        SHAPE: -2,
        LABEL: 'Clarise Thigh',
        TYPE: 'bullet',
        BODY: {
          PENETRATION: 0.42,
          SPEED: 690,
          RANGE: 200,
          DENSITY: 420.69,
          HEALTH: 6.9 * wepHealthFactor,
          DAMAGE: 69 * wepDamageFactor,
          PUSHABILITY: 0,
      },
      FACING_TYPE: 'sideways',
      CAN_GO_OUTSIDE_ROOM: true,
      HITS_OWN_TYPE: 'never',
      DIE_AT_RANGE: true,
    };
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 300,
        PENETRATION: 0.5,
        HEALTH: 1.5 * wepHealthFactor,
        DAMAGE: 1 * wepDamageFactor,
        SPEED: 40.5,
        RESIST: 0,
        RANGE: 325,
        DENSITY: 140,
        PUSHABILITY: 300,
        FOV: 4.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'never',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };
exports.hbullet = {
    PARENT: [exports.bullet],
    MOTION_TYPE: 'swarm',
    LABEL: 'Homing Bullet',
    AI: {FARMER: true, BLIND: true},
    CONTROLLERS: ['nearestDifferentMaster', 'HATEFUL'],
    INDEPENDENT: true,
    EXTRA_DAMAGE_WITH_VELOCITY: 0.5,
    CRAVES_ATTENTION: true,
    BODY: {
        FOV: 2,
        ACCELERATION: 0.04,
    },
};
exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 7 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 300.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
exports.frag = {
  PARENT: [exports.trap],
  FACING_TYPE: 'turnWithSpeed',
  INDEPENDENT: true,
  CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    -0.6,     -14,      0,      -120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.frag]),
                    TYPE: exports.bee, 
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    -0.6,     -14,      0,      0,    0.33,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.frag]),
                    TYPE: exports.bee, 
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    -0.6,     -14,      0,      120,    0.66,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.frag]),
                    TYPE: exports.bee, 
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, 
        ],
};
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            DAMAGE: 3.5,
            SPEED: 0.5,
            DENSITY: 5,
            RANGE: 900,
        },
      DRAW_HEALTH: true,
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 10,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.3 * wepHealthFactor,
        DAMAGE: 2.25 * wepDamageFactor,
        SPEED: 6.8,
        RANGE: 2000,
        DENSITY: 204700000000000000000000000000000000000.4,
        RESIST: 15,
        FOV: 5,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        DANGER: 20,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: true,
        ACCEPTS_SCORE: true,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -5,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.shielddrone = {
      LABEL: 'Shield',
      TYPE: 'drone',
      DANGER: 0,
      SHAPE: -5,
      MOTION_TYPE: 'chase',
      FACING_TYPE: 'smoothWithMotion',
      CONTROLLERS: [
        'circleMaster'
        , 'targetSelf'
    ],
    BODY: {
      PENETRATION: 0.6,
      PUSHABILITY: 0.1,
      HEALTH: 25 * wepHealthFactor,
      DAMAGE: 0.1 * wepDamageFactor,
      SPEED: 4.5,
      RANGE: 2000,
      DENSITY: 4E10,
      ACCELERATION: 0.1,
      FOV: 2,
    },
      AI: { BLIND: true, },
      DRAW_HEALTH: true,
      DIE_AT_RANGE: true,
      CLEAR_ON_MASTER_UPGRADE: true,
      HITS_OWN_TYPE: 'hardWithBuffer',
    };
exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 1,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.4,
    SPEED: 8,
    HEALTH: 25,
    DAMAGE: 1,
    RESIST: 1,
    PENETRATION: 1,
    SHIELD: 8,
    REGEN: 0.03,
    FOV: 1.25,
    DENSITY: 2,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };
   
//mildly illegal
{
    exports.hive2 = {
        PARENT: [exports.bullet],
        LABEL: 'Blayblade',
        DANGER: 4,
        BODY: {
            RANGE: 90,
            FOV: 1,
            DAMAGE: 100,
            PENETRATION: 0.25,
            PUSHABILITY: 5,
            DENSITY: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        DIE_AT_RANGE: false,
        ACCEPTS_SCORE: true,
        GIVE_KILL_MESSAGE: true,
        DIE_AT_LOW_SPEED: true,
        CAN_GO_OUTSIDE_ROOM: false,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.doubledamage]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.doubledamage]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.doubledamage]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.doubledamage]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.doubledamage]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
        
    };

    exports.snake2 = {
        PARENT: [exports.bullet],
        LABEL: 'Player Snake',
        DANGER: 4,
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        DIE_AT_RANGE: false,
        ACCEPTS_SCORE: true,
        GIVE_KILL_MESSAGE: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    
}
 
//auto turrets?
{
exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 1
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.obstAutoTurret = {
  PARENT: [exports.autoTurret],
  DANGER: -1,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    15,      0.5,      0,      0,      30,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.autoobstacle]),
                TYPE: [exports.bee, {BODY: {PENETRATION: base.PENETRATION * 10}, VALUE: 4}],
            }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    15,      0.5,      0,      0,      -30,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.autoobstacle]),
                TYPE: [exports.bee, {BODY: {PENETRATION: base.PENETRATION * 10}, VALUE: 4}],
            }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    15,      0.5,      0,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.autoobstacle]),
                TYPE: [exports.bee, {BODY: {PENETRATION: base.PENETRATION * 10}, VALUE: 4}],
            }, },
    ],
}

exports.autoTsurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    SHAPE: 3,
    BODY: {
        FOV: 1
    },
    COLOR: 0,
    ALPHA: 0,
    CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  2,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.invisturret, g.halfdamage]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.tsunchip = {
  PARENT: [exports.sunchip],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  2,     0,      0,      0,     360,  1], 
            TYPE: [exports.autoTsurret, {INDEPENDENT: true,}],
        },
  ],
};
exports.invisTurret = {
  PARENT: [exports.autoTurret],
  BODY: {
    FOV: 0.5,
  },
  CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.invisturret]),
                TYPE: exports.invisbull,
            }, },{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,    10,      1,      0,      0,      0,      0.05,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.invisturret]),
                TYPE: exports.invisbull,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.muchmorerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload, g.morereload, g.doublereload, g.doubledamage, g.doubledamage, g.fricktonmorrecoil]),
                    TYPE: exports.ASBullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.muchmorerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload, g.morereload, g.doublereload,g.doubledamage, g.doubledamage, g.fricktonmorrecoil]),
                    TYPE: exports.ASBullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.sentrygunn = {
        PARENT: [exports.genericTank],
        LABEL: '',
        COLOR: 20,
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow, g.lesslagpls]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow, g.lesslagpls]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
}
//smasher bodies n stuff
{
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.evisBody = {
    LABEL: '',
    CONTROLLERS: ['fastspin'],
    COLOR: 37,
    SHAPE: -3,
    INDEPENDENT: true,
};
exports.evisBody2 = {
    LABEL: '',
    CONTROLLERS: ['reversespin'], 
    COLOR: 19,
    SHAPE: -3,
    INDEPENDENT: true,
};
exports.evisBody3 = {
    LABEL: '',
    CONTROLLERS: ['fastspin'],
    COLOR: 23,
    SHAPE: -3,
    INDEPENDENT: true,
};
exports.evisBody4 = {
    LABEL: '',
    CONTROLLERS: ['fastspin'],
    COLOR: 19,
    SHAPE: -3,
    INDEPENDENT: true,
};
exports.evisBody5 = {
    LABEL: '',
    CONTROLLERS: ['fastspin'],
    COLOR: 20,
    SHAPE: -5,
    INDEPENDENT: true,
};
exports.sayncBody = {
    LABEL: '',
    CONTROLLERS: ['fastspin'], 
    COLOR: 20,
    SHAPE: -3,
    INDEPENDENT: true,
};
exports.sayncBody1 = {
    LABEL: '',
    CONTROLLERS: ['reversespin'], 
    COLOR: 6,
    SHAPE: -3,
    INDEPENDENT: true,
};
exports.sayncBody2 = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 19,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.sonckBody = {
    LABEL: '',
    CONTROLLERS: ['fastspin'], 
    COLOR: 19,
    SHAPE: -3,
    INDEPENDENT: true,
};
exports.sonckBody1 = {
    LABEL: '',
    CONTROLLERS: ['reversespin'], 
    COLOR: 6,
    SHAPE: -3,
    INDEPENDENT: true,
};
exports.sonckBody2 = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 20,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
}
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 1,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense, g.lesslagpls]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        HEALTH: 0.50 * wepHealthFactor,
        SPEED: 1,
        DENSITY: 5,
        REGEN: 0.05,
    },
    DIE_AT_RANGE: true, 
    DRAW_HEALTH: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.shieldmetadrone = {
  PARENT: [exports.shielddrone],
  HITS_OWN_TYPE: 'hardWithBuffer',
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  8,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublesize, g.pound, g.doublereload, g.doublereload, g.doublespeed, g.doublespeed, g.halfhealth, g.tenthhealth]),
                            TYPE: [exports.shielddrone, {TYPE: 'swarm'},],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            WAIT_TO_CYCLE: true, 
          MAX_CHILDREN: 1,
        }, }, 
  ],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  6,     0,      0,      0,     360,  1], 
            TYPE: [exports.autoTsurret, {CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true}],
        }
    ]
};
//nukes
{
exports.hell = {
        PARENT: [exports.bee],
        LABEL: 'Hell',
        SHAPE: -4,
        ACCEPTS_SCORE: true,
        BODY: {
            ACCELERATION: 5,
            RANGE: 100,
            FOV: 100,
            SPEED: 2.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        HITS_OWN_TYPE: 'never',
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   4,    15,    0.8,     7,      0,      0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.hellf, g.lessshud, g.doublerange, g.doublerange, g.doublereload, g.doublesize]),
                    TYPE: exports.bee,
                }, }, {
            POSITION: [   4,    15,    0.8,     7,      0,      180,    0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.hellf, g.lessshud, g.doublerange, g.doublerange, g.doublereload, g.doublesize]),
                    TYPE: exports.bee,
                }, }, 
        ],
};

exports.hell2 = {
        PARENT: [exports.hell],
        CONTROLLERS: ['alwaysFire','nearestDifferentMaster', 'targetSelf', ],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   4,    15,    0.8,     7,      0,      0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.hellf, g.lessshud, g.doublespeed, g.doublerange]),
                    TYPE: exports.hell,
                }, }, {
            POSITION: [   4,    15,    0.8,     7,      0,      180,    0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.hellf, g.lessshud, g.doublespeed, g.doublerange]),
                    TYPE: exports.hell,
                }, }, 
        ],
};
var lw = 100;
var hdk = 25;
while (lw > 0) {
exports.hell2 = {
        PARENT: [exports.hell],
        CONTROLLERS: ['alwaysFire','nearestDifferentMaster', 'targetSelf', ],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   4,    15,    0.8,     7,      0,      0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.hellf, g.lessshud, g.doublespeed]),
                    TYPE: exports.hell2,
                }, }, {
            POSITION: [   4,    15,    0.8,     7,      0,      180,    0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.hellf, g.lessshud, g.doublespeed]),
                    TYPE: exports.hell2,
                }, }, 
        ],
};
  hdk = hdk*2;
  lw-=25;
};
exports.fission = {
  PARENT: [exports.bullet],
  LABEL: 'Nuclear Explosion',
  CONTROLLERS: ['alwaysFire', 'targetSelf'],
  PERSISTS_AFTER_DEATH: true,
  ACCEPTS_SCORE: true,
  INTANGIBLE: true,
  HITS_OWN_TYPE: 'hardWithBuffer',
  BODY: {
    RANGE: 200,
    DAMAGE: 1,
    HEALTH: 300,
  },
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   7,    9.5,    0.6,     -10,      0,      108,     0,   ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }], 
         STAT_CALCULATOR: gunCalcNames.swarm,    
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      180,    0.2,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm,  
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      252,    0.4,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm, 
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      324,    0.6,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm, 
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      36,     0.8,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm,  
        }, }, 
     ],
};
exports.fission2 = {
  PARENT: [exports.fission],
  INTANGIBLE: false,
  HITS_OWN_TYPE: 'never',
  BODY: {
    RANGE: 7.5,
    },
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissionb]),
         TYPE: exports.fission,
       }, }, 
     ],
};
exports.fission3 = {
  PARENT: [exports.fission2],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissionb]),
         TYPE: exports.fission2,
       }, }, 
     ],
};
for (var t = 0; t < 4; t++) {
exports.fission3 = {
  PARENT: [exports.fission3],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissionb]),
         TYPE: exports.fission3,
       }, }, 
     ],
};
};
exports.nuke = {
  PARENT: [exports.trap],
  LABEL: 'Bombshell',
  HITS_OWN_TYPE: 'hardWithBuffer',
  CAN_GO_OUTSIDE_ROOM: false,
  BODY: {
    RANGE: 400,
    REGEN: 0,
  },
  DRAW_HEALTH: true,
  DANGER: 1000,
  SHAPE: [
    [-1.6, -0.2],
    [-0.8, -0.8],
    [0.2, -1.2],
    [1, -1.2],
    [1.8, -0.8],
    [2.2, 0],
    [1.8, 0.8],
    [1, 1.2],
    [0.2, 1.2],
    [-0.8, 0.8],
    [-1.6, 0.2],
  ],
  FACING_TYPE: 'smoothWithMotion',
  TURRETS: [],
  CONTROLLERS: ['alwaysFire'],
  INDEPENDENT: true,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    10,    1,     0,      0,      0,     0.8,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissionc]),
         TYPE: [exports.fission3, {PERSISTS_AFTER_DEATH: true,}],
       }, }, {
     POSITION: [  10,    25,      0.2,     -18,      0,     0,      0,  ], 
       },{
     POSITION: [  10,    25,      1,     18,      0,     180,      0,  ], 
       },
     ],
  CRAVES_ATTENTION: false,
};
exports.retribution = {
  PARENT: [exports.genericTank],
  LABEL: 'NUKE',
  SKILL_CAP: [0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.fissionc]),
                TYPE: [exports.nuke, {PERSISTS_AFTER_DEATH: true,}],
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
exports.fusion = {
  PARENT: [exports.bullet],
  LABEL: 'Nuclear Explosion',
  CONTROLLERS: ['alwaysFire', 'targetSelf'],
  PERSISTS_AFTER_DEATH: true,
  ACCEPTS_SCORE: true,
  HITS_OWN_TYPE: 'never',
  CAN_GO_OUTSIDE_ROOM: false,
  BODY: {
    RANGE: 200,
    DAMAGE: 1,
    HEALTH: 300,
  },
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   7,    9.5,    0.6,     -10,      0,      108,     0,   ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fusiona, g.halfsize]),
         TYPE: [exports.fission, { PERSISTS_AFTER_DEATH: true, }], 
         STAT_CALCULATOR: gunCalcNames.swarm,    
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      180,    0.2,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fusiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm,  
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      252,    0.4,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fusiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm, 
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      324,    0.6,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fusiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm, 
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      36,     0.8,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fusiona]),
         TYPE: [exports.bee, { PERSISTS_AFTER_DEATH: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm,  
        }, }, 
     ],
};
exports.fusion2 = {
  PARENT: [exports.fusion],
  BODY: {
    RANGE: 7.5,
    },
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissionb]),
         TYPE: exports.fusion,
       }, }, 
     ],
};
exports.fusion3 = {
  PARENT: [exports.fission2],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissionb]),
         TYPE: exports.fusion2,
       }, }, 
     ],
};
for (var t = 0; t < 13; t++) {
exports.fusion3 = {
  PARENT: [exports.fission3],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fissionb]),
         TYPE: exports.fusion3,
       }, }, 
     ],
};
};
exports.nuke2 = {
  PARENT: [exports.trap],
  LABEL: 'Big Bombshell',
  HITS_OWN_TYPE: 'hardWithBuffer',
  BODY: {
    RANGE: 1000,
    REGEN: 0,
    FOV: base.FOV * 1.3,
  },
  DRAW_HEALTH: true,
  DANGER: 2000,
  SHAPE: [
    [-3.2, -0.4],
    [-1.6, -1.6],
    [0.4, -2.4],
    [2, -2.4],
    [3.6, -1.6],
    [4.4, 0],
    [3.6, 1.6],
    [2, 2.4],
    [0.4, 2.4],
    [-1.6, 1.6],
    [-3.2, 0.4],
  ],
  FACING_TYPE: 'smoothWithMotion',
  TURRETS: [],
  CONTROLLERS: ['alwaysFire'],
  INDEPENDENT: true,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    10,    1,     0,      0,      0,     0.8,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.fusionc]),
         TYPE: [exports.fusion3, {PERSISTS_AFTER_DEATH: true,}],
       }, }, {
     POSITION: [  20,    50,      0.4,     -36,      0,     0,      0,  ], 
       },{
     POSITION: [  20,    50,      1,     36,      0,     180,      0,  ], 
       },
     ],
  CRAVES_ATTENTION: false,
};
exports.retribution2 = {
  PARENT: [exports.genericTank],
  LABEL: 'SUPER NUKE',
  SKILL_CAP: [0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.fusionc, g.halfreload]),
                TYPE: [exports.nuke2, {PERSISTS_AFTER_DEATH: true,}],
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
exports.antiscience = {
  PARENT: [exports.bullet],
  LABEL: 'Nuclear Explosion',
  CONTROLLERS: ['alwaysFire', 'targetSelf'],
  PERSISTS_AFTER_DEATH: true,
  ACCEPTS_SCORE: true,
  HITS_OWN_TYPE: 'never',
  FACING_TYPE: 'turnWithSpeed',
  CAN_GO_OUTSIDE_ROOM: false,
  BODY: {
    RANGE: 200,
    DAMAGE: 1,
    HEALTH: 300,
    PUSHABILITY: 0,
  },
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   7,    9.5,    0.6,     -10,      0,      108,     0,   ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antisciencea]),
         TYPE: [exports.nuke, { PERSISTS_AFTER_DEATH: true, VARIES_IN_SIZE: true, }], 
         STAT_CALCULATOR: gunCalcNames.swarm,    
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      180,    0.2,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antisciencea]),
         TYPE: [exports.nuke, { PERSISTS_AFTER_DEATH: true, VARIES_IN_SIZE: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm,  
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      252,    0.4,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antisciencea]),
         TYPE: [exports.nuke, { PERSISTS_AFTER_DEATH: true, VARIES_IN_SIZE: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm, 
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      324,    0.6,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antisciencea]),
         TYPE: [exports.nuke, { PERSISTS_AFTER_DEATH: true, VARIES_IN_SIZE: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm, 
       }, }, {
     POSITION: [   7,    9.5,    0.6,     -10,      0,      36,     30,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antisciencea, g.fricktonmorrecoil]),
         TYPE: [exports.nuke2, { PERSISTS_AFTER_DEATH: true, VARIES_IN_SIZE: true, }],
         STAT_CALCULATOR: gunCalcNames.swarm,  
        }, }, 
     ],
};
exports.antiscience2 = {
  PARENT: [exports.antiscience],
  HITS_OWN_TYPE: 'never',
  BODY: {
    RANGE: 7.5,
    },
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antiscienceb]),
         TYPE: exports.antiscience,
       }, }, 
     ],
};
exports.antiscience3 = {
  PARENT: [exports.antiscience2],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antiscienceb]),
         TYPE: exports.antiscience2,
       }, }, 
     ],
};
for (var t = 0; t < 3; t++) {
exports.antiscience3 = {
  PARENT: [exports.antiscience3],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    19.5,    1,     19.5,      0,      0,     0.1,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antiscienceb]),
         TYPE: exports.antiscience3,
       }, }, 
     ],
};
};
exports.antisciencenuke = {
  PARENT: [exports.trap],
  LABEL: 'But Why Tho',
  HITS_OWN_TYPE: 'hardWithBuffer',
  BODY: {
    RANGE: 800,
    REGEN: 0,
  },
  DRAW_HEALTH: true,
  DANGER: 1000,
  SHAPE: [
    [-3.2, -0.4],
    [-1.6, -1.6],
    [0.4, -2.4],
    [2, -2.4],
    [3.6, -1.6],
    [4.4, 0],
    [3.6, 1.6],
    [2, 2.4],
    [0.4, 2.4],
    [-1.6, 1.6],
    [-3.2, 0.4],
  ],
  FACING_TYPE: 'smoothWithMotion',
  TURRETS: [],
  CONTROLLERS: ['alwaysFire'],
  INDEPENDENT: true,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [   0,    10,    1,     0,      0,      0,     0.8,  ], 
       PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.antisciencec]),
         TYPE: [exports.antiscience3, {PERSISTS_AFTER_DEATH: true,}],
       }, }, {
     POSITION: [  20,    50,      0.4,     -36,      0,     0,      0,  ], 
       },{
     POSITION: [  20,    50,      1,     36,      0,     180,      0,  ], 
       },
     ],
  CRAVES_ATTENTION: false,
};
exports.asIfTheLastOneWasntEnough = {
  PARENT: [exports.genericTank],
  LABEL: 'Server Speed Repellent',
  SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
  BODY: {
    FOV: base.FOV * 2,
  },
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.antiscienced]),
                TYPE: [exports.antisciencenuke, {PERSISTS_AFTER_DEATH: true,}],
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
}
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.doublespeed, g.doublespeed]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
        VALUE: 69696969,
        LABEL: 'Skimmy The dick Spinner',
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };
//effect dependincies
exports.bb_fr_squ = {
    PARENT: [exports.genericTank],
    CONTROLLERS: ['dontTurn'], 
    COLOR: 30,
    LABEL: '',
    SHAPE: 4,
};
exports.mod_fire = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    SIZE: 3,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  40,     0,      0,     0,    0,  1], 
            TYPE: exports.bb_fr_squ,
        }, 
    ],
};
exports.bb_el_tri = {
    PARENT: [exports.genericTank],
    CONTROLLERS: ['dontTurn'], 
    COLOR: 19,
    LABEL: '',
    SHAPE: 3,
};
exports.mod_shock = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    SIZE: 3,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  40,     0,      0,     0,    0,  1], //
            TYPE: exports.bb_el_tri,
        }, { 
        POSITION: [  25,     32.5,      0,     0,    0,  1], //
            TYPE: exports.bb_el_tri,
        },
    ],
};
//effects
{
exports.poisonEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 11,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.PowerEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 0,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.burnEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 30,
    SHAPE: 0,
    SIZE: 3,
    CONTROLLERS: ['dontTurn'],
    MOTION_TYPE: 'grow',
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 8,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
  TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  25,     0,      0,     -90,    0,  1], //
            TYPE: exports.mod_fire,
        },
    ],
};
exports.shockEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 15,
    SHAPE: 0,
    SIZE: 3,
    CONTROLLERS: ['dontTurn'],
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 8,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
  TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  25,     0,      0,     -90,    0,  1], //
            TYPE: exports.mod_shock,  
        },
    ],
};
exports.iceEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 12,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // 
  _SPEED: true,
    DIE_AT_RANGE: true,
};
exports.lightningEmblem = {
    PARENT: [exports.genericTank],
    COLOR: 3,
    SHAPE: [[-0.25,-0.1],[0.2,-0.7],[0,-0.1],[0.35,0.25],[0.1,0.7],[-0.4,0.7],[0,0.25]]
};
exports.poisonEmblem = {
    PARENT: [exports.genericTank],
    COLOR: 11,
    SHAPE: [[-0.45,-0.9],[0,-1],[0.25,-0.97],[0.5,-0.87],[0.708,-0.708],[0.87,-0.5],[0.97,-0.25],[1,0],[0.97,0.25],[0.87,0.5],[0.708,0.708],[0.5,0.87],[0.25,0.97],[0,1],[-0.45,0.9],[-0.8,0.7],[-1.3,0.3],[-1.8,0],[-1.3,-0.3],[-0.8,-0.7]]
};

exports.iceEmblem = {
    PARENT: [exports.genericTank],
    COLOR: 6,
    SHAPE: [[-0.55,-0.15],[0,0],[1,-1],[0,0],[0.15,0.55],[-1,1]]
};
exports.fireEmblem = {
    PARENT: [exports.genericTank],
    COLOR: 2,
    SHAPE: [[-0.38,0.68],[-0.41,0.2],[-0.58,0.39],[-0.73,0.6],[-0.79,0.72],[-0.85,0.83],[-0.98,0.62],[-1.05,0.42],[-1.03,0.24],[-1.01,-0.07],[-0.93,-0.42],[-0.75,-0.69],[-0.51,-0.89],[-0.21,-0.96],[0.11,-0.98],[0.42,-0.91],[0.7,-0.72],[0.92,-0.42],[1.02,-0.06],[0.97,0.32],[0.79,0.67],[0.64,0.88],[0.5,1.07],[0.41,1.24],[0.32,0.85],[0.18,1],[0.1,1.18],[0.02,1.35],[-0.06,1.66],[-0.28,1.31],[-0.34,0.98]]
};
exports.icebullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    ICE: true,
    ICE_TO_APPLY: 1,
    SHOWICE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     0,  1,], 
        TYPE: exports.iceEmblem
    }],
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.shockbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
      SHOCK: true,
    SHOCK_TO_APPLY: 0.2,
    SHOWSHOCK: false,
    ICE: [true, 1, 1],
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     0,  1,], 
        TYPE: exports.lightningEmblem
    }],
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.burnbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BURN: true,
    BURN_TO_APPLY: 1,
    SHOWBURN: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     0,  1,], 
        TYPE: exports.fireEmblem
    }],
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.poisonbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    POISON: true,
    POISON_TO_APPLY: 1,
    SHOWPOISON: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,     0,      0,      90,     0,  1,], 
        TYPE: exports.poisonEmblem
    }],
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.healbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    HEAL: true,
    HEAL_TO_APPLY: 1,
    HEALED: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
}
function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}

exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.shieldtest0 = {
  PARENT: [exports.basic],
  LABEL: 'Shield Test',
  CONTROLLERS: ['targetSelf'],
  STAT_NAMES: statnames.necro,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  8,     8,      1,      0,      -20,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublesize, g.pound, g.doublereload, g.doublereload]),
                            TYPE: exports.shielddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            WAIT_TO_CYCLE: true, 
          MAX_CHILDREN: 11,
        }, },
  ],
};
exports.shieldtest = {
  PARENT: [exports.basic],
  LABEL: 'Shield Test',
  STAT_NAMES: statnames.necro,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            SYNCS_SKILLS: true,
        }, },
  ],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [  20,     0,      0,     0,     0, 0], 
          TYPE: exports.shieldtest0,
          SYNCS_SKILLS: true,
          },
            ],
};
exports.shieldtest02 = {
  PARENT: [exports.basic],
  LABEL: 'Shield Test',
  CONTROLLERS: ['targetSelf'],
  STAT_NAMES: statnames.necro,
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  8,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublesize, g.pound, g.doublereload, g.doublereload, g.morespeed, g.halfhealth]),
                            TYPE: exports.shieldmetadrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            WAIT_TO_CYCLE: true, 
          MAX_CHILDREN: 8,
        }, }, 
  ],
};
exports.shieldtest2 = {
  PARENT: [exports.basic],
  LABEL: 'Shield Test 2',
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        }, },
  ],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [  20,     0,      0,     0,     0, 0], 
          TYPE: exports.shieldtest02,
          SYNCS_SKILLS: true,
          },
            ],
};
exports.healtest = {
  PARENT: [exports.basic],
  LABEL: 'Not Basic',
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.poisonbullet,
        }, },
  ],
};
exports.basit = {
    PARENT: [exports.genericTank],
    LABEL: 'Basit',
    DANGER: -1,
    AUTO_UPGRADE: 'random',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.ASBullet,
        }, }, 
    ],
};
//basicks
{
exports.basick = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    GIVE_KILL_MESSAGE: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.basicka = {
  PARENT: [exports.genericTank],
    LABEL: 'Basic 2',
    GIVE_KILL_MESSAGE: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.basickb = {
  PARENT: [exports.basicka],
  LABEL: 'Basic 3',
};
exports.basickc = {
  PARENT: [exports.basicka],
  LABEL: 'Basic 4'
};
exports.basickd = {
  PARENT: [exports.basickb],
  LABEL: 'Basic 5',
};
exports.basicke = {
  PARENT: [exports.basickd],
  LABEL: 'Basic 6',
}
exports.basickf = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic 7',
    GIVE_KILL_MESSAGE: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.basickg = {
  PARENT: [exports.basicke],
  LABEL: 'Basic 8',
};
exports.basickh = {
  PARENT: [exports.basickg],
  LABEL: 'Basic 9',
};
exports.basickfake = {
    PARENT: [exports.genericTank],
    LABEL: 'Don\'t Ride Snake',
    GIVE_KILL_MESSAGE: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.basicki = {
  PARENT: [exports.basickh],
  LABEL: 'Basic 10',
};
exports.basickj = {
    PARENT: [exports.genericTank],
    LABEL: 'Basick 11',
    GIVE_KILL_MESSAGE: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
}
        exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'TESTBED',
            RESET_UPGRADES: true,
            ALPHA: 1,
            CONTROLLERS: [],
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: [
              [-1, -0.8],
              [-0.8, -1],
              [0.8, -1],
              [1, -0.8],
              [0.2, 0],
              [1, 0.8],
              [0.8, 1],
              [-0.8, 1],
              [-1, 0.8],
            ],
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.felipeb = {
  PARENT: [exports.bullet],
  FELIPE_BULLET: true,
}
exports.felipel = {
  PARENT: [exports.felipeb],
  SHAPE: [
    [0.2, 2],
    [-0.2, 2],
    [-0.2, -2],
    [0.2, -2],
  ],
  FACING_TYPE: 'sideways',
}
exports.felipe = {
  PARENT: [exports.genericTank],
  LABEL: 'Felipe',
  FELIPE: true,
  DANGER: 666,
  SHAPE: [
    [1,3],
    [6.2, 1],
    [0.2, 0.2],
    [-0.5, 3],
    [-1, -3],
    [-0.4, 0.1],
    [-0.5, 2],
    [-0.2, -0.5],
    [0, -1],
    [0.2, -0.5],
    [-1, 0.1],
    [-0.1, 0.2],
  ],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [  -21,    14,      1,      0,      0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.sniper, g.sniper, g.assass, g.doublesize, g.doublesize, g.reversespeed]),
                    TYPE: exports.felipel,
                }, },
            ],
};
//The Observers.
{
exports.obsie = {
            PARENT: [exports.genericTank],
            LABEL: 'Observer (Default)',
            DANGER: -1,
            ALPHA: 0,
            INTANGIBLE: true,
            CAN_GO_OUTSIDE_ROOM: true,
            BODY: {
                SHIELD: base.SHIELD * 69420,
                REGEN: base.REGEN / 0,
                SPEED: base.SPEED * 2,
                ACCELERATION: base.ACCEL * 5,
                HEALTH: base.HEALTH * 0,
                DAMAGE: 0,
                FOV: base.FOV * 6.5,
                DENSITY: 9001,
                PUSHABILITY: 0,
            },
            SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        };
exports.obsie01 = {
            PARENT: [exports.genericTank],
            LABEL: 'Observer (x0.1)',
            DANGER: -1,
            ALPHA: 0,
            INTANGIBLE: true,
            INVULNERABLE: true,
            CAN_GO_OUTSIDE_ROOM: true,
            BODY: {
                SHIELD: base.SHIELD * 69420,
                REGEN: base.REGEN / 0,
                SPEED: base.SPEED / 4,
                ACCELERATION: base.ACCEL * 5,
                HEALTH: base.HEALTH * 0,
                DAMAGE: 0,
                FOV: base.FOV * 0.1,
                DENSITY: 9001,
                PUSHABILITY: 0,
            },
            SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        };
exports.obsie002 = {
  PARENT: [exports.obsie01],
  LABEL: 'Observer (x0.02)',
  BODY: {
    FOV: base.FOV * 0.02,
    SPEED: base.SPEED * 0.001,
    ACCELERATION: base.ACCEL * 0.5,
  },
};
exports.obsie1 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x1)',
  BODY: {
    FOV: base.FOV * 1,
  },
};
exports.obsie2 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x2)',
  BODY: {
    FOV: base.FOV * 2,
  },
};

exports.obsie4 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x4)',
  BODY: {
    FOV: base.FOV * 4,
  },
};
exports.obsie5 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x5)',
  BODY: {
    FOV: base.FOV * 5,
  },
};
exports.obsie6 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x6)',
  BODY: {
    FOV: base.FOV * 6,
  },
};
exports.obsie7 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x7)',
  BODY: {
    FOV: base.FOV * 7,
  },
};
exports.obsie8 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x8)',
  BODY: {
    FOV: base.FOV * 8,
  },
};
exports.obsie9 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x9)',
  BODY: {
    FOV: base.FOV * 9,
  },
};
exports.obsie10 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x10)',
  BODY: {
    FOV: base.FOV * 10,
  },
};
exports.obsie15 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x15)',
  BODY: {
    FOV: base.FOV * 15,
  }
}
exports.obsie20 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x20)',
  BODY: {
    FOV: base.FOV * 20,
  },
};
exports.obsie30 = {
  PARENT: [exports.obsie],
  LABEL: 'Observer (x30)',
  BODY: {
    FOV: base.FOV * 30,
  },
};
}

            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  

        let smshskl = 12; //13;
        let evisskl = 15;
// Testbed Branches
{
exports.mainmenu = {
  PARENT: [exports.testbed],  
  LABEL: 'Main Menu',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    SHAPE: 0,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
exports.resetlevel = {
  PARENT: [exports.testbed],
  SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
  SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  INTANGIBLE: false,
  INVULNERABLE: false,
  CAN_GO_OUTSIDE_ROOM: false,
  LABEL: 'Reset Level',
  LEVEL: -1,
};
exports.branch = {
  PARENT: [exports.genericTank],
  LABEL: 'Arrow Tank',
  // SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
  BODY: {
    HEALTH: base.HEALTH * 1.1, 
    DAMAGE: base.DAMAGE * 1.2, 
    PENETRATION: base.PENETRATION * 2, 
    SHIELD: base.SHIELD,
    REGEN: base.REGEN,
    DENSITY: base.DENSITY * 2,
    FOV: base.FOV * 1.2,
  },
  SHAPE: [
    [-0.8, -0.5],
    [0.2, -0.5],
    [0.2, -1.1],
    [1.4, 0],
    [0.2, 1.1],
    [0.2, 0.5],
    [-0.8, 0.5],
  ],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [  5,    10,      1,       8,     0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.arrowtank]),
                    TYPE: exports.bullet,
      },},{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [  2,    10,      1,       14,     0,      180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.arrowtank]),
                    TYPE: exports.bullet,
      },},
            ],
};
exports.arrowtank = {
  PARENT: [exports.branch],
  SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
};
exports.bossbranch = {
  PARENT: [exports.branch],
  LABEL: 'Bosses',
};
exports.opbranch = {
  PARENT: [exports.branch],
  LABEL: 'Overpowered',
};
exports.t4branch = {
  PARENT: [exports.branch],
  LABEL: 'Tier 4',
};
exports.partsbranch = {
  PARENT: [exports.branch],
  LABEL: 'Parts & Projectiles',
};
exports.basicbranch = {
  PARENT: [exports.branch],
  LABEL: 'Basics'
};
exports.miscbranch = {
  PARENT: [exports.branch],
  LABEL: 'Misc.',
};
exports.hatbranch = {
  PARENT: [exports.branch],
  LABEL: 'Hats',
};
exports.felipebranch = {
  PARENT: [exports.branch],
  LABEL: 'felipe?',
};
exports.godbranch = {
  PARENT: [exports.branch],
  LABEL: 'God Powers',
};
  exports.skillbranch = {
    PARENT: [exports.branch],
    LABEL: 'Skill Caps',
  };
}
//The god powers
{
  exports.power = {
    PARENT: [exports.genericTank],
    SHAPE: [
      [-1, 1],
      [0, 0.5],
      [1, 1],
      [0.5, 0],
      [1, -1],
      [0, -0.5],
      [-1, -1],
      [-0.5, 0],
    ],
    LABEL: 'you shouldn\'t be seeing this',
  };
  exports.intapower = {
    PARENT: [exports.power],
    LABEL: 'Intangible',
    INTANGIBLE: true,
  };
  exports.invulpower = {
    PARENT: [exports.power],
    LABEL: 'Invulnerable',
    INVULNERABLE: true,
  };
  exports.outpower = {
    PARENT: [exports.power],
    LABEL: 'Can Go Outside Room',
    CAN_GO_OUTSIDE_ROOM: true,
  };
  exports.levelpower = {
    PARENT: [exports.power],
    LABEL: 'Max Level',
    LEVEL: 'MAX',
  };
  exports.dfltpower = {
    PARENT: [exports.power],
    LABEL: 'Default Cap',
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, ],
  };
  exports.smshpower = {
    PARENT: [exports.power],
    LABEL: 'Smasher Cap',
    SKILL_CAP: [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, ],
  };
  exports.evispower = {
    PARENT: [exports.power],
    LABEL: 'Eviscerator Cap',
    SKILL_CAP: [evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, ],
  };
  exports.maxoutpower = {
    PARENT: [exports.power],
    LABEL: 'Max-Out Skills',
    SKILL: [evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, evisskl, ],
  };
}
// The Smashers
{
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            LEVEL: -1,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            DANGER: 8,
            BODY: {
                DAMAGE: base.DAMAGE * 2,
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.twinsmash = {
            PARENT: [exports.genericTank],
            LABEL: 'Twin Smasher',
            DANGER: 6,
            EXTRA_UPGRADE_MESSAGE: "press o",
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  8,   10,      -5.5,      0,     360,  0,], 
                TYPE: exports.smash,
            },{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  8,   10,      5.5,      0,     360,  0,], 
                TYPE: exports.smash,
            },{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
    exports.animet = {
        PARENT: [exports.bullet],
        LABEL: 'Tiddy',
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
        TYPE: 'miniboss',
        BODY: {
          RANGE: 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
          DAMAGE: 100,
          CROW_SOFTNES: 10000000000000000000000000000000
        },
      tf: true,
    };
    exports.twinsmashtiddyremoval = {
        PARENT: [exports.smash],
        LABEL: 'Twin Smasher',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  1,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.shootonce]),
                TYPE: exports.animet,
                AUTOFIRE: true,
              
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  1,     8,      1,      0,    -5.5,     0,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.shootonce]),
                TYPE: exports.animet,
                AUTOFIRE: true,
              
            }, }, 
        ],
    };
            exports.saync = {
                PARENT: [exports.genericTank],
                LABEL: 'Saync the Hedj',
                DANGER: 8,
                BODY: {
                    ACCELERATION: base.ACCEL*2,
                    SPEED: base.speed*500000,
                    DAMAGE: base.DAMAGE * 20,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 250000,
                   
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  23,     0,      0,      0,     360,  0,], 
                    TYPE: exports.sayncBody,
                },{
                    POSITION: [  20,     0,      0,      0,     120,  0,], 
                    TYPE: exports.sayncBody1,
                },{
                    POSITION: [  20,     0,      0,      60,     120,  0,], 
                    TYPE: exports.sayncBody1,
                },{
                    POSITION: [  21,     0,      0,      60,    360,  0,], 
                    TYPE: exports.sayncBody,
                },{
                    POSITION: [  20,     0,      0,    0,     360,  0,], 
                    TYPE: exports.sayncBody2,
                }], //now copy this and i'll throw the og one in //what
            };
              exports.sonck = {
                PARENT: [exports.genericTank],
                LABEL: 'Sonck the Ungodly Speed Demon',
                DANGER: 8,
                BODY: {
                    ACCELERATION: base.ACCEL*25.4,
                    SPEED: base.speed*500000,
                    DAMAGE: base.DAMAGE * 40,
                    FOV: base.FOV * 1.3,
                    DENSITY: base.DENSITY * 2500000,
                   
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.sonckBody,
                },{
                    POSITION: [  19.6,     0,      0,      0,     150,  0,], 
                    TYPE: exports.sonckBody1,
                },{
                    POSITION: [  19.5,     0,      0,      60,     120,  0,], 
                    TYPE: exports.sonckBody1,
                },{
                    POSITION: [  21.3,     0,      0,      60,    360,  0,], 
                    TYPE: exports.sonckBody,
                },{
                    POSITION: [  21.8,     0,      0,    0,     360,  0,], 
                    TYPE: exports.sonckBody2,
                }], //now copy this and i'll throw the og one in //what
            };
exports.sayncWithAi = {
                PARENT: [exports.saync],
                LABEL: 'Saync the Hedj With Ai',
                INDEPENDENT: true,
                HITS_OWN_TYPE: 'hardWithBuffer',
    DIE_AT_LOW_SPEED: true,
                BODY: {
                  RANGE: 900,
                },
  DIE_AT_RANGE: false,
  INDEPENDENT: true,
                CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'],
            };
exports.sonckWithAi = {
                PARENT: [exports.sonck],
                LABEL: 'Sonck the Ungodly Speed Demon With Minion Ai',
                INDEPENDENT: true,
                HITS_OWN_TYPE: 'hardWithBuffer',
                BODY: {
                  RANGE: 1500,
                },
  DIE_AT_RANGE: false,
                CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'],
            };
exports.bossSonckWithAi = {
  PARENT: [exports.sonckWithAi],
  LABEL: 'Sonck the Ungodly Speed Demon With Minion Ai But It\'s A Death Swarm',
  DIE_OF_HUNGER: true,
  BROADCAST_MESSAGE: 'A visitor has left!',
}
                exports.evis = {
                PARENT: [exports.genericTank],
                LABEL: 'The Eviscerator',
                LEVEL: -1,
                  SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                DANGER: 9000.1,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.3,
                    SPEED: base.speed*2,
                    DAMAGE: 1.79769313486231569E+200,
                    FOV: base.FOV * 0.8,
                    DENSITY: base.DENSITY * 100,
                },
                IS_SMASHER: true,
                IS_EVIS: true,
                EXTRA_UPGRADE_MESSAGE: 'Your only weakness is against Necromancer-type drones. Use your tiny invisible autoturret to shoot them down.',
                SKILL_CAP: [evisskl, 0, 0, 0, 0, evisskl, 0, 0, evisskl, evisskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.evisBody,
                    }, { 
                      POSITION: [ 20.5,    0,      0,      60,     360,  0,], 
                    TYPE: exports.evisBody,
                    }, {
                    POSITION: [ 16.5,    0,      0,     60,    360,  0,], 
                    TYPE: exports.evisBody3,
                    }, { 
                    POSITION: [ 16.5,    0,      0,     0,    360,  0,], 
                    TYPE: exports.evisBody3,
                    }, { 
                    POSITION: [ 23.5,    0,      0,     90,    360,  0,], 
                    TYPE: exports.evisBody,
                    }, {
                    POSITION: [ 18.5,    0,      0,     90,    360,  0,], 
                    TYPE: exports.evisBody4,
                    }, {
                    POSITION: [ 20.5,    0,      0,     0,    180,  0,], 
                    TYPE: exports.evisBody5,
                    }, {
                    POSITION: [ 20.5,    0,      0,     0,    360,  0,], 
                    TYPE: exports.evisBody2,
                    POSITION: [  1,      0,      0,     0,    360,  0,],
                    TYPE: exports.invisTurret,
                }],
            };   
exports.evisWithAi = {
                PARENT: [exports.evis],
                LABEL: 'The Eviscerator With Ai',
                INDEPENDENT: true,
                HITS_OWN_TYPE: 'hardWithBuffer',
                BODY: {
                  RANGE: 1000,
                },
  DIE_AT_RANGE: false,
                CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'mapTargetToGoal', 'hangOutNearMaster'],
            };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.45,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };//what? //so i threw the original one in //ok but why // idk//uh ok //also how you make new tanks is copying one of a tank's code and pasting it then putting the exports. in where it shows tanks in the area you want it at 
//btw the megasmasher isn't gonna work because the body design it calls for is no longer in the code. and also the upgrade thing isn't in the code either.
// ye it is
//go to the bottem of the code ye lol lol
exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                LEVEL: -1,
                SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL*0.7,
                    SPEED: base.speed*2,
                    DAMAGE: base.DAMAGE * 75,
                    FOV: base.FOV * 1.075,
                    DENSITY: base.DENSITY * 0.01,
                    HEALTH: base.HEALTH / 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };  
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1150,
                    FOV: base.FOV * 2,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 1, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            
  
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];
}
// Mages n stuff
 {
exports.wizHat = {
  PARENT: [exports.genericTank],
  LABEL: 'Hat Tip',
  SHAPE: [
    [-1, 1],
    [0.5, 0.5],
    [0.5, -0.5],
    [-1, -1],
  ],
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  15,    10,    0.01,   5,      0,      0,      0,   ],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.apprentice, g.halfreload, g.lessreload, g.fricktonmorrecoil, g.fake]),
          TYPE: exports.bullet,
          LABEL: 'Hat',
          ALT_FIRE: true,
        }, 
  },
    ],
};
exports.wizHatRim = {
  PARENT: [exports.genericTank],
  LABEL: 'Hat Rim',
  SHAPE: -2,
};
exports.WHAT = {
  PARENT: [exports.wizHatRim],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  20,     0,      0,     90,     0,  1], 
            TYPE: [exports.wizHat, {COLOR: 0,}],
        },
  ],
};
exports.appHat = {
  PARENT: [exports.wizHatRim],
  LABEL: 'Apprentice Hat',
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     5,      0,     0,     0,  1], 
            TYPE: [exports.wizHat, {COLOR: 17,}],
        },
  ],
};
exports.shHat = {
  PARENT: [exports.wizHatRim],
  LABEL: 'Shield Hat',
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     5,      0,     0,     0,  1], 
            TYPE: [exports.wizHat, {COLOR: 0,}],
        },
  ],
};
exports.spHat = {
  PARENT: [exports.wizHatRim],
  LABEL: 'Sparker Hat',
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     5,      0,     0,     0,  1], 
            TYPE: [exports.wizHat, {COLOR: 13,}],
        },
  ],
};
exports.basicWithAHat = {
    PARENT: [exports.genericTank],
    LABEL: 'Apprentice',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.apprentice]),
            TYPE: exports.bullet,
        }, }, 
    ],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  30,   7,      0,    140 + (Math.random() * 80),     0,  1], 
            TYPE: exports.appHat,
        },
  ],
};
}
    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: [exports.bullet, {BUFF_VS_NECRO: true, BUFF_VS_SMASH: true,}],
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: [exports.bullet, {BUFF_VS_NECRO: true, BUFF_VS_SMASH: true,}],
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: [exports.bullet, {BUFF_VS_NECRO: true, BUFF_VS_SMASH: true,}],
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.deca = {
                PARENT: [exports.genericTank],
                LABEL: 'Deca Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      -10,      3,     -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      10,     -2,    30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.7,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.sniper, g.halfdamage]),
                            TYPE: exports.bullet,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  36,    4,     1,      0,      0,      0,      0,   ], 
                          PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.sniper, g.halfdamage]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, "");
              // exports.branger = {
              //   PARENT: [exports.genericTank],
              //   LABEL: 'Ranger 2.0',
              //   DANGER: 7,
              //   BODY: {
              //       ACCELERATION: base.ACCEL * 0.5,
              //       SPEED: base.SPEED * 0.8,
              //       FOV: base.FOV * 1.7,
              //   },
              //   GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              //       POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
              //           PROPERTIES: {
              //               SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.sniper, g.halfspeed]),
              //               TYPE: [exports.bee, {INDEPENDENT: true, NECRO: true, BODY: {ACCELERATION : 1}}],
              //             STAT_CALCULATOR: gunCalcNames.swarm,
              //           }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              //           POSITION: [  36,    4,     1,      0,      0,      0,      0,   ], 
              //             PROPERTIES: {
              //               SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.sniper, g.halfspeed]),
              //               TYPE: [exports.bee, {INDEPENDENT: true, NECRO: true, BODY: {ACCELERATION : 1}}],
              //               STAT_CALCULATOR: gunCalcNames.swarm,
              //           }, }, {
              //       POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
              //       },
              //   ],
              // }

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                EXTRA_UPGRADE_MESSAGE: 'Right-click to... do nothing.',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
            HEALTH: base.HEALTH * 0.5,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: '',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 1,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                EXTRA_UPGRADE_MESSAGE: 'Build your army. Control the world.',
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.tsunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.tsunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };

        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: '',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };

    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.sayncgun = {
        PARENT: [exports.genericTank],
        LABEL: 'Saync Launcher',
      MAX_CHILDREN: 10,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    17,     19.5,     0.01,     7,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.eighthreload, g.doubledamage]),
                TYPE: [exports.sayncWithAi, {DIE_AT_RANGE: true, BODY: {FOV: base.FOV * 2,},},],
            }, }, {
            POSITION:[    17,     19.5,     0.01,     0,      0,      0,      0,   ],
            },
        ],
    };
    exports.sonckgun = {
        PARENT: [exports.genericTank],
        LABEL: 'Sonck Launcher',
      MAX_CHILDREN: 6,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION:[    8,     20,     -0.01,     4,      0,      0,      0,   ],
            }, {
            POSITION: [    10,     19.5,     0.01,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.eighthreload]),
                TYPE: [exports.sonckWithAi, {DIE_AT_RANGE: true, BODY: {FOV: base.FOV * 2,},}],
            },},
            {
            POSITION:[    10,     19.5,     0.01,     3,      0,      0,      0,   ],
            },
        ],
    };
    exports.evisgun = {
      PARENT: [exports.genericTank],
      LABEL: 'Eviscerator Launcher',
      MAX_CHILDREN: 2,
      GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    18,     12,     0.01,     8,      0,      0,      0.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.eighthreload, g.halfreload, g.halfspeed, g.tenthdamage, g.halfdamage, g.halfdamage]),
                TYPE: [exports.evisWithAi, {DIE_AT_RANGE: true, INDEPENDENT: false, HITS_OWN_TYPE:  'hard'},],
                AUTOFIRE: true,
            }, }, {
            POSITION:[    17,     10,     0.01,     0,      0,      0,      0,   ],
            }, {
            POSITION:[    15,     8,     0.01,     4,      0,      30,      0,   ],
            }, {
            POSITION:[    15,     8,     0.01,     4,      0,     -30,      0,   ],
            }, {
            POSITION:[    15,     8,     0.01,     0,      0,      60,      0,   ],
            }, {
            POSITION:[    15,     8,     0.01,     0,      0,     -60,      0,   ],
            },
        ],
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.snp = {
                PARENT: [exports.genericTank],
                LABEL: 'Spray & Pray',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil, g.hspray, g.doubledamage]),
                        TYPE: exports.hbullet,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.hspray]),
                        TYPE: exports.hbullet,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
                ],
            };
            exports.lesslagspray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil, g.lesslagpls]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lesslagpls]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  25,     8,      1,      0,      0,      0,     0.16, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.33, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.5, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.66, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.83, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },   { 
                    POSITION: [  15,     8,      1,      0,      0,      0,     0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.hline = {
                PARENT: [exports.genericTank],
                LABEL: 'Hellliner',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.4,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.assass]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  25,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.assass]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.assass]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.assass]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.sniper]),
                            TYPE: exports.hive,
                        }, },  {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: '',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
            exports.godkiller = {
                PARENT: [exports.genericTank], //._.
                DANGER: 69420,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.85,
                },
                LABEL: 'Clarise thigh shooter',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      7,      -13,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.thicc]),
                        TYPE: exports.clarisethigh,
                    }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      7,      13,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.thicc]),
                        TYPE: exports.clarisethigh,
                    }, }, {
                    POSITION: [   10,    15,    2.5,    -10,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   20,    12,    2.5,    -12,      0,      0,      0,   ], 
                    },
                ],
            };
exports.tempgkiller = {
  PARENT: [exports.godkiller],
  DIE_AT_LOW_SPEED: true,
  BODY: {
    FOV: base.FOV * 1.5,
  },
};
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, { //half2
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0.,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {//point blank
                    POSITION: [ 15,     3,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.pointblank]),
                            TYPE: [exports.casing, {VARIES_IN_SIZE: true,}],
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.pointblank]),
                            TYPE: [exports.bullet, {VARIES_IN_SIZE: true,}],
                        }, }, {
                    POSITION: [ 15,     3,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.pointblank]),
                            TYPE: [exports.casing, {VARIES_IN_SIZE: true,}],
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.pointblank]),
                            TYPE: [exports.bullet, {VARIES_IN_SIZE: true,}],
                        }, }, {//e
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, },  {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.heck = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Hellfire',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.halfreload, g.hellf, g.lessshud, g.halfreload]),
                            TYPE: exports.hell2,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.cars2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Facade',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -10,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      10,     0.999999,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.cars3 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Psudo',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, }, {
                POSITION: [  19,     12,     0.5,      0,      0,      90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        LABEL: 'Heavy',
                    }, },{
                POSITION: [  19,     12,     0.5,      0,      0,      270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.frickery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Orin',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     2,     1,      0,      2,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, }, {
                POSITION: [  19,     2,     1,      0,      -2,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, }, {
                POSITION: [  15,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');

        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.6,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                RCTD: true,
                EXTRA_UPGRADE_MESSAGE: 'Right-click to use Special Ability.',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm], //hallo? //hi //these are the tanks
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  21,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil, g.bombtrap]),
                            TYPE: exports.frag, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };

        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.tritrap = {
                LABEL: '',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Snipe Guard',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.gust = {
    PARENT: [exports.genericTank],
    LABEL: 'Gust',
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * .9
    },
    GUNS: [{
        POSITION: [5, 9, -1.6, 7, 0, 10, 0]
    }, {
        POSITION: [5, 9, -1.6, 7, 0, -10, 0]
    }]
};
for (let i = 0; i < 5; i++) exports.gust.GUNS.push({
    POSITION: [3, 2.5, 1, 13.75, 0, 4 * i - 20, i / 20],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.puregunner, g.halfrecoil, g.halfreload]),
        TYPE: exports.bullet,
    }
})
for (let i = 0; i < 5; i++) exports.gust.GUNS.push({
    POSITION: [3, 2.5, 1, 13.75, 0, 20 - 4 * i, (i + 11) / 20],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.puregunner, g.halfrecoil, g.halfreload]),
        TYPE: exports.bullet,
    }
})
exports.gust.GUNS.push({
    POSITION: [5, 9, -1.6, 7, 0, 0, 0]
})
exports.swarmest = {
    PARENT: [exports.genericTank],
    LABEL: 'Swarmest',
    DANGER: 7,
    SHAPE: 35,
    BODY: {
        SPEED: base.SPEED * .6
    },
    GUNS: []
};
for (let i = 0; i < 12; i++) exports.swarmest.GUNS.push({
    POSITION: [15, 2.5, 1, 13.75, 0, (360 / 12) * i, i / 12],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lowpower, g.halfreload]),
        TYPE: exports.swarm,
    }
})
/*
Colors:
(negative numbers): broken, sad
0: cyan, i guess
1: yellow green
2: (triangle color) red orange
3: (arena closer) yellow
4: purple
5: (crasher) pink
6: (egg) white
7: weird ass ugly gray-brown
8: white, but yellow ish
9: almost black, outline and inside is the same
10: (player, i think) blue
11: (player + leaderboard, kinda ugly) green
12: (player) red
13: orange-ish yellow
14: darker purple
15: (player) magenta
16: (rock) gray
17: dark gray
18: light gray
19: BLACK
20: blinking, (10) blue and (12) red
21&22: blinking, (10) blue and (16) gray
23&24: blinking, (12) red and (16) gray
25-29: BRIGHT RED
30: (fairly bright) violet
31: (really pretty) blue
32: BRIGHT RED
33: orange
34: (kinda pretty) green
35: (brighter than 13) orange-ish yellow
36: RAINBOW
37-50: BRIGHT RED
51+: unknown 
*/

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    VALUE: 150,
    VARIES_IN_SIZE: true,
    DIE_OF_HUNGER: true,
    CHASE_BOOST: true, 
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 6.5,
        ACCEL: 0.0000001,
        HEALTH: 50,
        DAMAGE: 30,
        PENETRATION: 0.5,
        PUSHABILITY: 15,
        DENSITY: 0.005,
        RESIST: 1,
        RANGE: 2000,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 30,
    COLOR: 19,
    SHAPE: 3,
    SIZE: 10,
    CHASE_BOOST: true,
    BCR: 75,
    DIE_OF_HUNGER: true,
    SKILL: skillSet({
        rld: 5,
        dam: 8, 
        pen: 0.8,
        str: 1,
        spd: 10,
        atk: 0.5,
        hlt: 300,
        shi: 10,
        rgn: 7,
        mob: 0,        
    }),
    VALUE: 30000,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal', 'hangOutNearMaster'],
    AI: { NO_LEAD: true,},
    BODY: {
        FOV: 1,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
        HEALTH: base.HEALTH * 1.3,
        RANGE: 1000,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 10,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 20,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload, g.lesslagpls]),
                TYPE: exports.trap, 
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    COLOR: 20,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: [exports.swarm, {COLOR:36}],
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.sentrygunn, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.3,
        atk: 0.3,
        hlt: 3,
        shi: 0.7,
        rgn: 0.1,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
exports.circlewithsonckguns = {
  PARENT: [exports.genericTank],
  LABEL: 'Circle With Sonck Launchers',
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [  9,     8,      0,     180,     180, 0], 
          TYPE: [exports.sayncgun, { COLOR: 23, }],
          }, {
      POSITION: [  9,     8,      0,      60,    180, 0], 
          TYPE: [exports.sonckgun, { COLOR: 23, }],
          }, {
      POSITION: [  9,     8,      0,     -60,    180, 0], 
          TYPE: [exports.sonckgun, { COLOR: 23, }],
          },
            ],
}
    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 690000,
        BODY: {
            FOV: base.FOV * 1.04,
            SPEED: base.SPEED * 0.3,
            HEALTH: base.HEALTH * 90.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN * 0.01,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
        exports.elite_gunner = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.lesslagpls]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.lesslagspray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.lesslagspray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.lesslagspray, { COLOR: 5, }],
                        },
            ],
        };
        exports.superElite = {
          PARENT: [exports.elite],
          COLOR: 19,
          VALUE: 4200000,
          BODY: {
            FOV: base.FOV * 1.1,
            SPEED: base.SPEED * 0.2,
            HEALTH: base.HEALTH * 300.5,
            SHIELD: base.SHIELD * 1.5,
            REGEN: base.REGEN * 0.02,
            DAMAGE: base.DAMAGE * 2.5,
          },
        };
        exports.elite_elite = { 
            PARENT: [exports.superElite],
            LABEL: 'Supreme Elite Crasher',
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     10,      0,     180,     190, 0], 
                    TYPE: [exports.elite_destroyer, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     10,      0,      60,    190, 0], 
                    TYPE: [exports.elite_gunner, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     10,      0,     -60,    190, 0], 
                    TYPE: [exports.elite_sprayer, { COLOR: 5, }],
                        },
            ],
        };
        exports.elite_massacre = { 
            PARENT: [exports.superElite],
            LABEL: 'DEMON',
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21,     0,      0,     0,     360, 0], 
                    TYPE: [exports.sonckBody2, {COLOR: 37}],
                        }, {
                POSITION: [  20,     0,      0,     0,     0, 0], 
                    TYPE: [exports.circlewithsonckguns, { COLOR: 22, }],
                        },{
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: exports.evisgun,
                    },{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  8,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
        

    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            TEAM: -101,
            COLOR: 17,
            SHAPE: 6,
            SIZE: 38,
            VALUE: 500000,
            BODY: {
                FOV: base.FOV,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 50,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN * 0.05,
                DAMAGE: base.DAMAGE * 5,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   7,     0,      0,      0,     360, 1],
                    TYPE: [exports.hybrid, {CONTROLLERS: ['nearestDifferentMaster'],},],
                        },
            ],
        };
    })();
exports.ohGodWhy = {
                PARENT: [exports.genericTank],
                DANGER: 1,
                LABEL: 'Sentinel',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 1.5,
                    HEALTH: base.HEALTH * 0.5,
                    REGEN: base.REGEN * 0.5,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    8,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   7,    4,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.eighthreload, g.eighthreload, g.eighthreload, g.eighthreload, g.halfreload, g.halfreload, g.halfsize, g.tenthhealth]),
                            TYPE: [exports.sentryTrap, {CHASE_BOOST: false}],       
                            SYNCS_SKILLS: true,   
                            AUTOFIRE:true,
                        }, },  {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0.5,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 2,
                            SHOOT_SETTINGS: combineStats([g.eighthreload, g.eighthreload, g.eighthreload, g.eighthreload, g.halfreload, g.halfreload, g.halfsize, g.tenthhealth]),
                            TYPE: [exports.sentryTrap, {CHASE_BOOST: false}],   
                            SYNCS_SKILLS: true,   
                            AUTOFIRE:true,
                        }, },  {                            
                    POSITION: [   4,    15,      0.6,      8,      0,      0,      0,   ]
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      30,      0.25,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.eighthreload, g.eighthreload, g.eighthreload, g.eighthreload, g.halfreload, g.halfreload, g.halfsize, g.tenthhealth]),
                            TYPE: [exports.sentrySwarm, {CHASE_BOOST: false}],       
                            SYNCS_SKILLS: true,   
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      30,      0.75,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 2,
                            SHOOT_SETTINGS: combineStats([g.eighthreload, g.eighthreload, g.eighthreload, g.eighthreload, g.halfreload, g.halfreload, g.halfsize]),
                            TYPE: [exports.sentrySwarm, {CHASE_BOOST: false}],       
                            SYNCS_SKILLS: true,   
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      -30,      0.25,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.eighthreload, g.eighthreload, g.eighthreload, g.eighthreload, g.halfreload, g.halfreload, g.halfsize]),
                            TYPE: [exports.sentryGun, {CHASE_BOOST: false}],       
                            SYNCS_SKILLS: true,   
                            AUTOFIRE: true,
                        }, }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      -30,      0.75,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 2,
                            SHOOT_SETTINGS: combineStats([g.eighthreload, g.eighthreload, g.eighthreload, g.eighthreload, g.halfreload, g.halfreload, g.halfsize]),
                            TYPE: [exports.sentryGun, {CHASE_BOOST: false}],       
                            SYNCS_SKILLS: true,   
                            AUTOFIRE: true,
                        }, },
                ],
            };
exports.ohGodWhy2 = {
                PARENT: [exports.genericTank],
                DANGER: 120,
                LABEL: 'Sentinel but not balanced',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 1.5,
                    HEALTH: base.HEALTH,
                    REGEN: base.REGEN,
                    FOV: base.FOV * 2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    8,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   7,    4,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 7,
                            SHOOT_SETTINGS: combineStats([g.halfreload, g.halfreload, g.eighthreload, g.halfsize, g.doublespeed, g.doublepenetration]),
                            TYPE: [exports.sentryTrap, {DIE_AT_RANGE: true, BODY :{FOV: 5, RANGE: 10000},},],       
                            SYNCS_SKILLS: true,   
                            AUTOFIRE:true,
                        }, },  {
                    POSITION: [   2,    14,     1.3,     18,      0,      -30,      0.5,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 7,
                            SHOOT_SETTINGS: combineStats([g.halfreload, g.halfreload, g.eighthreload, g.halfsize, g.doublespeed, g.doublepenetration]),
                            TYPE: [exports.sentryGun, {DIE_AT_RANGE: true, BODY :{FOV: 5, RANGE: 10000},}],   
                            SYNCS_SKILLS: true,   
                            AUTOFIRE:true,
                        }, },  {                            
                    POSITION: [   4,    15,      0.6,      8,      0,      0,      0,   ]
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      30,      0.5,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 7,
                            SHOOT_SETTINGS: combineStats([g.halfreload, g.halfreload, g.eighthreload, g.halfsize, g.doublespeed, g.doublepenetration]),
                            TYPE: [exports.sentrySwarm, {DIE_AT_RANGE: true, BODY :{FOV: 5, RANGE: 10000},}],       
                            SYNCS_SKILLS: true,   
                            AUTOFIRE: true,
                        }, }, 
                ],
            };
exports.autoObstacle = makeAuto(exports.babyObstacle, 'Auto-Rock', { type: exports.obstAutoTurret, size: 3, });

exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10,
    },
    //COLOR: 17,
    NAME: "ai_",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
};

// UPGRADE PATHS
exports.testbed.UPGRADES_TIER_1 = [
    exports.basic, exports.obsie, exports.bossbranch, exports.opbranch, exports.t4branch, exports.partsbranch, exports.basicbranch, exports.miscbranch, exports.felipebranch, exports.godbranch, exports.resetlevel
];
exports.mainmenu.UPGRADES_TIER_1 = [exports.testbed];
exports.bossbranch.UPGRADES_TIER_1 = [exports.elite_destroyer, exports.elite_gunner, exports.elite_sprayer, exports.elite_elite, exports.elite_massacre, exports.palisade];
exports.opbranch.UPGRADES_TIER_1 = [exports.godkiller, exports.retribution, exports.heck, exports.ohGodWhy2];
exports.t4branch.UPGRADES_TIER_1 = [exports.sonck, exports.evis, exports.hline, exports.snp, exports.deca];
exports.partsbranch.UPGRADES_TIER_1 = [exports.hatbranch, exports.sayncgun, exports.sonckgun, exports.evisgun, exports.sayncWithAi, exports.sonckWithAi, exports.nuke, exports.evisWithAi, exports.skimturret, exports.frag];
  exports.hatbranch.UPGRADES_TIER_1 = [exports.wizHat, exports.wizHatRim, exports.appHat, exports.shHat, exports.spHat];
exports.basicbranch.UPGRADES_TIER_1 = [exports.basic, exports.basit, exports.basick, exports.healtest, exports.basicWithAHat, exports.shieldtest, exports.shieldtest2];
exports.miscbranch.UPGRADES_TIER_1 = [exports.hive2, exports.snake2, exports.arrowtank, exports.WHAT, exports.felipe];
exports.felipebranch.UPGRADES_TIER_1 = [exports.felipe];
exports.godbranch.UPGRADES_TIER_1 = [exports.intapower, exports.invulpower, exports.outpower, exports.skillbranch, exports.levelpower, exports.maxoutpower]; //power 
  exports.skillbranch.UPGRADES_TIER_1 = [exports.dfltpower, exports.smshpower, exports.evispower];
exports.branch.UPGRADES_TIER_1 = [exports.mainmenu];

exports.power.UPGRADES_TIER_1 = [exports.godbranch];

exports.godkiller.UPGRADES_TIER_1 = [
  exports.godkiller
];
exports.obsie.UPGRADES_TIER_1 = [
  exports.obsie01, exports.obsie1, exports.obsie2,  exports.obsie4, exports.obsie5, exports.obsie6, exports.obsie7, exports.obsie8, exports.obsie9, exports.obsie10, exports.obsie15, exports.obsie20, exports.obsie30, exports.obsie, exports.mainmenu
];
exports.obsie01.UPGRADES_TIER_1 = [
  exports.obsie1, exports.obsie01, exports.obsie002,
];
exports.retribution.UPGRADES_TIER_3 = [exports.retribution2];
exports.retribution2.UPGRADES_TIER_4 = [exports.asIfTheLastOneWasntEnough];

// tank upgrades
exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.ohGodWhy];
        exports.basic.UPGRADES_TIER_3 = [exports.single];
exports.basick.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.basicka];
        exports.basick.UPGRADES_TIER_3 = [exports.single];
exports.basicka.UPGRADES_TIER_1 = [exports.basickb, exports.basick, exports.basickfake]; exports.basickb.UPGRADES_TIER_1 = [exports.basickc]; exports.basickc.UPGRADES_TIER_1 = [exports.basickd]; exports.basickd.UPGRADES_TIER_1 = [exports.basicke]; exports.basicke.UPGRADES_TIER_1 = [exports.basickf]; exports.basickf.UPGRADES_TIER_1 = [exports.basickg, exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound]; exports.basickg.UPGRADES_TIER_1 = [exports.basickh, exports.basickfake]; exports.basickh.UPGRADES_TIER_1 = [exports.basicki]; exports.basicki.UPGRADES_TIER_1 = [exports.basickj];
exports.basickj.UPGRADES_TIER_2 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.ohGodWhy, exports.tempgkiller]
    exports.basic.UPGRADES_TIER_2 = [exports.smash];
        exports.smash.UPGRADES_TIER_3 = [exports.saync, exports.spike, exports.autosmash, exports.twinsmash];

            exports.saync.UPGRADES_TIER_4 = [exports.sonck];

            exports.spike.UPGRADES_TIER_4 = [exports.evis];
//??? whatcha doin //making sanc the whever have a more fitting upgrade. //no, dont. You don't get it. Saync is supposed to be fast, spike is supposed to be strong //it looks like spike.
//and auto thing is just overpowered for fun k
//they have a huge damage difference
//k
//wanna add more tanks?
//i wanna learn how
//ok //yep
//it's literally the same as modifying one
//ok
//first im gonna change the megasmash name to the correct one in the code.
//done.
//poopoo

/*
How 2 control rates of shape spawning?
It's in config.json at the bottem of the code
k

*/
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa];
        exports.twin.UPGRADES_TIER_3 = [exports.triple];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple, exports.gust];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4,exports.machinegunner];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.rifle];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon];
            // exports.ranger.UPGRADES_TIER_4 = [exports.branger];
            exports.assassin.UPGRADES_TIER_4 = [exports.hline];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind];

    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.mini, exports.gunner];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];
            exports.spray.UPGRADES_TIER_4 = [exports.snp];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.construct];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer, exports.frickery, exports.cars3, exports.cars2];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun];
            exports.stream.UPGRADES_TIER_4 = [exports.hline];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.flank.UPGRADES_TIER_3 = [];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap, exports.heptatrap];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer];
        exports.director.UPGRADES_TIER_3 = [exports.factory];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner];  
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress];

    exports.pound.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.builder];
        exports.pound.UPGRADES_TIER_3 = [exports.shotgun2];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer];
        exports.engineer.UPGRADES_TIER_4 = [exports.builder, exports.ohGodWhy];
    


    /*exports.smash.UPGRADES_TIER_3 = [exports.saync, exports.spike, exports.autosmash];
            
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.triple, exports.hexa];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.autodouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.benthybrid];
        exports.triple.UPGRADES_TIER_3 = [exports.quint];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.overseer, exports.hunter, exports.builder];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.battleship
            , exports.overtrap, exports.necromancer, exports.factory, exports.fortress];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder];
        
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.gunner, exports.artillery];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.mortar, exports.stream];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo];
        exports.tri.UPGRADES_TIER_3 = [exports.booster, exports.fighter, exports.bomber, exports.autotri];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.guntrap, exports.fortress, exports.bomber];*/




//(jousting map dimensions: 1x300k)
//(normal map dimensions: 4.5kx4.5k)

/* [
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "roid", "roid", "roid", "roid", "roid", "roid", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "roid", "roid", "nest", "nest", "roid", "roid", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "roid", "roid", "nest", "nest", "nest", "nest", "roid", "roid", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "roid", "roid", "nest", "nest", "nest", "nest", "roid", "roid", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "roid", "roid", "nest", "nest", "roid", "roid", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "roid", "roid", "roid", "roid", "roid", "roid", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ]
  ],
  
  [
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "nest", "nest", "nest", "nest", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "nest", "nest", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ]
  ],
  
  [
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm" ]
  ],
    "WIDTH": 7000, 
  "HEIGHT": 7000,
  "MODE": "tdm",
  "RANDOM_COLORS": false,
  "BANNED_CHARACTER_REGEX": "/[\uFDFD\u200E\u0000]/gi", 
  "ROOM_SETUP": [
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid",  "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid", "roid", "roid",  "roid", "roid", "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid", "roid", "rock", "rock",  "rock", "rock", "roid", "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid", "rock", "rock", "rock", "rock",  "rock", "rock", "rock", "rock", "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "rock", "rock", "rock", "nest", "nest",  "nest", "nest", "rock", "rock", "rock", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid", "rock", "rock", "nest", "nest", "nest",  "nest", "nest", "nest", "rock", "rock", "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "rock", "rock", "nest", "nest", "nest", "nest",  "nest", "nest", "nest", "nest", "rock", "rock", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "rock", "rock", "nest", "nest", "nest", "nest",  "nest", "nest", "nest", "nest", "rock", "rock", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "rock", "rock", "nest", "nest", "nest", "nest",  "nest", "nest", "nest", "nest", "rock", "rock", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "rock", "rock", "nest", "nest", "nest", "nest",  "nest", "nest", "nest", "nest", "rock", "rock", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid", "rock", "rock", "nest", "nest", "nest",  "nest", "nest", "nest", "rock", "rock", "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "rock", "rock", "rock", "nest", "nest",  "nest", "nest", "rock", "rock", "rock", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid", "rock", "rock", "rock", "rock",  "rock", "rock", "rock", "rock", "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid", "roid", "rock", "rock",  "rock", "rock", "roid", "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid", "roid", "roid",  "roid", "roid", "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "roid", "roid", "roid",  "roid", "roid", "roid", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ],
    [ "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm",  "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm", "norm"  ]
  ],
    "FOOD": [
    0, 
    1,
    0.75,
    0.5,
    0.5,
    0,
    0,
    0,
    0,
    0
  ],
  "FOOD_NEST": [
    0, 
    1.2,
    0.9,
    0.75,
    0.23,
    0,
    0,
    0,
    0,
    0
  ],
  "X_GRID": 40,
  "Y_GRID": 40,
  */