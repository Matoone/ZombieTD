let canvas;
let ctx;
const FUU = 3;
let wavesConfig;

let gameTime = 0;
let gameSpeed = 1;
let previousGameSpeed = 1;

let player1 = {hp:20, money: 14};

let currentState;
let currentWave = 0;
let currentWaveSeconds = 0;
let globalClocker = null;
let currentWaveClocker = null;

let actualWaveDisplay;
let currentMap;

let upgradeButton;
let sellButton;
let gameSpeedButton;

let path_png;

let grass_1_png, grass_2_png, grass_3_png;
let entrance_png;
let exit_png;
let groundTile_png;
let upTile_png;
let wall_png;
let tower_machinegun_0_png;
let tower_machinegun_0_firing_png;

let tower_machinegun_green_png;
let tower_machinegun_blue_png;
let tower_machinegun_red_png;
let tower_machinegun_firing_green_png;
let tower_machinegun_firing_blue_png;
let tower_machinegun_firing_red_png;
let tower_diamond_green_png;
let tower_diamond_blue_png;
let tower_diamond_red_png;
let tower_slow_green_png;
let tower_slow_blue_png;
let tower_slow_red_png;
let explosion_1_png;
let tower_missile_laucher_green_png;
let tower_missile_laucher_blue_png;
let tower_missile_laucher_red_png;
let missile_green_png;
let missile_blue_png;
let missile_red_png;

let tower_tesla_green_png;
let tower_tesla_blue_png;
let tower_tesla_red_png;


let lightning_1_png;
let lightning_2_png;
let lightning_3_png;

let basic_zombie_png;
let fat_zombie_png;
let runner_zombie_png;



let firing_png;

let buildMapButton;
let wallButton;
let groundTileButton;
let clearTileButton;
let fillTilesButton;

let buildTowerButton;
let buildMachinegunButton;
let deleteTowerButton;

let machinegunButton;
let diamondButton;
let missileLauncherButton;
let slowButton;
let teslaButton;



let unitTiles = [];
let groundTiles = [];
let upTiles = [];
let walls = [];

let entrances = [];
let exits = [];

let towers = [];
let projectiles = [];
let lightnings = [];

let zombies = [];

let entrancesCount = 0;
let exitsCount = 0;

let spawnCount = 0;
let spawnCountAlt = 0;

const SPAWN_COUNT_VALUE = 20;


let wavesToBeSpawned = null;

let basicsToBeSpawned = 0;
let fatsToBeSpawned = 0;
let runnersToBeSpawned = 0;

let basicsToBeSpawnedAlt = 0;
let fatsToBeSpawnedAlt = 0;
let runnersToBeSpawnedAlt = 0;



const TILE_SIZE = 64;

const DIST_TOLERANCE = TILE_SIZE / 4;




const SYS_DELAY = 40;



const MACHINEGUN_COST = 4;
const MACHINEGUN_UPGRADE_COST = 3;

const MACHINEGUN_RATE_OF_FIRE = 150;
const MACHINEGUN_DAMAGE = 8;
const MACHINEGUN_RANGE = TILE_SIZE * 1.5;

const DIAMOND_COST = 25;
const DIAMOND_RATE_OF_FIRE = 150;
const DIAMOND_RANGE = TILE_SIZE *2;
const DIAMOND_DAMAGE = 42;
const DIAMOND_UPGRADE_COST = 20;

const MISSILE_LAUNCHER_COST = 15;
const MISSILE_LAUNCHER_UPGRADE_COST = 12;
const MISSILE_LAUNCHER_RANGE = TILE_SIZE * 4;
const MISSILE_LAUNCHER_RATE_OF_FIRE = 14;
const MISSILE_DAMAGE = 120;

const MISSILE_SPEED = 12; 
const MISSILE_EXPLOSION_RADIUS = TILE_SIZE;
const EXPLOSION_TOLERANCE = 2;

const SLOW_RANGE = TILE_SIZE*2;
const SLOW_RATE_OF_FIRE = 500;
const SLOW_DAMAGE = 0;
const SLOW_COST = 15;
const SLOW_UPGRADE_COST = 20;

const SLOW_RADIUS = TILE_SIZE;







const TESLA_RATE_OF_FIRE = 16;
const TESLA_DAMAGE = 3600;
const TESLA_RANGE = TILE_SIZE * 2;
const TESLA_COST = 50;
const TESLA_UPGRADE_COST = 40;

const LIGHTNING_COUNT = 6;





const MOVE_SPEED = 1;


const BASIC_ZOMBIE_SPEED = 36;
const BASIC_ZOMBIE_HP = 35;
const BASIC_ZOMBIE_COSTVALUE = 3;

const FAT_ZOMBIE_SPEED = 18;
const FAT_ZOMBIE_HP = 300;
const FAT_ZOMBIE_COSTVALUE = 9;

const RUNNER_ZOMBIE_SPEED = 64;
const RUNNER_ZOMBIE_HP = 20;
const RUNNER_ZOMBIE_COSTVALUE = 5;

const BASIC_ZOMBIES_SPAWN_INTERVAL = 1000;

const SHOOT_COUNT_BASIS = 500;

const NBR_OF_WAVES_TOTAL = 20;

const WAVE_1_BASIC_SOLDIERS = 2;
const WAVE_2_BASIC_SOLDIERS = 3;
const WAVE_3_BASIC_SOLDIERS = 4;
const WAVE_4_BASIC_SOLDIERS = 5;
const WAVE_5_BASIC_SOLDIERS = 6;
const WAVE_6_BASIC_SOLDIERS = 7;
const WAVE_7_BASIC_SOLDIERS = 8;
const WAVE_8_BASIC_SOLDIERS = 9;
const WAVE_9_BASIC_SOLDIERS = 10;
const WAVE_10_BASIC_SOLDIERS = 10;
const WAVE_11_BASIC_SOLDIERS = 10;
const WAVE_12_BASIC_SOLDIERS = 10;
const WAVE_13_BASIC_SOLDIERS = 10;
const WAVE_14_BASIC_SOLDIERS = 10;
const WAVE_15_BASIC_SOLDIERS = 10;
const WAVE_16_BASIC_SOLDIERS = 10;
const WAVE_17_BASIC_SOLDIERS = 10;
const WAVE_18_BASIC_SOLDIERS = 10;
const WAVE_19_BASIC_SOLDIERS = 10;
const WAVE_20_BASIC_SOLDIERS = 10;
const WAVE_21_BASIC_SOLDIERS = 10;
const WAVE_22_BASIC_SOLDIERS = 10;

const TIME_BETWEEN_UNITS = 2000;

let HpDivider = 2;
const NO_ZOMBIE_COUNT = 100;
let noZombieCount = NO_ZOMBIE_COUNT;


const MISSILE_OFFSET_X = TILE_SIZE/16;
const MISSILE_OFFSET_Y = TILE_SIZE/8;
const ZOMBIE_OFFSET_X = TILE_SIZE/8;
const ZOMBIE_OFFSET_Y = TILE_SIZE/4;

const OTHER_ZOMBIE_DETECTION_RANGE = TILE_SIZE/8;








let hpDisplay;
let moneyDisplay;
let timeDisplay;



let whileCount;
const MAX_WHILE_CALC = 1200;
class unitTile
{
    constructor()
    {
        this.status;
        this.isSlotAvailable = true;
        this.wall = null;
        this.entrance = null;
        this.exit = null;
        this.groundTile = null;
        this.neighbours;
        this.distToExit;
        
        

        
    }



    returnBestNeighbor(exclusionTile = null) 
    {
        let neighbors = this.findTileNeighbors();
           let temp = null;
           for(let j =0; j < neighbors.length; j++)
           {
               if(exclusionTile)
               {
                   if(neighbors[j] != exclusionTile)
                   {
                        if(temp == null)
                        {
                            temp = neighbors[j];
                        }
                        else
                        {
                            if( neighbors[j].distToExit < temp.distToExit )
                            {
                                temp = neighbors[j];
                            }
                        }
                   }
                   else
                   {
                       console.log("exclusion!!")
                   }
               }
               else
               {
                    if(temp == null)
                    {
                        temp = neighbors[j];
                    }
                    else
                    {
                        if( neighbors[j].distToExit < temp.distToExit )
                        {
                            temp = neighbors[j];
                        }
                    }
               }
                
           }
           return temp;
    }



    createTower(towerType)
{
     // let path = returnPathArray(this);
        //if(path != null)
        //{
            let tower1 = new tower();
    tower1.type = towerType;
    tower1.unitTile = this;
    tower1.unitTile.groundTile.isTrapSlotOccupied = true;
    if(tower1.type == "machinegun")
    {
        tower1.rateOfFire = MACHINEGUN_RATE_OF_FIRE;
        tower1.dmg = MACHINEGUN_DAMAGE;
        tower1.range = MACHINEGUN_RANGE;
        tower1.cost = MACHINEGUN_COST;
        tower1.upgradeCost = MACHINEGUN_UPGRADE_COST;
    }
    else if(tower1.type == "diamond")
    {
        tower1.rateOfFire = DIAMOND_RATE_OF_FIRE;
        tower1.dmg = DIAMOND_DAMAGE;
        tower1.range = DIAMOND_RANGE;
        tower1.cost = DIAMOND_COST;
        tower1.upgradeCost = DIAMOND_UPGRADE_COST;
    }
    else if(tower1.type == "missileLauncher")
    {
        tower1.rateOfFire = MISSILE_LAUNCHER_RATE_OF_FIRE;
        tower1.dmg = null;
        tower1.range = MISSILE_LAUNCHER_RANGE;
        tower1.cost = MISSILE_LAUNCHER_COST;
        tower1.upgradeCost = MISSILE_LAUNCHER_UPGRADE_COST;
        
    }
    else if(tower1.type == "slow")
    {
        tower1.rateOfFire = 500;
        tower1.dmg = 0;
        tower1.range = SLOW_RANGE;
        tower1.cost = SLOW_COST;
        tower1.upgradeCost = SLOW_UPGRADE_COST;
        
    }
    else if(tower1.type == "tesla")
    {
        tower1.rateOfFire = TESLA_RATE_OF_FIRE;
        tower1.dmg = TESLA_DAMAGE;
        tower1.range = TESLA_RANGE;
        tower1.cost = TESLA_COST;
        tower1.upgradeCost = TESLA_UPGRADE_COST;
        
    }
    this.groundTile.tower = tower1;

    towers.push(tower1);
       // }
    
   /*  if(tower1.type == "Machinegun")
    {
        
    } */

}
    createWall()
    {
        console.log("creation wall");
        if(this.isSlotAvailable)
        {
            this.isSlotAvailable = false;
            let wall1 = new wall();
            wall1.status = this.status;
            this.wall = wall1;
        }
        
    }

    createGroundTile()
    {
        console.log("creation groundTile")
        if(this.isSlotAvailable)
        {
            this.isSlotAvailable = false;
            let groundTile1 = new groundTile();
            groundTile1.status = this.status;
            this.groundTile = groundTile1;
        }
    }

    clearTile()
    {
        console.log("clear Tile")
        if(!this.isSlotAvailable)
        {
            this.isSlotAvailable = true;
            this.wall = null;
            this.entrance = null;
            this.exit = null;
            this.groundTile = null;
        }
    }

    findTileNeighbor_N()
    {
        for(let i =0; i < unitTiles.length; i++)
        {
            if(     (   (unitTiles[i].groundTile != null)    &&         (unitTiles[i].groundTile.isTrapSlotOccupied == false)       )        ||      (unitTiles[i].exit != null)        ||      (unitTiles[i].entrance != null)   )
            {

                if(         (this.status.x == unitTiles[i].status.x)       &&           (this.status.y == unitTiles[i].status.y + TILE_SIZE)     )
                {
                    return unitTiles[i];
                }
            }
        }
    }

    findTileNeighbor_S()
    {
        for(let i =0; i < unitTiles.length; i++)
        {
            if(     (   (unitTiles[i].groundTile != null)    &&         (unitTiles[i].groundTile.isTrapSlotOccupied == false)       )        ||      (unitTiles[i].exit != null)        ||      (unitTiles[i].entrance != null)   )
            {
                
                if(         (this.status.x == unitTiles[i].status.x)       &&           (this.status.y == unitTiles[i].status.y - TILE_SIZE)     )
                {
                    return unitTiles[i];
                }
            }
        }
    }

    findTileNeighbor_W()
    {
        for(let i =0; i < unitTiles.length; i++)
        {
            if(     (   (unitTiles[i].groundTile != null)    &&         (unitTiles[i].groundTile.isTrapSlotOccupied == false)       )        ||      (unitTiles[i].exit != null)        ||      (unitTiles[i].entrance != null)   )
            {
                
                if(         (this.status.x == unitTiles[i].status.x + TILE_SIZE)       &&           (this.status.y == unitTiles[i].status.y)     )
                {
                    return unitTiles[i];
                }
            }
        }
    }

    findTileNeighbor_E()
    {
        for(let i =0; i < unitTiles.length; i++)
        {
            if(     (   (unitTiles[i].groundTile != null)    &&         (unitTiles[i].groundTile.isTrapSlotOccupied == false)       )        ||      (unitTiles[i].exit != null)        ||      (unitTiles[i].entrance != null)   )
            {
                
                if(         (this.status.x == unitTiles[i].status.x - TILE_SIZE)       &&           (this.status.y == unitTiles[i].status.y)     )
                {
                    return unitTiles[i];
                }
            }
        }
    }

    findTileNeighbors()
    {
        this.neighbours = [];

       let N = this.findTileNeighbor_N();
       let S = this.findTileNeighbor_S();
        let W = this.findTileNeighbor_W();
       let E = this.findTileNeighbor_E();

       if(N)
       {
           this.neighbours.push(N);
       }

       if(S)
       {
           this.neighbours.push(S);
       }

       if(W)
       {
           this.neighbours.push(W);
       }

       if(E)
       {
           this.neighbours.push(E);
       }

       return this.neighbours;
    }

}
class map
{
    constructor()
    {
        this.width;
        this.height;
        this.entrances;
        this.exits;

        this.nbrOfPaths;
        this.depthOfPaths;
        this.turnsOfPaths;

        this.amountOfBuildableUptiles;
    }

    saveMap()
    {
        let stored = { 
           // currentMap : currentMap,
            unitTiles: unitTiles, 
            groundTiles : groundTiles,
            upTiles : upTiles,
            walls : walls,
            
            entrances : entrances,
            exits : exits
        }
        localStorage.setItem('stored', JSON.stringify(stored));
    }

    loadMap()
    {
        let stored = JSON.parse(localStorage.getItem('stored'));
       // currentMap = stored.currentMap;
       for(let i =0; i < unitTiles.length; i++)
       {
           unitTiles[i].status = stored.unitTiles[i].status;
           unitTiles[i].wall = stored.unitTiles[i].wall;
           //unitTiles[i].entrance = stored.unitTiles[i].entrance;
           //unitTiles[i].exit = stored.unitTiles[i].exit;
           unitTiles[i].groundTile = stored.unitTiles[i].groundTile;
           unitTiles[i].neighbours = stored.unitTiles[i].neighbours;
           unitTiles[i].distToExit = stored.unitTiles[i].distToExit;
           unitTiles[i].isSlotAvailable = stored.unitTiles[i].isSlotAvailable;

       }
       // unitTiles = stored.unitTiles;
       for(let j = 0; j < groundTiles.length; j++)
       {
        groundTiles[j].type = stored.groundTiles[j].type;
        groundTiles[j].status = stored.groundTiles[j].status;
        groundTiles[j].image = stored.groundTiles[j].image;
        groundTiles[j].isTrapSlotOccupied = stored.groundTiles[j].isTrapSlotOccupied;
        groundTiles[j].tower = stored.groundTiles[j].tower;
        this.tower;
       }
      
       for(let k = 0; k < upTiles.length; k++)
       {
        upTiles[k].type = stored.upTiles[k].type;
        upTiles[k].status = stored.upTiles[k].status;
        upTiles[k].image = stored.upTiles[k].image;
        upTiles[k].towerSlot = stored.upTiles[k].towerSlot;
        
       }
       for(let l = 0; l < walls.length; l++)
       {
        walls[l].status = stored.walls[l].status;
        walls[l].image = stored.walls[l].image;
        walls[l].trapSlot = stored.walls[l].trapSlot;
        
       }

       /* for(let m = 0; m < entrances.length; m++)
       {
        entrances[m].type = stored.entrances[m].type;
        entrances[m].status = stored.entrances[m].status;
        entrances[m].image = stored.entrances[m].image;
        entrances[m].zombiesToSpawn = stored.entrances[m].zombiesToSpawn;
        entrances[m].waves = stored.entrances[m].waves;
        entrances[m].countBtwUnits = stored.entrances[m].countBtwUnits;

       } */

       for (let n = 0; n < exits.length; n++)
       {
        exits[n].type = stored.exits[n].type;
        exits[n].status = stored.exits[n].status;
        exits[n].image = stored.exits[n].image;
        
       }
        //groundTiles = stored.groundTiles;
        //upTiles = stored.upTiles;
        //walls = stored.walls;
        //entrances = stored.entrances;
       // exits = stored.exits;
    }

    buildMap()
{
    buildMapButton = document.getElementById("buildMapButton");
    buildMapButton.textContent = "Finished editing !";
    buildMapButton.className = "menuButton";
    buildMapButton.onclick = function(){
        for(let i = 0; i < unitTiles.length; i++)
        {
            if(unitTiles[i].isSlotAvailable == true)
            {
                alert("You need to fullfill the level first!");
                return;
            }
        }
        toggle_div("menu");
        updateTime();
        currentState = "playing";
        window.addEventListener("keyup", togglePauseGame);

        canvas.removeEventListener("click", addWallListeners);
        canvas.removeEventListener("click", addGroundTilesListeners);
        canvas.removeEventListener("click", addClearTileListeners);

        gameSpeedButton.style.display = "block";
        
        gameSpeedButton.onclick = function(){
            toggleGameSpeed();
        }
        buildTowerButton = document.getElementById("buildTowerButton");
        buildTowerButton.style.display = "block";
    };
    wallButton = document.createElement("button");
    wallButton.className = "menuButton";
    wallButton.type = "button";
    wallButton.value = "Wall";
    wallButton.textContent = "Wall";
    wallButton.onclick = function(){
        console.log("clicked");

        canvas.addEventListener("click", addWallListeners);
        
    };
    document.getElementById("menu").appendChild(wallButton);


    groundTileButton = document.createElement("button");
    groundTileButton.type = "button";
    groundTileButton.className = "menuButton";
    groundTileButton.value = "groundTile";
    groundTileButton.textContent = "GroundTile";
    groundTileButton.onclick = function(){
        console.log("clicked");

        canvas.addEventListener("click", addGroundTilesListeners);
        
    };
    document.getElementById("menu").appendChild(groundTileButton);

    clearTileButton = document.createElement("button");
    clearTileButton.type = "button";
    clearTileButton.className = "menuButton";
    clearTileButton.textContent = "Clear Tile";
    clearTileButton.onclick = function(){
        console.log("clicked");
        canvas.addEventListener("click", addClearTileListeners);
    };
    document.getElementById("menu").appendChild(clearTileButton);

    fillTilesButton = document.createElement("button");
    fillTilesButton.type = "button";
    fillTilesButton.className = "menuButton";
    fillTilesButton.textContent = "Fill all clear Tiles";
    fillTilesButton.onclick = function(){
        for(let i = 0; i < unitTiles.length; i++)
        {
           if   (
                unitTiles[i].isSlotAvailable
                )
                {
                    unitTiles[i].createGroundTile();
                } 
        }
    };
    document.getElementById("menu").appendChild(fillTilesButton);
    //document.getElementById("machinegunButton")
    
}
     generateUnitTiles()
     {
        for(let i = 0; i < (this.width / TILE_SIZE); i++)
        {
            for(let j = 0; j < (this.height / TILE_SIZE); j++)
            {
                let unitTile1 = new unitTile();
                unitTile1.status = new status(i *  TILE_SIZE, j * TILE_SIZE);
                
                unitTiles.push(unitTile1);
            }
        }

     } 
    /* generatePath(entrance, exit, nbrOfTurns)
    {
        let z =Math.round(Math.random()*9 +1); // renvoie un entier entre 1 et 10;
        let pathTiles = [];
        let tempTile;
        if(z < this.height-1)
        {
            for(let i = 0; i < z; i++)
            {
                let groundTile1 = new groundTile();
                let statusGroundTile = new status(entrance.status.x, entrance.status.y - ((i+1)*TILE_SIZE));
                groundTile1.status = statusGroundTile;
                pathTiles.push(groundTile1);
                groundTiles.push(groundTile1);
                
            }
            tempTile = pathTiles[pathTiles.length -1];
        }
        let random = Math.random();
        
        if(random <= 0.5) // go right
        {
            
            z =Math.round(Math.random()*9 +1); // renvoie un entier entre 1 et 10;
            if(tempTile.x + z < this.width)
            {
                for(let j = 0; j < z; j++)
                {
                    let groundTile2 = new groundTile();
                    let statusGroundTile2 = new status(tempTile.status.x + ((j+1)*TILE_SIZE), tempTile.status.y);
                    groundTile2.status = statusGroundTile2;
                    pathTiles.push(groundTile2);
                    groundTiles.push(groundTile2);
                    
                }
                tempTile = pathTiles[pathTiles.length -1];
            }
        }
        else  // go left
        {
            z =Math.round(Math.random()*9 +1); // renvoie un entier entre 1 et 10;
            if(tempTile.x - z > 0)
            {
                for(let m = 0; m < z; m++)
                {
                    let groundTile2 = new groundTile();
                    let statusGroundTile2 = new status(tempTile.status.x + ((-m-1)*TILE_SIZE), tempTile.status.y);
                    groundTile2.status = statusGroundTile2;
                    pathTiles.push(groundTile2);
                    groundTiles.push(groundTile2);
                    
                }
                tempTile = pathTiles[pathTiles.length -1];
            }
        }
        random = Math.random();
        if(random <= 0.5) // go up
        {
            z =Math.round(Math.random()*9 +1); // renvoie un entier entre 1 et 10;
            if(tempTile.y - z > 0)
            {
                for(let k = 0; k < z; k++)
                {
                    let groundTile1 = new groundTile();
                    let statusGroundTile = new status(tempTile.status.x, tempTile.status.y - ((k+1)*TILE_SIZE));
                    groundTile1.status = statusGroundTile;
                    pathTiles.push(groundTile1);
                    groundTiles.push(groundTile1);
                    
                }
                tempTile = pathTiles[pathTiles.length -1];
            }
        }
        else
        {
            z =Math.round(Math.random()*9 +1); // renvoie un entier entre 1 et 10;
            if(tempTile.y + z < this.height)
            {
                for(let l = 0; l < z; l++)
                {
                    let groundTile1 = new groundTile();
                    let statusGroundTile = new status(tempTile.status.x, tempTile.status.y + ((l+1)*TILE_SIZE));
                    groundTile1.status = statusGroundTile;
                    pathTiles.push(groundTile1);
                    groundTiles.push(groundTile1);
                    
                }
                tempTile = pathTiles[pathTiles.length -1];
            }
        }
    } */
  /*   generateEntrances()
    {
        for(let i =0; i < this.entrances; i++)
        {
            let entrance1 = new entrance();
            entrance1.type = "basic";
           
            entrance1.status = new status(this.width/(2+i), this.height - TILE_SIZE)

            if(entrance1.type == "basic")
            {
                entrance1.zombiesToSpawn = []; 
            }
            entrances.push(entrance1);
            
        }
        
    }

    generateExits()
    {
        for ( let i = 0; i< this.exits; i++)
        {
            let exit1 = new exit();
            exit1.type = "basic";
            exit1.status = new status(this.width/(2+i),  0);

            exits.push(exit1);
        }   
    } */
    popEntrances(typeNbr)
    {
        for(let i = 0; i < unitTiles.length; i++)
        {
            for(let j = 0; j < this.entrances; j++)
            {
                if(     (unitTiles[i].status.x == this.width / (this.entrances +1))      &&      (unitTiles[i].status.y == this.height - TILE_SIZE)     )
                {
                    let entrance1 = new entrance();
                    entrance1.status = unitTiles[i].status;
                    entrance1.type = typeNbr;
                    unitTiles[i].entrance = entrance1;
                    unitTiles[i].isSlotAvailable = false;
                    if(entrance1.type == 0)
                    {
                        
                        let wave1 = {basicZombieCount: WAVE_1_BASIC_SOLDIERS};
                        let wave2 = {basicZombieCount: WAVE_2_BASIC_SOLDIERS};
                        let wave3 = {basicZombieCount: WAVE_3_BASIC_SOLDIERS, fatZombieCount: 0 , runnerZombieCount: 0 };
                        let wave4 = {basicZombieCount: WAVE_4_BASIC_SOLDIERS, fatZombieCount: 0 , runnerZombieCount: 1 };
                        let wave5 = {basicZombieCount: WAVE_5_BASIC_SOLDIERS, fatZombieCount: 0 , runnerZombieCount: 3 };
                        let wave6 = {basicZombieCount: WAVE_6_BASIC_SOLDIERS, fatZombieCount: 0 , runnerZombieCount: 6 };
                        let wave7 = {basicZombieCount: WAVE_7_BASIC_SOLDIERS};
                        let wave8 = {basicZombieCount: WAVE_8_BASIC_SOLDIERS};
                        let wave9 = {basicZombieCount: WAVE_9_BASIC_SOLDIERS};
                        let wave10 = {basicZombieCount: WAVE_10_BASIC_SOLDIERS};
                        let wave11 = {basicZombieCount: WAVE_11_BASIC_SOLDIERS};
                        let wave12 = {basicZombieCount: WAVE_12_BASIC_SOLDIERS};
                        
                        let wave13 = {basicZombieCount: WAVE_13_BASIC_SOLDIERS};
                        let wave14 = {basicZombieCount: WAVE_14_BASIC_SOLDIERS};
                        let wave15 = {basicZombieCount: WAVE_15_BASIC_SOLDIERS};
                        let wave16 = {basicZombieCount: WAVE_16_BASIC_SOLDIERS};
                        let wave17 = {basicZombieCount: WAVE_17_BASIC_SOLDIERS};
                        let wave18 = {basicZombieCount: WAVE_18_BASIC_SOLDIERS};
                        let wave19 = {basicZombieCount: WAVE_19_BASIC_SOLDIERS};
                        let wave20 = {basicZombieCount: WAVE_20_BASIC_SOLDIERS};
                        let wave21 = {basicZombieCount: WAVE_21_BASIC_SOLDIERS};
                        let wave22 = {basicZombieCount: WAVE_22_BASIC_SOLDIERS};
                        
                       

                        entrance1.waves.push( wave1, wave2, wave3, wave4, wave5, wave6, wave7, wave8, wave9, wave10, wave11, wave12, wave13, wave14, wave15, wave16, wave17, wave18, wave19, wave20, wave21, wave22);
                    }
                    entrances.push(unitTiles[i]);
                }
            }
        }
    }
    popExits()
    {
        for(let i = 0; i<unitTiles.length; i++)
        {
            for(let j = 0; j < this.exits; j++)
            {
                if(     (unitTiles[i].status.x == this.width / (this.exits +1))      &&      (unitTiles[i].status.y == 0)     )
                {
                    let exit1 = new exit();
                    exit1.status = unitTiles[i].status;
                    unitTiles[i].exit = exit1;
                    unitTiles[i].isSlotAvailable = false;
                    exits.push(unitTiles[i]);
                }
            }
        }
    } 
    popOuterWalls()
    {
        for(let i = 0; i < unitTiles.length; i++)
        {
           if(unitTiles[i].isSlotAvailable == true)
           {
               if(unitTiles[i].status.y == 0)
               {
                let wall1 = new wall();
                wall1.status = unitTiles[i].status;
                unitTiles[i].wall = wall1;
                unitTiles[i].isSlotAvailable = false;
               }
               if(unitTiles[i].status.y == this.height - TILE_SIZE)
               {
                let wall1 = new wall();
                wall1.status = unitTiles[i].status;
                unitTiles[i].wall = wall1;
                unitTiles[i].isSlotAvailable = false;
               }

               if(unitTiles[i].status.x == 0)
               {
                let wall1 = new wall();
                wall1.status = unitTiles[i].status;
                unitTiles[i].wall = wall1;
                unitTiles[i].isSlotAvailable = false;
               }

               if(unitTiles[i].status.x == this.width - TILE_SIZE)
               {
                let wall1 = new wall();
                wall1.status = unitTiles[i].status;
                unitTiles[i].wall = wall1;
                unitTiles[i].isSlotAvailable = false;
               }
           }
               
            
        }
    }

    popPath(entrance, exit, maxSectionLength, nbrOfTurns)
    {
        let temp;
        let pathTiles = [];
        for(let i = 0; i < unitTiles.length; i++)
        {
            if(     (unitTiles[i].status.x == entrance.status.x)        && (unitTiles.status.y == entrance.status.y - TILE_SIZE))
            {
                let groundTile1 = new groundTile();
                unitTiles[i].groundTile = groundTile1;
                unitTiles[i].groundTile.status = new status(unitTiles[i].status.x, unitTiles[i].status.y);
                unitTiles[i].isSlotAvailable = false;
                temp = unitTiles[i];
                pathTiles.push(unitTiles[i]);
            }

        }
        let z = Math.round(Math.random() * maxSectionLength +1); // donne un nombre entre 1 et maxsection+1
    }
}

class entrance
{
    constructor()
    {
        this.type;
       
        this.status;
        this.image = entrance_png;

        this.zombiesToSpawn = [];
        this.waves = [];
        this.countBtwUnits = 0;

    }

    spawnZombie(zombieType)
    {
        let r = randomInt(0, TILE_SIZE/2);
        let s = randomInt(0,1);
       
        let zombie1 = new zombie();
        zombie1.type = zombieType;
        zombie1.status = new status();
        if(s == 0)
        {
            zombie1.status.x = this.status.x + r;
        }
        else if (s == 1)
        {
            zombie1.status.x = this.status.x - r;
        }
        zombie1.status.y = this.status.y;
        //zombie1.status.x = //this.status.x , this.status.y 
        if(zombie1.type == "basic")
        {
            zombie1.speed = BASIC_ZOMBIE_SPEED;
            zombie1.maxHp = zombie1.setZombieHp();
            zombie1.hp = zombie1.setZombieHp();
            zombie1.costValue = BASIC_ZOMBIE_COSTVALUE;
            zombie1.escapeValue = 1;
        }
        else if(zombie1.type == "fat")
        {
            zombie1.speed = FAT_ZOMBIE_SPEED;
            zombie1.maxHp = zombie1.setZombieHp();
            zombie1.hp = zombie1.setZombieHp();
            zombie1.costValue = FAT_ZOMBIE_COSTVALUE;
            zombie1.escapeValue = 3;
        }
        else if(zombie1.type == "runner")
        {
            zombie1.speed = RUNNER_ZOMBIE_SPEED;
            zombie1.maxHp = zombie1.setZombieHp();
            zombie1.hp = zombie1.setZombieHp();
            zombie1.costValue = RUNNER_ZOMBIE_COSTVALUE;
            zombie1.escapeValue = 1;
        }
        zombie1.modifiedSpeed = zombie1.speed;
        zombies.push(zombie1);
        
    }

    
/*
    spawnWave(waveNbr)
    {
        for(let i = 0; i < this.waves[waveNbr].basicZombieCount; i++)
        {
            setTimeout(this.spawnZombie, i+1 * TIME_BETWEEN_UNITS, "basic");
        }
         for(let i = 0; i < this.waves[waveNbr].length; i++)
        {
            
                for( let j = 0; j < this.[waveNbr].zombieNbr; j++)
                {
                    if(this.countBtwUnits <= 0)
                    {
                        this.spawnZombie(this.waves[waveNbr].zombieType);
                    }
                    
                }
            
        } 
    } */
}

class exit
{
    constructor()
    {
        this.type;
        this.status;
        this.image = exit_png;

    }
}
class upTile
{
    constructor()
    {
        this.type;
        this.status;
        this.image = upTile_png;
        this.towerSlot;
    }
}
class groundTile
{
    constructor()
    {
        this.type;
        this.status;
        this.image = groundTile_png;
        this.isTrapSlotOccupied = false ;
        this.tower;
       // this.distToExit = null;
    }
    
}

class wall
{
    constructor()
    {
        
        this.status;
        this.image = wall_png;
        this.trapSlot;
    }
}
class status{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;

    }
}

class tower
{
    constructor()
    {
        this.id;
        this.type;
        this.lvl = 0;
        this.cost;
        this.unitTile;
        this.range;
        this.dmg;
        this.rateOfFire;
        this.isShooting = false;
        this.shootCount = 0;
        this.isSelected = false;
        this.rotation = 0;
        

    }

    displayTowerStats()
    {
        ctx.fillText("Turret : " + this.type  + " Level: " + this.lvl, this.unitTile.status.x , this.unitTile.status.y - this.range/2);

    }
    rotate(rotation)
    {   

    }
    pointTarget(zombie)
    {
        /* let deltaX = ( this.unitTile.status.x + TILE_SIZE/2 ) - (zombie.status.x);
        let deltaY = ( this.unitTile.status.y + TILE_SIZE/2 ) - (zombie.status.y); */
        
            let angle = Math.atan2((this.unitTile.status.y) - zombie.status.y, (this.unitTile.status.x) - zombie.status.x);
            this.rotation = angle;
            return angle;
        
    }
    displayRange()
    {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.arc(this.unitTile.status.x , this.unitTile.status.y , this.range, 0, 2 * Math.PI);
            ctx.stroke();
    }
    checkCurrentDistToZombie(zombie)
    {
        let currentDistToZombie = Math.hypot((this.unitTile.status.x ) - zombie.status.x, (this.unitTile.status.y ) - zombie.status.y);
        return currentDistToZombie;
    }

    findAllTargetsInRange()
    {
        let targets = [];
        for(let i = 0; i < zombies.length; i++)
        {
            let currentDistToZombie = this.checkCurrentDistToZombie(zombies[i]);
            if( currentDistToZombie <= this.range)
            {
                targets.push(zombies[i]);
            }
        }
        if(targets.length == 0)
        {
            return null;
        }
        else
        {
            return targets;
        }
    }
    findMostAdvancedTargetInRange()
    {
        let mostAdvancedTarget = null;
        for(let i = 0; i < zombies.length; i++)
        {
            let currentDistToZombie = this.checkCurrentDistToZombie(zombies[i]);
            if  (currentDistToZombie <= this.range)
            {
                if(mostAdvancedTarget == null)
                {
                    mostAdvancedTarget = zombies[i];
                }
                else
                {
                    if(zombies[i].checkPosition().distToExit < mostAdvancedTarget.checkPosition().distToExit)
                    {
                        mostAdvancedTarget = zombies[i];
                    }
                }
            }
        }

        if(mostAdvancedTarget == null)
        {
            this.isShooting = false;
            return null;
        }
        else
        {
            return mostAdvancedTarget;
        }
    }
    checkTarget()
    {
        let tempClosestTarget = null;
        for(let i = 0; i < zombies.length; i++)
        {
            let currentDistToZombie = this.checkCurrentDistToZombie(zombies[i]);
            
            if(        currentDistToZombie <= this.range         )
            {
               /*  this.isShooting = true;
                this.shootTarget(zombies[i]); */
                if(tempClosestTarget == null)
                {
                    tempClosestTarget = zombies[i];
                }
                else
                {
                    if(this.checkCurrentDistToZombie(zombies[i]) < this.checkCurrentDistToZombie(tempClosestTarget))
                    {
                        tempClosestTarget = zombies[i];
                    }
                }
                //targetsInRange.push(zombies[i]);
                
            }
            
        }
        if(tempClosestTarget == null)
        {
           this.isShooting = false;
            return null;
        }
        else
        {
            return tempClosestTarget;
        }
    }

    shootTarget(zombie)
    {
        /* if(this.isShooting == false)
        { */
            //this.isShooting = true;
            zombie.hp -= this.dmg;
            if(this.type == "tesla")
            {
                let lightning1= new lightning();
                lightning1.lvl = this.lvl;
                lightning1.status = new status(this.unitTile.status.x, this.unitTile.status.y);
                lightning1.targetZombie = zombie;
                lightning1.rotation = lightning1.pointTarget(zombie);
                
                lightnings.push(lightning1);
            }
        //}
       
    }
    spawnMissile(targetZombie)
    {
        let missile1 = new projectile();
        missile1.targetZombie = targetZombie;
        missile1.status = new status();
        missile1.status.x = this.unitTile.status.x;
        missile1.status.y = this.unitTile.status.y;
        missile1.lvl = this.lvl;

        projectiles.push(missile1);
    }
    launchMissile(targetZombie)
    {
        if(this.findMostAdvancedTargetInRange() != null)
        {
            if(this.shootCount <= 0)
            {
               // this.rotation = this.pointTarget(targetZombie);
                this.spawnMissile(targetZombie);
                this.shootCount = SHOOT_COUNT_BASIS / this.rateOfFire;
                this.isShooting = true;
            }
            else
            {
                this.isShooting = false;
                //this.rotation = this.pointTarget(targetZombie);
            }
        }
        else
        {
            this.isShooting = false;
        }
    }
    attackTarget(zombie)
    {
        if(this.findMostAdvancedTargetInRange() != null)
        {
            if(this.shootCount <= 0)
            {
                this.rotation = this.pointTarget(zombie);
                this.shootTarget(zombie);
                this.shootCount = SHOOT_COUNT_BASIS / this.rateOfFire;
                this.isShooting = true;
            }
            else
            {
                this.isShooting = false;
            }
            
        }
        else
        {
            this.isShooting = false;
        }
    }
    slowTarget(zombie)
    {
        if(this.findMostAdvancedTargetInRange() != null)
        {
          //  if(this.shootCount <= 0)
           // {
                this.rotation = this.pointTarget(zombie);
                let slowed = this.returnSlowedZombies(zombie);
               // this.shootCount = SHOOT_COUNT_BASIS / this.rateOfFire;
                this.isShooting = true;
                for(let i = 0; i < slowed.length; i++)
                {
                    slowed[i].isSlowed = (this.lvl+1);
                }
           // }
           /*  else
            {
                this.isShooting = false;
            } */
            
        }
        else
        {
            this.isShooting = false;
        }
    }

    returnSlowedZombies(targetZombie)
    {
        let slowedZombies = [];
        for(let i = 0; i < zombies.length; i++)
        {
            
            
            if(    (Math.abs(zombies[i].status.x  - targetZombie.status.x) <= SLOW_RADIUS)       &&       (Math.abs(zombies[i].status.y  - targetZombie.status.y) <= SLOW_RADIUS)     )
            {
                //zombies[i].isSlowed = 1 * (this.lvl+1);
                slowedZombies.push(zombies[i]);
            }
            
        }
        if(slowedZombies.length > 0)
        {
            return slowedZombies;
        }
        else
        {
            return null;
        }
        

        
    }
    attackAllTargets(targetsArray)
    {
        this.isShooting = false;
        if(this.shootCount <= 0)
        {
            for(let i = 0; i < targetsArray.length; i++)
            {
                this.shootTarget(targetsArray[i]);
                
            }
            this.shootCount = SHOOT_COUNT_BASIS / this.rateOfFire;
            this.isShooting = true;
        }
        else
        {
            this.isShooting = false;
        }
        
    }
    decreaseShootCount()
    {
        if(this.shootCount > 0)
        {
            this.shootCount --;
        }
    }
}
/* 
class shell
{
    constructor()
    {
        
        this.baseDmg;
        this.baseRange;
        this.rotationSpeed;
        this.rotationAngle;
        this.value;
    }
}

class weapon
{
    constructor()
    {
        this.type;
        this.baseDmg;
        this.baseRange;
        this.baseRateOfFire;
        this.value;
    }
}
 */
class zombie
{
    constructor()
    {
        this.type;
        this.id;
        this.status;

        this.speed;
        this.modifiedSpeed;
        this.hp;
        this.maxHp;
        this.abilities = [];
        this.escapeValue = 1;
        this.costValue;
        this.isSlowed = 0;
        


    }
    
    setZombieHp()
    {
        if(this.type == "basic")
        {
            return Math.pow(2,currentWave / HpDivider)*BASIC_ZOMBIE_HP;
        }
        else if(this.type == "fat")
        {
            return Math.pow(2,currentWave / HpDivider)*FAT_ZOMBIE_HP;
        }
        else if(this.type == "runner")
        {
            return Math.pow(2,currentWave / HpDivider)*RUNNER_ZOMBIE_HP;
        }
	
    }
    checkIfSlowed()
    {
        if(this.isSlowed == 0)
        {
            this.modifiedSpeed = this.speed;
        }
        else if(this.isSlowed == 1)
        {
           this.modifiedSpeed =  6 / 8 * this.speed;
                // (this.isSlowed+1));
        }
        else if(this.isSlowed == 2)
        {
           this.modifiedSpeed = 4 / 8 * this.speed;
                // (this.isSlowed+1));
        }
        else if(this.isSlowed == 3)
        {
           this.modifiedSpeed = 2 / 8 * this.speed;
                // (this.isSlowed+1));
        }

        this.isSlowed = 0;
       
    }
    checkPosition() // returns the tile the zombie is on.
    {
        for(let i = 0; i < unitTiles.length; i++)
        {
            if(    (Math.abs(unitTiles[i].status.x  - this.status.x) <= TILE_SIZE/2)       &&       (Math.abs(unitTiles[i].status.y  - this.status.y) <= TILE_SIZE/2)     )
            {
                return unitTiles[i];
            }
        }
    }
    isReadyToFindNextNode()
    {
        if(    (Math.abs((this.checkPosition().status.x ) - this.status.x) <= DIST_TOLERANCE)       &&       (Math.abs((this.checkPosition().status.y ) - this.status.y)   <= DIST_TOLERANCE  ))
            {
                return true;
            }
            else
            {
                return false;
            }
    }
    findNextNode()
    {
        let node = this.checkPosition();
       /*  if(this.isReadyToFindNextNode() == false)
        {
            return node;
        } */
        
        let neis = node.findTileNeighbors();
        let temp = null;
        if(node.exit != null)
            {
                return node;
            }
        for(let i = 0; i < neis.length; i++)
        {
            if(temp == null)
            {
                temp = neis[i];
            }
            else
            {
                if(neis[i].distToExit < temp.distToExit)
                {
                    temp = neis[i];
                }
            }
        }
        if(temp)
        {
            return temp;
        }
        
            
        
        
    }
    returnZombiesInRange(range)
    {
        let zombiesInRange = [];
        for(let i = 0; i < zombies.length; i++)
        {
            if(    (Math.abs(this.status.x  - zombies[i].status.x) <= range)       &&       (Math.abs(this.status.y  - zombies[i].status.y) <= range)     )
            {
                if(zombies[i] != this)
                {
                    zombiesInRange.push(zombies[i]);
                }
                
            }
        }
        if(zombiesInRange.length >= 0)
        {
            return zombiesInRange;
        }
        else
        {
            return null;
        }
    }
    returnDeltaStatus(targetZombie)
    {
        let deltaX = this.status.x - targetZombie.status.x;
        let deltaY = this.status.y - targetZombie.status.y;
        let deltastatus = {x: deltaX, y: deltaY};
        return deltastatus;
    }
    checkCollisions()
    {
        let collisionZombies = this.returnZombiesInRange(OTHER_ZOMBIE_DETECTION_RANGE);
        if(collisionZombies == null)
        {
            return null;
        }
        else
        {
            this.correctCollisions();
        }
    }

    correctCollisions()
    {
        let collisionZombies = this.returnZombiesInRange(OTHER_ZOMBIE_DETECTION_RANGE);
        for(let i = 0; i < collisionZombies.length; i ++)
            {
               let dist = this.returnDeltaStatus(collisionZombies[i]);
               let r = randomInt(3, 7);
               let dr = randomInt(1,10);
                if(dist.x < 0)
                {
                    for(let i = 0; i < r; i++)
                    {
                        this.moveW();
                        
                    }
                    
                     // la cible est a droite
                }
                else if (dist.x > 0)
                {
                    for(let i = 0; i < r; i++)
                    {
                        this.moveE();
                    }
                     // la cible est a gauche
                }
                else if (dist.x == 0)
                {
                    /* if(dr <= 5)
                    {
                        for(let i = 0; i < r; i++)
                    {
                        this.moveN();
                    }
                    }
                    else
                    {
                        for(let i = 0; i < r; i++)
                        {
                            this.moveS();
                        }
                    } */
                    // la cible est alignée horizontalement
                }
 
 
                if(dist.y < 0)
                {
                    for(let i = 0; i < r; i++)
                    {
                        this.moveN();
                    } // la cible est en bas
                }
                else if (dist.y > 0)
                {
                    for(let i = 0; i < r; i++)
                    {
                        this.moveS();
                    }// la cible est en haut
                }
                else if (dist.y == 0)
                {
                   /*  if(dr <= 5)
                    {
                        for(let i = 0; i < r; i++)
                    {
                        this.moveE();
                    }
                    }
                    else
                    {
                        for(let i = 0; i < r; i++)
                        {
                            this.moveW();
                        } 
                    } */ // la cible est alignée verticalement
                }

                if(dist.x == 0 && dist.y == 0)
                {
                    this.moveE();
                    this.moveE();
                    this.moveE();
                    this.moveE();
                }
               
               
              
              
            }
    }
   /*  isPathFreeOfOtherZombies(direction)
    {
        let zombiesAround = this.returnZombiesInRange(OTHER_ZOMBIE_DETECTION_RANGE);
        if(zombiesAround == null)
        {
            return true;
        }
        else
        {
            for(let i =0; i < zombiesAround.length; i++)
            {
                let pos = zombiesAround[i].status;
                switch(direction)
                {
                    case "N":
                           // if(this.status.x - pos.x )
                    break;
                    case "E":

                    break;
                    case "S":

                    break;
                    case "W":

                    break;
                }
                
                
            }
        }
    } */

    moveToNode(node)
    {
        
        for(let i = 0; i < Math.round(this.modifiedSpeed/6); i++)
        {
            /* let r = randomInt(0,1);
            let randomOffsetX = randomInt(TILE_SIZE/16, TILE_SIZE/4);
            let randomOffsetY = randomInt(TILE_SIZE/16, TILE_SIZE/4);
            let nodeCorrectedStatus;
            if(r == 0)
            {

            }
            else if(r ==1)
            {
                randomOffsetX = randomOffsetX * -1;
                randomOffsetY = randomOffsetY * -1;
            }   

            nodeCorrectedStatus = {x: node.status.x + randomOffsetX, y: node.status.y + randomOffsetY} */
            if(         (this.status.x < node.status.x )      &&           (this.status.y == node.status.y )     )
            {
                this.moveE();
            }
            else if(                (this.status.x < node.status.x )      &&           (this.status.y < node.status.y )            )
            {
                let r = Math.random();
                if(r < 0.5)
                {
                    this.moveE();
                }
                else
                {
                    this.moveS();
                }
            }
            else if(                (this.status.x < node.status.x )      &&           (this.status.y > node.status.y )                    )
            {
                let r = Math.random();
                if(r < 0.5)
                {
                    this.moveE();
                }
                else
                {
                    this.moveN();
                }
            }
            else if(             (this.status.x == node.status.x )      &&           (this.status.y == node.status.y )               )
            {
                //arrived at destination !
            }
            else if(             (this.status.x == node.status.x )      &&           (this.status.y < node.status.y )               )
            {
                this.moveS();
            }
    
            else if(             (this.status.x == node.status.x )      &&           (this.status.y > node.status.y )               )
            {
                this.moveN();
            }
    
            else if(         (this.status.x > node.status.x )      &&           (this.status.y == node.status.y )     )
            {
                this.moveW();
            }
            else if(         (this.status.x > node.status.x )      &&           (this.status.y < node.status.y )     )
            {
                let r = Math.random();
                if(r < 0.5)
                {
                    this.moveW();
                }
                else
                {
                    this.moveS();
                }
            }
    
            else if(         (this.status.x > node.status.x )      &&           (this.status.y > node.status.y )     )
            {
                let r = Math.random();
                if(r < 0.5)
                {
                    this.moveW();
                }
                else
                {
                    this.moveN();
                }
            }
        }
        

    }

    moveN()
    {
        this.status.y -= MOVE_SPEED;
    }

    moveS()
    {
        this.status.y += MOVE_SPEED;
    }

    moveW()
    {
        this.status.x -= MOVE_SPEED;
    }

    moveE()
    {
        this.status.x += MOVE_SPEED;
    }
}
class lightning
{
    constructor()
    {
        this.lvl;
        this.status;
        this.targetZombie;
        this.rotation;
        this.count = LIGHTNING_COUNT;
        //this.img;
    }

    pointTarget()
    {
        let angle = Math.atan2((this.status.y ) - (this.targetZombie.status.y ), (this.status.x ) - (this.targetZombie.status.x ));
            this.rotation = angle;
            return angle;
    }
    decreaseCount()
    {
        this.count--;
    }
    
    
}


class projectile
{
    constructor()
    {
        this.lvl;
        this.status;
        this.targetZombie;
        this.rotation;
    }
    pointTarget()
    {
        let angle = Math.atan2((this.status.y ) - (this.targetZombie.status.y ), (this.status.x ) - (this.targetZombie.status.x ));
            this.rotation = angle;
            return angle;
    }
    
    isReadyToExplode()
    {
        if(     Math.abs(       (this.status.x ) -  (this.targetZombie.status.x)      )     <       EXPLOSION_TOLERANCE    && (Math.abs(       (this.status.y ) -  (this.targetZombie.status.y )      )) < EXPLOSION_TOLERANCE )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    explode()
    {
        for(let i = 0; i < zombies.length; i ++)
        {
            if( (  Math.abs((zombies[i].status.x ) -  (this.status.x )) < MISSILE_EXPLOSION_RADIUS )   &&         ((Math.abs((zombies[i].status.y ) -  (this.status.y ))) < MISSILE_EXPLOSION_RADIUS   )  )
            {
                zombies[i].hp -= (this.lvl+1) * MISSILE_DAMAGE;
            }
        }
    }
    moveToTarget()
    {
        for(let i =0; i < MISSILE_SPEED; i++)
        {
            if(         (this.status.x  < this.targetZombie.status.x  )      &&           (this.status.y  == this.targetZombie.status.y )     )
            {
                this.moveE();
            }
            else if(                (this.status.x < this.targetZombie.status.x )      &&           (this.status.y  < this.targetZombie.status.y )            )
            {
                let r = Math.random();
                if(r < 0.5)
                {
                    this.moveE();
                }
                else
                {
                    this.moveS();
                }
            }
            else if(                (this.status.x < this.targetZombie.status.x  )      &&           (this.status.y > this.targetZombie.status.y )                    )
            {
                let r = Math.random();
                if(r < 0.5)
                {
                    this.moveE();
                }
                else
                {
                    this.moveN();
                }
            }
            else if(             (this.status.x == this.targetZombie.status.x  )      &&           (this.status.y  == this.targetZombie.status.y  )               )
            {
              // this.explode(); //arrived at destination !
            }
            else if(             (this.status.x  == this.targetZombie.status.x  )      &&           (this.status.y  < this.targetZombie.status.y  )               )
            {
                this.moveS();
            }
    
            else if(             (this.status.x  == this.targetZombie.status.x )      &&           (this.status.y > this.targetZombie.status.y )               )
            {
                this.moveN();
            }
    
            else if(         (this.status.x > this.targetZombie.status.x  )      &&           (this.status.y  == this.targetZombie.status.y  )     )
            {
                this.moveW();
            }
            else if(         (this.status.x > this.targetZombie.status.x  )      &&           (this.status.y < this.targetZombie.status.y  )     )
            {
                let r = Math.random();
                if(r < 0.5)
                {
                    this.moveW();
                }
                else
                {
                    this.moveS();
                }
            }
    
            else if(         (this.status.x > this.targetZombie.status.x )      &&           (this.status.y > this.targetZombie.status.y )     )
            {
                let r = Math.random();
                if(r < 0.5)
                {
                    this.moveW();
                }
                else
                {
                    this.moveN();
                }
            }
        }
    
        

    }

    moveN()
    {
        this.status.y -= MOVE_SPEED;
    }

    moveS()
    {
        this.status.y += MOVE_SPEED;
    }

    moveW()
    {
        this.status.x -= MOVE_SPEED;
    }

    moveE()
    {
        this.status.x +=  MOVE_SPEED;
    }
    
}
class wave
{
    constructor(waveNbr, enemiesToSpawnArray)
    {
        this.waveNumber = waveNbr;
        this.status = 0; // 0 pour en attente 1 pour en cours 2 pour terminé
        this.enemies = enemiesToSpawnArray; // contient des objets : {"enemyType", nbr, interval}

    }
}




function createMap()
{
    


    currentMap = new map();
    currentMap.width = 1280;
    currentMap.height = 1280;
    currentMap.entrances = 1;
    currentMap.exits = 1;

    currentMap.nbrOfPaths = 1;
    currentMap.depthOfPaths = 3;
    currentMap.turnsOfPaths = 6;

    currentMap.amountOfBuildableUptiles = 70; // %
}


function loadImages()
{
    
entrance_png = new Image();
entrance_png.src = "images/entrance.png";

exit_png = new Image();
exit_png.src = "images/exit.png";

groundTile_png = new Image();
groundTile_png.src = "images/groundTile.png";

grass_1_png = new Image();
grass_1_png.src = "images/grass/grass_1.png";
grass_2_png = new Image();
grass_2_png.src = "images/grass/grass_1.png";
grass_3_png = new Image();
grass_3_png.src = "images/grass/grass_1.png";


upTile_png = new Image();
upTile_png.src = "images/upTile.png";

wall_png = new Image();
wall_png.src = "images/wall.png";

path_png = new Image();
path_png.src = "images/path.png"

tower_machinegun_0_png = new Image();
tower_machinegun_0_png.src = "images/tower_machinegun_0.png";

basic_zombie_png = new Image();
basic_zombie_png.src = "images/basic_zombie.png";

fat_zombie_png = new Image();
fat_zombie_png.src = "images/fat_zombie.png";
runner_zombie_png = new Image();
runner_zombie_png.src = "images/runner_zombie.png"

tower_machinegun_0_firing_png = new Image();
tower_machinegun_0_firing_png.src = "images/tower_machinegun_0_firing.png";

tower_machinegun_green_png = new Image();
tower_machinegun_green_png.src = "images/towers/basic/tower_machinegun_0_green.png";
tower_machinegun_blue_png = new Image();
tower_machinegun_blue_png.src = "images/towers/basic/tower_machinegun_0_blue.png";
tower_machinegun_red_png = new Image();
tower_machinegun_red_png.src = "images/towers/basic/tower_machinegun_0_red.png";
tower_machinegun_firing_green_png = new Image();
tower_machinegun_firing_green_png.src = "images/towers/basic/tower_machinegun_0_firing_green.png";
tower_machinegun_firing_blue_png = new Image();
tower_machinegun_firing_blue_png.src = "images/towers/basic/tower_machinegun_0_firing_blue.png";
tower_machinegun_firing_red_png = new Image();
tower_machinegun_firing_red_png.src = "images/towers/basic/tower_machinegun_0_firing_red.png";

tower_diamond_green_png = new Image();
tower_diamond_green_png.src = "images/towers/diamond/diamond_green.png";
tower_diamond_blue_png = new Image();
tower_diamond_blue_png.src = "images/towers/diamond/diamond_blue.png";
tower_diamond_red_png = new Image();
tower_diamond_red_png.src = "images/towers/diamond/diamond_red.png";

explosion_1_png = new Image();
explosion_1_png.src = "images/effects/explosion_1.png";

tower_missile_laucher_green_png = new Image();
tower_missile_laucher_green_png.src = "images/towers/missileLauncher/missile_launcher_green.png";
tower_missile_laucher_blue_png = new Image();
tower_missile_laucher_blue_png.src = "images/towers/missileLauncher/missile_launcher_blue.png";
tower_missile_laucher_red_png = new Image();
tower_missile_laucher_red_png.src = "images/towers/missileLauncher/missile_launcher_red.png";
missile_green_png = new Image();
missile_green_png.src = "images/towers/missileLauncher/missile_green.png";
missile_blue_png = new Image();
missile_blue_png.src = "images/towers/missileLauncher/missile_blue.png";
missile_red_png = new Image();
missile_red_png.src = "images/towers/missileLauncher/missile_red.png";

tower_slow_green_png = new Image();
tower_slow_green_png.src = "images/towers/slow/slow_green.png";
tower_slow_blue_png = new Image();
tower_slow_blue_png.src = "images/towers/slow/slow_blue.png";
tower_slow_red_png = new Image();
tower_slow_red_png.src = "images/towers/slow/slow_red.png";

tower_tesla_green_png = new Image();
tower_tesla_green_png.src = "images/towers/tesla/tesla_green.png";
tower_tesla_blue_png = new Image();
tower_tesla_blue_png.src = "images/towers/tesla/tesla_blue.png";
tower_tesla_red_png = new Image();
tower_tesla_red_png.src = "images/towers/tesla/tesla_red.png";


lightning_1_png = new Image();
lightning_1_png.src = "images/effects/lightning_1.png";
lightning_2_png = new Image();
lightning_2_png.src = "images/effects/lightning_2.png";
lightning_3_png = new Image();
lightning_3_png.src = "images/effects/lightning_3.png";


}
function addWallListeners(evt){
    for(let i = 0; i< unitTiles.length; i++)
    {
        if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
        {
            unitTiles[i].createWall();
        } // Math.abs(unitTiles[i].status.x - evt.clientX)) < TILE_SIZE     
    }
    wallButton.textContent = "Stop wall";
    wallButton.onclick = function(){
        canvas.removeEventListener("click", addWallListeners);
        wallButton.textContent = "Wall";
        wallButton.onclick = function(){
            canvas.addEventListener("click", addWallListeners);
            
        }
};
}

function addGroundTilesListeners(evt){
    for(let i = 0; i< unitTiles.length; i++)
    {
        if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
        {
            unitTiles[i].createGroundTile();
        } // Math.abs(unitTiles[i].status.x - evt.clientX)) < TILE_SIZE     
    }
    groundTileButton.textContent = "Stop GroundTile";
    groundTileButton.onclick = function(){
        canvas.removeEventListener("click", addGroundTilesListeners);
        groundTileButton.textContent = "GroundTile";
        groundTileButton.onclick = function(){
            canvas.addEventListener("click", addGroundTilesListeners);
            
        }
};
}

function addClearTileListeners(evt){
    for(let i = 0; i< unitTiles.length; i++)
    {
        if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
        {
            unitTiles[i].clearTile();
        } // Math.abs(unitTiles[i].status.x - evt.clientX)) < TILE_SIZE     
    }
    clearTileButton.textContent = "Stop Clear Tile";
    clearTileButton.onclick = function(){
        canvas.removeEventListener("click", addClearTileListeners);
        clearTileButton.textContent = "Clear Tile";
        clearTileButton.onclick = function(){
            canvas.addEventListener("click", addClearTileListeners);
        }
};
}

function getMousePos(canvas, evt)
{
    let rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

/* function calcGroundTilesDistToExit()
{
    let exits = [];
    for(let i = 0; i < unitTiles.length; i++)
    {
        if(unitTiles[i].exit != null)
        {
            let exit = unitTiles[i];
            exits.push(exit);
        }
    }

    if(exits.length != 0)
    {
        for(let j = 0; j < exits.length; j++)
        {
            exits[j].distToExit = 0;
            for(let k = 0; k < unitTiles.length; k++)
            {
                
                if(unitTiles[k].groundTile != null)
                {

                
                    if(     (unitTiles[k].status.x - exits[j].status.x == 0) && (unitTiles[k].status.y - exits[j].status.y == TILE_SIZE) )
                    {
                        exits[j].S_neighbour = unitTiles[k];
                        unitTiles[k].N_neighbour = exit[j];
                        unitTiles[k].distToExit = 1;
                        
                    }

                }

                // (Math.abs((unitTiles[i].status.x + TILE_SIZE/2) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2
            }
        }
    }
} */


function findGroundTilesDistToExit(exitTile)
{
    let Q = [];
    for(let l = 0; l < unitTiles.length; l++)
    {
        unitTiles[l].distToExit = null;
    }
    //Q.push(exitTile);
   // exitTile.distToExit = 0;
    exitTile.distToExit = 0;
    Q.push(exitTile);

    while(Q.length > 0)
    {
        let node = Q[0];
        Q.shift();
        /* let i = node.status.x;
        let j = node.status.y; */
        let dist = node.distToExit;
        /* if(node == Tile)
        {
            return true;
        } */
        let neis = node.findTileNeighbors();
        for(let k = 0; k < neis.length; k++)
        {
            if(     (!neis[k].groundTile)      ||     (neis[k].groundTile.isTrapSlotOccupied == false)       )
            {
                if(       (neis[k].distToExit == null)  || (neis[k].distToExit == undefined)    )
                {
                neis[k].distToExit = dist +1;
                Q.push(neis[k]);
                }
            }
            
            
        }
    }
    //let nei = exitTile.findTileNeighbors();
    /* for(let i =0; i < nei.length; i++)
    {
        if(nei[i].distToExit == null)
        {
            nei[i].distToExit = 1;
            Q.push(nei[i]);
        }
        if(nei[i] == Tile)
        {
            return Q.length;
        }
        
    }
    
    for(let j = 0; j < Q.length; j++)
    {
        let nep = Q[j].findTileNeighbors();
        for(let k = 0; k < nep.length; k++)
        {   
            if(nep[k].distToExit == null)
            {
                
            nep[k].distToExit = j+2;
            Q.push(nep[k]);
            }
            if(nep[k] == Tile)
            {
                console.log("Calc done!" + Q.length);
                return Q.length;
                
            }
        }
    } */

    
}
function init()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    loadImages();
    createMap();
    currentMap.generateUnitTiles();
    
    currentMap.popEntrances(0);
    currentMap.popExits();
    currentMap.popOuterWalls();
    currentState = "editing";
    hpDisplay = document.getElementById("hp");
    moneyDisplay = document.getElementById("money");
    timeDisplay = document.getElementById("time");
    wavesConfig = createWavesConfig();
    upgradeButton = document.getElementById("upgradeButton");
    sellButton = document.getElementById("sellButton");
    actualWaveDisplay = document.getElementById("actualWave");
    gameSpeedButton = document.getElementById("gameSpeed");

    machinegunButton = document.getElementById("machinegunButton");
    diamondButton = document.getElementById("diamondButton");
    missileLauncherButton = document.getElementById("missileLauncherButton");
    slowButton = document.getElementById("slowButton");
    teslaButton = document.getElementById("teslaButton");

    machinegunButton.textContent = "Machinegun: " + MACHINEGUN_COST;
    diamondButton.textContent = "Diamond: " + DIAMOND_COST;
    missileLauncherButton.textContent = "Missile Laucher: " + MISSILE_LAUNCHER_COST;
    slowButton.textContent = "Slow: " + SLOW_COST;
    teslaButton.textContent = "Tesla: " + TESLA_COST;

    setTimeout("gameCycle()", SYS_DELAY);
}

function gameCycle()
{   
    if(currentState == "editing")
    {

    
    doDrawing();
   
    setTimeout("gameCycle()", SYS_DELAY);
    }
    else if(currentState == "playing")
    {
        gameSpeedButton.textContent = "Speed: " + gameSpeed;
        /* if(gameSpeed == 0)
        {
            doDrawing();
        } */
        for(let i =0; i < gameSpeed; i++)
        {

        
        
        moveZombies();
       // doDrawing();
        checkEvasions();
        
        towersAttack();
        calcAllModifiedSpeeds();
        moveProjectiles();
        checkMissilesExplosions();
        checkZombiesHp();
        queueWaves(wavesConfig);
        goToNextWave();
        spawnQueue();
        spawnQueueAlt();
        decreaseLightningsCount();
        

        }
        findGroundTilesDistToExit(exits[0]);
        updateHud();
        checkZombiesCollisions();
        doDrawing();
        setTimeout("gameCycle()", SYS_DELAY);   
    }
}
function doDrawing()
{
    ctx.clearRect(0,0, currentMap.width, currentMap.height);
    for(let i = 0; i < unitTiles.length; i++)
    {
        if(unitTiles[i].entrance != null)
        {
            drawImageCenter(entrance_png, unitTiles[i].status.x, unitTiles[i].status.y , TILE_SIZE/2, TILE_SIZE/2, 1, 0);
        }
        else if (unitTiles[i].exit != null)
        {
            drawImageCenter(exit_png, unitTiles[i].status.x , unitTiles[i].status.y ,TILE_SIZE/2,TILE_SIZE/2, 1, 0);
        }
        else if (unitTiles[i].wall != null)
        {
            drawImageCenter(wall_png, unitTiles[i].status.x , unitTiles[i].status.y ,TILE_SIZE/2, TILE_SIZE/2, 1, 0);
        }
        else if(unitTiles[i].groundTile != null)
        {
            drawImageCenter(grass_1_png, unitTiles[i].status.x , unitTiles[i].status.y ,TILE_SIZE/2, TILE_SIZE/2, 1, 0);
            //ctx.drawImage(groundTile_png, unitTiles[i].status.x, unitTiles[i].status.y);
           // ctx.fillText(unitTiles[i].distToExit, unitTiles[i].status.x , unitTiles[i].status.y , TILE_SIZE, TILE_SIZE);
        }
    }
    if(currentState == "playing")
    {
        let pathArray = returnPathArray();
        if(pathArray)
        {
            for(let m = 0; m < pathArray.length; m++)
            {
                drawImageCenter(path_png, pathArray[m].status.x, pathArray[m].status.y , TILE_SIZE/2, TILE_SIZE/2, 1/4, 0);
            }
        }
        else
        {
            console.error("erreur plus de chemin!");
            
            let last = towers.length-1;
           //unitTiles. (towers[last].unitTile)
           
           towers[last].unitTile.groundTile.isTrapSlotOccupied = false;
           player1.money += towers[last].cost;
            towers.splice(last, 1);

            
            
            findGroundTilesDistToExit(exits[0]);

            let pathArray2 = returnPathArray();
        if(pathArray2)
        {
            for(let m = 0; m < pathArray2.length; m++)
            {
                drawImageCenter(path_png, pathArray2[m].status.x, pathArray2[m].status.y , TILE_SIZE/2, TILE_SIZE/2, 1/2, 0);
            }
        }

            
        }
    }
    
   /*  if(upgradeButton)
        {
            upgradeButton.style.display = "none";
        } */

    

    for(let j = 0; j < towers.length; j++)
    {
        
        
        
        if(towers[j].type == "machinegun")
        {
           // ctx.drawImage(tower_machinegun_0_png, towers[j].unitTile.status.x, towers[j].unitTile.status.y );
           if(towers[j].lvl == 0)
           {
                if(towers[j].isShooting)
                {
                drawImageCenter(tower_machinegun_firing_green_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, towers[j].rotation);
                }
                else
                {
                drawImageCenter(tower_machinegun_green_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, towers[j].rotation);
                }
           }
           else if(towers[j].lvl == 1)
           {
                if(towers[j].isShooting)
                {
                drawImageCenter(tower_machinegun_firing_blue_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, towers[j].rotation);
                }
                else
                {
                drawImageCenter(tower_machinegun_blue_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, towers[j].rotation);
                }
           }
           else if(towers[j].lvl == 2)
           {
                if(towers[j].isShooting)
                {
                drawImageCenter(tower_machinegun_firing_red_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, towers[j].rotation);
                }
                else
                {
                drawImageCenter(tower_machinegun_red_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, towers[j].rotation);
                }
           }
           
        }

        else if(towers[j].type == "diamond")
        {
           // ctx.drawImage(tower_machinegun_0_png, towers[j].unitTile.status.x, towers[j].unitTile.status.y );
           if(towers[j].lvl == 0)
           {
                
                drawImageCenter(tower_diamond_green_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, 0);
                
           }
           else if(towers[j].lvl == 1)
           {
            drawImageCenter(tower_diamond_blue_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, 0);
           }
           else if(towers[j].lvl == 2)
           {
            drawImageCenter(tower_diamond_red_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 2, 0);
           }
           if(towers[j].isShooting)
           {
               drawImageCenterRes(explosion_1_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , towers[j].range /2, towers[j].range /2, 2, 0, towers[j].range, towers[j].range);
           }
           
        }

        else if(towers[j].type == "missileLauncher")
        {
           // ctx.drawImage(tower_machinegun_0_png, towers[j].unitTile.status.x, towers[j].unitTile.status.y );
           if(towers[j].lvl == 0)
           {
                
                drawImageCenter(tower_missile_laucher_green_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, towers[j].rotation);
                
           }
           else if(towers[j].lvl == 1)
           {
            drawImageCenter(tower_missile_laucher_blue_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, towers[j].rotation);
           }
           else if(towers[j].lvl == 2)
           {
            drawImageCenter(tower_missile_laucher_red_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, towers[j].rotation);
           }
           if(towers[j].isShooting)
           {
               //drawImageCenterRes(explosion_2_png, towers[j].unitTile.status.x + TILE_SIZE /2, towers[j].unitTile.status.y + TILE_SIZE /2, towers[j].range /2, towers[j].range /2, 2, 0, towers[j].range, towers[j].range);
           }
           
        }
        else if(towers[j].type == "slow")
        {
           // ctx.drawImage(tower_machinegun_0_png, towers[j].unitTile.status.x, towers[j].unitTile.status.y );
           if(towers[j].lvl == 0)
           {
                
                drawImageCenter(tower_slow_green_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, towers[j].rotation);
                
           }
           else if(towers[j].lvl == 1)
           {
            drawImageCenter(tower_slow_blue_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, towers[j].rotation);
           }
           else if(towers[j].lvl == 2)
           {
            drawImageCenter(tower_slow_red_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, towers[j].rotation);
           }
           if(towers[j].isShooting)
           {
               //drawImageCenterRes(explosion_2_png, towers[j].unitTile.status.x + TILE_SIZE /2, towers[j].unitTile.status.y + TILE_SIZE /2, towers[j].range /2, towers[j].range /2, 2, 0, towers[j].range, towers[j].range);
           }
           
        }
        else if(towers[j].type == "tesla")
        {
           // ctx.drawImage(tower_machinegun_0_png, towers[j].unitTile.status.x, towers[j].unitTile.status.y );
           if(towers[j].lvl == 0)
           {
                
                drawImageCenter(tower_tesla_green_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, 0);
                
           }
           else if(towers[j].lvl == 1)
           {
            drawImageCenter(tower_tesla_blue_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, 0);
           }
           else if(towers[j].lvl == 2)
           {
            drawImageCenter(tower_tesla_red_png, towers[j].unitTile.status.x , towers[j].unitTile.status.y , TILE_SIZE /2, TILE_SIZE /2, 1, 0);
           }
           if(towers[j].isShooting)
           {
               
            console.log("tesla shoot"); //drawImageCenterRes(explosion_2_png, towers[j].unitTile.status.x + TILE_SIZE /2, towers[j].unitTile.status.y + TILE_SIZE /2, towers[j].range /2, towers[j].range /2, 2, 0, towers[j].range, towers[j].range);
           }
           
        }


        if(towers[j].isSelected == true)
        {
            if(towers[j].range)
            {
                towers[j].displayRange();
                towers[j].displayTowerStats();
            }
            
        }
        
       
        
    }


    checkButtonsToDisplay();


    for(let k = 0; k < zombies.length; k++)
    {
        if(zombies[k].hp < zombies[k].maxHp)
        {
            ctx.fillText(Math.round(zombies[k].hp/zombies[k].maxHp * 100) + " %", zombies[k].status.x, zombies[k].status.y - TILE_SIZE/2);
        }
        if(zombies[k].type == "basic")
        {
           // ctx.drawImage(basic_zombie_png, zombies[k].status.x, zombies[k].status.y, TILE_SIZE/4, TILE_SIZE/2);
           drawImageCenterRes(basic_zombie_png, zombies[k].status.x , zombies[k].status.y , ZOMBIE_OFFSET_X, ZOMBIE_OFFSET_Y , 1, 0, TILE_SIZE/4, TILE_SIZE/2);
        }
        else if(zombies[k].type == "fat")
        {
            drawImageCenterRes(fat_zombie_png, zombies[k].status.x , zombies[k].status.y , ZOMBIE_OFFSET_X , ZOMBIE_OFFSET_Y  , 2, 0, TILE_SIZE/4, TILE_SIZE/2);
        }
        else if(zombies[k].type == "runner")
        {
            drawImageCenterRes(runner_zombie_png, zombies[k].status.x , zombies[k].status.y , ZOMBIE_OFFSET_X, ZOMBIE_OFFSET_Y , 1, 0, TILE_SIZE/4, TILE_SIZE/2);
        }
        
    }
    for(let l = 0; l < projectiles.length; l ++)
    {
        if(projectiles[l].lvl == 0)
        {
            drawImageCenter(missile_green_png, projectiles[l].status.x ,  projectiles[l].status.y , MISSILE_OFFSET_X, MISSILE_OFFSET_Y , 0.5,  projectiles[l].pointTarget());
        }
        else if(projectiles[l].lvl == 1)
        {
            drawImageCenter(missile_blue_png, projectiles[l].status.x ,  projectiles[l].status.y , MISSILE_OFFSET_X, MISSILE_OFFSET_Y , 0.5,  projectiles[l].pointTarget());
        }
        else if(projectiles[l].lvl == 2)
        {
            drawImageCenter(missile_red_png, projectiles[l].status.x ,  projectiles[l].status.y , MISSILE_OFFSET_X, MISSILE_OFFSET_Y , 0.5,  projectiles[l].pointTarget());
        }
    }

    displayLightnings();
    
    
    


}



function toggle_div(id) {
    //on récupère ta div à "toggler"
let div = document.getElementById(id),
    //on récupère son état à l'instant initial
    //la création d'un nouveau String est nécessaire car son état va être modifié dans la boucle
    previousState = new String(div.style.display),
    //on récupère la liste de tous les éléments soumis à affichage conditionnel
    showElements = document.getElementsByClassName("menuButton");

//pour chacun des élements, on le cache (plutot que de vérifier si l'element était deja affiché)
for(let i = 0; i < showElements.length; i++) {
    showElements[i].style.display = "none";
}

//Si le block n'était précement pas affiché, alors on l'affiche
//Si avant le clic il etait affiché, alors il reste caché (comportement toggle conservé)
if(previousState=="none") {
    div.style.display = "block";
}
}

function toggleBuildTowerMenu()
{
    canvas.removeEventListener("click", popTowerBasic);
    canvas.removeEventListener("click", popTowerDiamond);
    canvas.removeEventListener("click", popTowerMissileLauncher);
    canvas.removeEventListener("click", popTowerSlow);
    canvas.removeEventListener("click", popTowerTesla);
    canvas.addEventListener("click", selectTower);
    let buttonsToToggle = document.getElementsByClassName("buildTowerMenuButton");
    for(let i = 0; i < buttonsToToggle.length; i++)
    {
        if(buttonsToToggle[i].style.display == "none")
        {
            buttonsToToggle[i].style.display = "block";
        }
        else
        {
            buttonsToToggle[i].style.display = "none";
        }
    }
}
function selectTower(evt)
{
    for(let i = 0; i< unitTiles.length; i++)
    {
        if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
        {
            if(unitTiles[i].groundTile.isTrapSlotOccupied != null)
            {
               if(unitTiles[i].groundTile.isTrapSlotOccupied == true)
               {
                   if(unitTiles[i].groundTile.tower.isSelected == false)
                   {
                    unitTiles[i].groundTile.tower.isSelected = true;
                   }
                   else if(unitTiles[i].groundTile.tower.isSelected == true)
                   {
                    unitTiles[i].groundTile.tower.isSelected = false;
                   }
                    
               }
            }
            
        } // Math.abs(unitTiles[i].status.x - evt.clientX)) < TILE_SIZE     
    }
}
function placeTower(type)
{
    
    switch (type)
    {
        case "machinegun": 
        canvas.removeEventListener("click", popTowerDiamond);
            canvas.removeEventListener("click", popTowerMissileLauncher);
            canvas.removeEventListener("click", popTowerSlow);
            canvas.removeEventListener("click", popTowerTesla);
        if(player1.money >= MACHINEGUN_COST)
        {
            canvas.addEventListener("click", popTowerBasic);

            
            
            
        }
        break;
        case "diamond":
                canvas.removeEventListener("click", popTowerBasic);
                canvas.removeEventListener("click", popTowerMissileLauncher);
                canvas.removeEventListener("click", popTowerSlow);
                canvas.removeEventListener("click", popTowerTesla);
        if(player1.money >= DIAMOND_COST)
        {
            canvas.addEventListener("click", popTowerDiamond);

            
            
        }
        break;
        case "missileLauncher":
                canvas.removeEventListener("click", popTowerDiamond);
                canvas.removeEventListener("click", popTowerBasic);
                canvas.removeEventListener("click", popTowerSlow);
                canvas.removeEventListener("click", popTowerTesla);
            if(player1.money >= MISSILE_LAUNCHER_COST)
            {
                canvas.addEventListener("click", popTowerMissileLauncher);

                
            
            }
            break;

        case "slow":
                canvas.removeEventListener("click", popTowerDiamond);
                canvas.removeEventListener("click", popTowerBasic);
                canvas.removeEventListener("click", popTowerMissileLauncher);
                canvas.removeEventListener("click", popTowerTesla);

                if(player1.money >= SLOW_COST)
                {
                    canvas.addEventListener("click", popTowerSlow);
    
                    
                
                }
                break;

            case "tesla":
                        canvas.removeEventListener("click", popTowerDiamond);
                        canvas.removeEventListener("click", popTowerBasic);
                        canvas.removeEventListener("click", popTowerMissileLauncher);
                        canvas.removeEventListener("click", popTowerSlow);
        
                        if(player1.money >= TESLA_COST)
                        {
                            canvas.addEventListener("click", popTowerTesla);
            
                            
                        
                        }
                        break;
    
    }
}

function popTowerBasic(evt)
{
    for(let i = 0; i< unitTiles.length; i++)
    
    {
        
        if(unitTiles[i].groundTile)
        {
            if(unitTiles[i].groundTile.isTrapSlotOccupied == false)
            {
                if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
                {
                    if(player1.money >= MACHINEGUN_COST)
                    {
                     

                        
                            console.log("created machinegun at" + unitTiles[i].status.x + " / " + unitTiles[i].status.y);
                            unitTiles[i].createTower("machinegun");
                            player1.money -= MACHINEGUN_COST;
                          
                       
                    }
                    
                }
            }
        }
            
    }
}

function popTowerDiamond(evt)
{
    for(let i = 0; i< unitTiles.length; i++)
    {
        if(unitTiles[i].groundTile)
        {
            if(unitTiles[i].groundTile.isTrapSlotOccupied == false)
            {
                if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
                {
                    if(player1.money >= DIAMOND_COST)
                    {
                        
                        console.log("created diamond at" + unitTiles[i].status.x + " / " + unitTiles[i].status.y);
                        unitTiles[i].createTower("diamond");
                        player1.money -= DIAMOND_COST;
                        
                    }
                    
                } // Math.abs(unitTiles[i].status.x - evt.clientX)) < TILE_SIZE 
            }
        }
            
    }
}

function popTowerMissileLauncher(evt)
{
    for(let i = 0; i< unitTiles.length; i++)
    {
        if(unitTiles[i].groundTile)
        {
            if(unitTiles[i].groundTile.isTrapSlotOccupied == false)
            {
                if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
                {
                    if(player1.money >= MISSILE_LAUNCHER_COST)
                    {
                        
                        console.log("created missile launcher at" + unitTiles[i].status.x + " / " + unitTiles[i].status.y);
                        unitTiles[i].createTower("missileLauncher");
                        player1.money -= MISSILE_LAUNCHER_COST;
                        
                    }
                    
                } // Math.abs(unitTiles[i].status.x - evt.clientX)) < TILE_SIZE 
            }
        }
            
    }
}

function popTowerSlow(evt)
{
    for(let i = 0; i< unitTiles.length; i++)
    
    {
        
        if(unitTiles[i].groundTile)
        {
            if(unitTiles[i].groundTile.isTrapSlotOccupied == false)
            {
                if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
                {
                    if(player1.money >= SLOW_COST)
                    {
                     

                        
                            console.log("created slow at" + unitTiles[i].status.x + " / " + unitTiles[i].status.y);
                            unitTiles[i].createTower("slow");
                            player1.money -= SLOW_COST;
                          
                       
                    }
                    
                }
            }
        }
            
    }
}



function popTowerTesla(evt)
{
    for(let i = 0; i< unitTiles.length; i++)
    
    {
        
        if(unitTiles[i].groundTile)
        {
            if(unitTiles[i].groundTile.isTrapSlotOccupied == false)
            {
                if(   (Math.abs((unitTiles[i].status.x ) -  getMousePos(canvas, evt).x)) < TILE_SIZE/2    &&         (Math.abs((unitTiles[i].status.y ) - getMousePos(canvas, evt).y)) < TILE_SIZE/2     )
                {
                    if(player1.money >= TESLA_COST)
                    {
                     

                        
                            console.log("created tesla at" + unitTiles[i].status.x + " / " + unitTiles[i].status.y);
                            unitTiles[i].createTower("tesla");
                            player1.money -= TESLA_COST;
                          
                       
                    }
                    
                }
            }
        }
            
    }
}



function moveZombies()
{
    for(let i =0; i < zombies.length; i++)
    {
        zombies[i].moveToNode(zombies[i].findNextNode());
    }
}

function checkEvasions()
{
    for(let i = 0; i < exits.length; i++)
    {
        for(let j = zombies.length -1; j >= 0; j--)
        {
            if(zombies[j].checkPosition() == exits[i])
            {
                
                player1.hp -= zombies[j].escapeValue;
                zombies.splice(j,1);
            }
        }
    }
}

function updateHud()
{
    hpDisplay.textContent = player1.hp;
    moneyDisplay.textContent = "$ :" + player1.money;
    timeDisplay.textContent = gameTime;
    actualWaveDisplay.textContent = currentWave;
}

function towersAttack()
{
    for (let i = 0; i < towers.length; i++)
    {
        if(towers[i].type == "machinegun")
        {
            if(towers[i].findMostAdvancedTargetInRange() != null)
            {
                towers[i].attackTarget(towers[i].findMostAdvancedTargetInRange());
            }
            towers[i].decreaseShootCount();
        }
        else if(towers[i].type == "diamond")
        {
            if(towers[i].findAllTargetsInRange() != null)
            {
                towers[i].attackAllTargets(towers[i].findAllTargetsInRange());
                towers[i].isShooting = true;
            }
            else
            {
                towers[i].isShooting = false;
            }
            towers[i].decreaseShootCount();
        }
        else if(towers[i].type == "missileLauncher")
        {
            if(towers[i].findMostAdvancedTargetInRange() != null)
            {
                towers[i].launchMissile(towers[i].findMostAdvancedTargetInRange());
            }
            
            else
            {
                towers[i].isShooting = false;
            }
            towers[i].decreaseShootCount();
        }
        else  if(towers[i].type == "slow")
        {
            if(towers[i].findMostAdvancedTargetInRange() != null)
            {
                towers[i].slowTarget(towers[i].findMostAdvancedTargetInRange());
            }
            //towers[i].decreaseShootCount();
        }

        if(towers[i].type == "tesla")
        {
            if(towers[i].findMostAdvancedTargetInRange() != null)
            {
                towers[i].attackTarget(towers[i].findMostAdvancedTargetInRange());
            }
            towers[i].decreaseShootCount();
        }
        
        
    }
}

function checkZombiesHp()
{
    for (let i = zombies.length -1; i >=0; i--)
    {
        if(zombies[i].hp <= 0)
        {
            player1.money += zombies[i].costValue;
            zombies.splice(i, 1);
            
        }
    }
}


function queueWave(waveObject)
{
    
    for(let i = 0; i < entrances.length; i++)
    {
        for(let j = 0; j < waveObject.basicZombieCount; j++)
        {
           // let z = function(){entrances[i].entrance.spawnZombie("basic");}
          // let a = setTimeout(spawnBasic, TIME_BETWEEN_UNITS * j / gameSpeed);
          // basicsToBeSpawned.push(a);
          basicsToBeSpawned ++;
        }
        for(let k = 0; k < waveObject.fatZombieCount; k++)
        {
           // let zz = function(){entrances[i].entrance.spawnZombie("fat");}
          // setTimeout(zz, TIME_BETWEEN_UNITS * k);
           //let b = setTimeout(spawnFat, TIME_BETWEEN_UNITS * k / gameSpeed);
           //fatsToBeSpawned.push(b);
           fatsToBeSpawned ++;
        }
        for(let l = 0; l < waveObject.runnerZombieCount; l++)
        {
           // let zzz = function(){entrances[i].entrance.spawnZombie("runner");}
           //let c = setTimeout(spawnRunner, TIME_BETWEEN_UNITS * l / gameSpeed);
           //runnersToBeSpawned.push(c);
           runnersToBeSpawned ++;
        }
    }
}

function queueAltWave(waveObject)
{
    for(let i = 0; i < entrances.length; i++)
    {
        for(let j = 0; j < waveObject.basicZombieCount; j++)
        {
           // let z = function(){entrances[i].entrance.spawnZombie("basic");}
          // let a = setTimeout(spawnBasic, TIME_BETWEEN_UNITS * j / gameSpeed);
          // basicsToBeSpawned.push(a);
          basicsToBeSpawnedAlt ++;
        }
        for(let k = 0; k < waveObject.fatZombieCount; k++)
        {
           // let zz = function(){entrances[i].entrance.spawnZombie("fat");}
          // setTimeout(zz, TIME_BETWEEN_UNITS * k);
           //let b = setTimeout(spawnFat, TIME_BETWEEN_UNITS * k / gameSpeed);
           //fatsToBeSpawned.push(b);
           fatsToBeSpawnedAlt ++;
        }
        for(let l = 0; l < waveObject.runnerZombieCount; l++)
        {
           // let zzz = function(){entrances[i].entrance.spawnZombie("runner");}
           //let c = setTimeout(spawnRunner, TIME_BETWEEN_UNITS * l / gameSpeed);
           //runnersToBeSpawned.push(c);
           runnersToBeSpawnedAlt ++;
        }
    }
}
function spawnQueue()
{
    if(spawnCount <= 0)
    {
        for (let i = basicsToBeSpawned -1; i >=0; i--)
        {
        
        spawnBasic();
        spawnCount = SPAWN_COUNT_VALUE;
        basicsToBeSpawned --;
        return;
        }
        for (let i = fatsToBeSpawned -1; i >=0; i--)
        {
        
        spawnFat();
        spawnCount = SPAWN_COUNT_VALUE;
        fatsToBeSpawned --;
        return;
        }
        for (let i = runnersToBeSpawned -1; i >=0; i--)
        {
        
        spawnRunner();
        spawnCount = SPAWN_COUNT_VALUE;
        runnersToBeSpawned --;
        return;
        }
    }
    else
    {
        spawnCount--;
    }
    
}

function spawnQueueAlt()
{
    if(spawnCountAlt <= 0)
    {
        for (let i = basicsToBeSpawnedAlt -1; i >=0; i--)
        {
        
        spawnBasic();
        spawnCountAlt = SPAWN_COUNT_VALUE;
        basicsToBeSpawnedAlt --;
        return;
        }
        for (let i = fatsToBeSpawnedAlt -1; i >=0; i--)
        {
        
        spawnFat();
        spawnCountAlt = SPAWN_COUNT_VALUE;
        fatsToBeSpawnedAlt --;
        return;
        }
        for (let i = runnersToBeSpawnedAlt -1; i >=0; i--)
        {
        
        spawnRunner();
        spawnCountAlt = SPAWN_COUNT_VALUE;
        runnersToBeSpawnedAlt --;
        return;
        }
    }
    else
    {
        spawnCountAlt --;
    }
    
}
function spawnWave_OLD_1(waveObject)
{
    basicsToBeSpawned = [];
    fatsToBeSpawned = [];
    runnersToBeSpawned = [];
    for(let i = 0; i < entrances.length; i++)
    {
        for(let j = 0; j < waveObject.basicZombieCount; j++)
        {
           // let z = function(){entrances[i].entrance.spawnZombie("basic");}
           let a = setTimeout(spawnBasic, TIME_BETWEEN_UNITS * j / gameSpeed);
           basicsToBeSpawned.push(a);
        }
        for(let k = 0; k < waveObject.fatZombieCount; k++)
        {
           // let zz = function(){entrances[i].entrance.spawnZombie("fat");}
          // setTimeout(zz, TIME_BETWEEN_UNITS * k);
           let b = setTimeout(spawnFat, TIME_BETWEEN_UNITS * k / gameSpeed);
           fatsToBeSpawned.push(b);
        }
        for(let l = 0; l < waveObject.runnerZombieCount; l++)
        {
           // let zzz = function(){entrances[i].entrance.spawnZombie("runner");}
           let c = setTimeout(spawnRunner, TIME_BETWEEN_UNITS * l / gameSpeed);
           runnersToBeSpawned.push(c);
        }
    }
}
function spawnWave_OLD(waveNbr)
{
    for(let i = 0; i < entrances.length; i++)
    {
        for(let j = 0; j < entrances[i].entrance.waves[waveNbr].basicZombieCount; j++)
        {
           let z = function(){entrances[i].entrance.spawnZombie("basic");}
           setTimeout(z, TIME_BETWEEN_UNITS * j);
        }
        for(let k = 0; k < entrances[i].entrance.waves[waveNbr].fatZombieCount; k++)
        {
            let zz = function(){entrances[i].entrance.spawnZombie("fat");}
            setTimeout(zz, TIME_BETWEEN_UNITS * k);
        }
        for(let l = 0; l < entrances[i].entrance.waves[waveNbr].runnerZombieCount; l++)
        {
            let zzz = function(){entrances[i].entrance.spawnZombie("runner");}
            setTimeout(zzz, TIME_BETWEEN_UNITS * l);
        }
        
    }
    
}
function addSecond()
{
    
        gameTime ++;
    
    
}
function increaseCurrentWaveSeconds()
{
    
        currentWaveSeconds ++;
    
}
function updateTime()
{
    
        globalClocker =  setInterval(addSecond, 1000 / gameSpeed);
    
   
}
function queueWaves(config) // config :[  {time: , waveNumber: , hasBeenSwpawned = false }, ...  ]
{
    if(currentWaveClocker == null)
            {
                currentWaveClocker = setInterval(increaseCurrentWaveSeconds, 1000);
            }
    for(let i = 0; i < config.length; i++)
    {
        if(          (config[i].time == currentWaveSeconds)       &&      (config[i].waveNumber == currentWave)     &&      (config[i].hasBeenSpawned == false)      &&     (!config[i].isAlternateWave)  )
        {   
            config[i].hasBeenSpawned = true;
            
            queueWave(config[i].waveObject);
            
            
            
            
        }
        else if(     (config[i].time == currentWaveSeconds)       &&      (config[i].waveNumber == currentWave)    &&      (config[i].hasBeenSpawned == false)        &&     (config[i].isAlternateWave) )
        {
            config[i].hasBeenSpawned = true;
            
            queueAltWave(config[i].waveObject);
        }
    }
}

function createWaves()
{
    for(let i = 0; i < NBR_OF_WAVES_TOTAL; i++)
    {
        let w = new wave();
        
    }
}

function createWavesConfig()
{
    let config = [];
   // let interval = lastWaveGameTime / nbrOfWavesTotal;

    for(let i = 0; i < NBR_OF_WAVES_TOTAL; i++)
    {
        let wavecfg = {waveNumber: i+1, waveObject: {basicZombieCount: 2+i, fatZombieCount: 0, runnerZombieCount: 0}, hasBeenSpawned: false, time: 1 };
        config.push(wavecfg);
    }
    let customWave1 = {waveNumber:5, waveObject:{basicZombieCount: 0, fatZombieCount: 1, runnerZombieCount: 3}, hasBeenSpawned: false, time:15};
    
    let customWave2 = {waveNumber:11, waveObject: {basicZombieCount: 3, fatZombieCount: 2, runnerZombieCount: 6}, hasBeenSpawned: false, time:30};
    let customWave3 = {waveNumber:14, waveObject: {basicZombieCount: 4, fatZombieCount: 2, runnerZombieCount: 2}, hasBeenSpawned: false, time:30};
    let customWave4 = {waveNumber:15, waveObject: {basicZombieCount: 0, fatZombieCount: 0, runnerZombieCount: 6}, hasBeenSpawned: false, time:30, isAlternateWave: true};
    let customWave5 = {waveNumber:7, waveObject: {basicZombieCount: 0, fatZombieCount: 0, runnerZombieCount: 5}, hasBeenSpawned: false, time:4, isAlternateWave: true};
    let customWave6 = {waveNumber:9, waveObject: {basicZombieCount: 0, fatZombieCount: 2, runnerZombieCount: 3}, hasBeenSpawned: false, time:15, isAlternateWave: true};
    config.push(customWave1, customWave2, customWave3, customWave4, customWave5, customWave6);
    return config;



}

function drawImageCenter(image, x, y, cx, cy, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy, TILE_SIZE, TILE_SIZE);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
} 

function drawImageCenterRes(image, x, y, cx, cy, scale, rotation, resizingX, resizingY){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy, resizingX, resizingY);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
} 


function upgradeSelectedTowers()
{
    for(let i = 0; i < towers.length; i++)
    {
        if(towers[i].isSelected)
        {
            if(player1.money >= towers[i].upgradeCost)
            {
                if(towers[i].lvl <=1)
                {
                    console.log("upgraded!")
                    player1.money -= towers[i].upgradeCost;
                    towers[i].lvl ++;
                    towers[i].dmg = towers[i].dmg *2;
                    towers[i].isSelected = false;
                }
                else
                {
                    console.log("Max level reached !");
                }

            }
        }
    }
}

function goToNextWave()
{
    /* if(currentWave == 0)
    {
        setTimeout(currentWave++, 5000);
    } */
    
    if(zombies.length <=0)
    {
        if(noZombieCount <= 0)
        {
            noZombieCount = NO_ZOMBIE_COUNT;
            currentWave++;
            currentWaveSeconds = 0;
            
        }
        else
        {
            noZombieCount --;
        }
        
    }
}

function checkMissilesExplosions()
{
    for(let i = projectiles.length -1; i >=0; i--)
    {
        if(projectiles[i].isReadyToExplode())
        {
            projectiles[i].explode();
            projectiles.splice(i, 1);
        
        }
    }
}

function moveProjectiles()
{
    for(let i = 0; i < projectiles.length; i++)
    {
        projectiles[i].moveToTarget();
    }
}
function returnPathArray(exclusionTile = null)
{
    let pathArray = [];
    //let isExitReached = false;
    let ex = null;
    if(exclusionTile)
    {
        ex = exclusionTile;
    }
    for(let i = 0; i < entrances.length; i++)
    {
       pathArray.push(entrances[i]);
       let actual = entrances[i];
       
       // if(actual.groundTile)if(     (!neis[k].groundTile)      ||     (neis[k].groundTile.isTrapSlotOccupied == false)       )
        whileCount = MAX_WHILE_CALC;
       while(actual.distToExit > 0 && whileCount >= 0)
       {
           
           if(ex != null)
           {
            //console.log(actual == ex);
            actual = actual.returnBestNeighbor(ex);
                pathArray.push(actual);
                
               
           }
           else
           {
            actual = actual.returnBestNeighbor();
            pathArray.push(actual);
            
            }
            whileCount --;
           if(actual.distToExit == 0)
           {
               return pathArray;
           }

       }

       return null;
       
       //let u = returnBestNeighbor()
       

    }
}
function togglePauseGame(evt)
{
    let keyCode = evt.keyCode;
    if(keyCode == 80)
    {
        pGame();
    }
    
}

function pGame()
    {
        if(gameSpeed == 1) // || actualSpeed == 2 || actualSpeed ==4)
        {
            previousGameSpeed = 1;
            gameSpeed = 0;
            clearInterval(currentWaveClocker);
            clearInterval(globalClocker);
        }
        else if(gameSpeed == 2) // || actualSpeed == 2 || actualSpeed ==4)
        {
            previousGameSpeed = 2;
            gameSpeed = 0;
            clearInterval(currentWaveClocker);
            clearInterval(globalClocker);
        }
        else if(gameSpeed == 4) // || actualSpeed == 2 || actualSpeed ==4)
        {
            previousGameSpeed = 4;
            gameSpeed = 0;
            clearInterval(currentWaveClocker);
            clearInterval(globalClocker);
        }
        else if(gameSpeed == 0)
        {
            gameSpeed = previousGameSpeed;
            currentWaveClocker = setInterval(increaseCurrentWaveSeconds, 1000 / gameSpeed);
            globalClocker =  setInterval(addSecond, 1000 / gameSpeed);
        }
    }
function  toggleGameSpeed()
{
    if(gameSpeed == 0)
    {
        gameSpeed = 1;
        clearInterval(currentWaveClocker);
        clearInterval(globalClocker);
        currentWaveClocker = setInterval(increaseCurrentWaveSeconds, 1000);
        globalClocker =  setInterval(addSecond, 1000);
        /* if(basicsToBeSpawned != null || basicsToBeSpawned.length != 0)
        {
            for(let i =0; i < basicsToBeSpawned.length; i++)
            {
                setTimeout(spawnBasic, TIME_BETWEEN_UNITS * i);
            }
            
        }

        if(fatsToBeSpawned != null || fatsToBeSpawned.length != 0)
        {
            for(let i =0; i < fatsToBeSpawned.length; i++)
            {
                setTimeout(spawnFat, TIME_BETWEEN_UNITS * i + basicsToBeSpawned.length * TIME_BETWEEN_UNITS);
            }
            
        }

        if(runnersToBeSpawned != null || runnersToBeSpawned.length != 0)
        {
            for(let i =0; i < runnersToBeSpawned.length; i++)
            {
                setTimeout(spawnBasic, TIME_BETWEEN_UNITS * i + basicsToBeSpawned.length * TIME_BETWEEN_UNITS + fatsToBeSpawned.length * TIME_BETWEEN_UNITS);
            }
            
        } */
    }
    else if(gameSpeed == 1)
    {
        gameSpeed = 2;
        clearInterval(currentWaveClocker);
        clearInterval(globalClocker);
        currentWaveClocker = setInterval(increaseCurrentWaveSeconds, 1000 / gameSpeed);
        globalClocker =  setInterval(addSecond, 1000 / gameSpeed);
    }
    else if(gameSpeed == 2)
    {
        gameSpeed = 4;
        clearInterval(currentWaveClocker);
        clearInterval(globalClocker);
        currentWaveClocker = setInterval(increaseCurrentWaveSeconds, 1000 / gameSpeed);
        globalClocker =  setInterval(addSecond, 1000 / gameSpeed);
    }
    else if(gameSpeed == 4)
    {
        gameSpeed = 0;
        clearInterval(currentWaveClocker);
        clearInterval(globalClocker);
        /* if(basicsToBeSpawned != null || basicsToBeSpawned.length != 0)
        {
            for(let i =0; i < basicsToBeSpawned.length; i++)
            {
                clearTimeout(basicsToBeSpawned[i]);
            }
            
        }

        if(fatsToBeSpawned != null || fatsToBeSpawned.length != 0)
        {
            for(let i =0; i < fatsToBeSpawned.length; i++)
            {
                clearTimeout(fatsToBeSpawned[i]);
            }
            
        }

        if(runnersToBeSpawned != null || runnersToBeSpawned.length != 0)
        {
            for(let i =0; i < runnersToBeSpawned.length; i++)
            {
                clearTimeout(runnersToBeSpawned[i]);
            }
            
        } */
    }
}
function spawnBasic()
{
    for(let i = 0; i<entrances.length; i ++)
    {
        entrances[i].entrance.spawnZombie("basic");
    }
    
}

function spawnFat()
{
    for(let i = 0; i<entrances.length; i ++)
    {
        entrances[i].entrance.spawnZombie("fat");
    }
}

function spawnRunner()
{
    for(let i = 0; i<entrances.length; i ++)
    {
        entrances[i].entrance.spawnZombie("runner");
    }
}

function sellSelectedTowers()
{
    for(let i = towers.length -1; i >=0 ; i--)
    {
        if(towers[i].isSelected)
        {
           
                
                    console.log("sold!")
                    player1.money += Math.round(towers[i].cost*2/3 + (towers[i].upgradeCost*2/3 * towers[i].lvl));
                    
                    towers[i].unitTile.groundTile.isTrapSlotOccupied = false;
                    towers.splice(i, 1);
                    sellButton.style.display = "none";
            
            
            
                
                

            
        }
    }
    findGroundTilesDistToExit(exits[0]);
}

function checkButtonsToDisplay()
{
    sellButton.style.display = "none";
    upgradeButton.style.display = "none";
    let saleTotal = 0;
    let upgradeTotal = 0;
    for(let i = 0; i < towers.length; i ++)
    {
        if(towers[i].isSelected)
        {
            sellButton.style.display = "block";
            saleTotal += Math.round(towers[i].cost*2/3 + (towers[i].upgradeCost*2/3 * towers[i].lvl));
            
            if(towers[i].lvl <= 1)
            {
                upgradeButton.style.display = "block";
                upgradeTotal += towers[i].upgradeCost;
            }
        }

    }
    if(saleTotal != 0)
    {
    sellButton.textContent = "Sell:" + saleTotal;
        
    }
    if(upgradeTotal != 0)
    {
        upgradeButton.textContent = "Upgrade: " + upgradeTotal;
        if(upgradeTotal > player1.money)
        {
            upgradeButton.style.background = "red";
        }
        else
        {
            upgradeButton.style.background = "green";
        }
    }
}

function calcAllModifiedSpeeds()
{
    
    for(let i =0; i < zombies.length; i++)
    {
       // zombies[i].isSlowed = 0;
        zombies[i].checkIfSlowed();
    }
}

function decreaseLightningsCount()
{
    for (let i = lightnings.length -1; i >= 0 ; i--)
    {
        lightnings[i].decreaseCount();
        if(lightnings[i].count <= 0)
        {
            lightnings.splice(i, 1);
        }
    }
}

function displayLightnings()
{
    for(let i =0; i < lightnings.length; i++)
    {
        
        if(lightnings[i].lvl == 0)
        {
            drawImageCenter(lightning_1_png, lightnings[i].status.x + 20,  lightnings[i].status.y, TILE_SIZE/2, TILE_SIZE/2 , 4,  lightnings[i].pointTarget());
        }
        else if(lightnings[i].lvl == 1)
        {
            drawImageCenter(lightning_2_png, lightnings[i].status.x ,  lightnings[i].status.y , TILE_SIZE/2, TILE_SIZE/2 , 4, lightnings[i].pointTarget());
        }
        else if(lightnings[i].lvl == 2)
        {
            drawImageCenter(lightning_3_png, lightnings[i].status.x ,  lightnings[i].status.y , TILE_SIZE/2, TILE_SIZE/2, 4, lightnings[i].pointTarget());
            
        }
    }
    
}

function checkZombiesCollisions()
{
    for(let i = 0; i < zombies.length; i++)
    {
        zombies[i].checkCollisions();
        
    }
}

function randomInt(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Utilisation
//La variable contient un nombre aléatoire compris entre 1 et 10


/* function isPathExistsIfPlaced(unitTileToTest)
{
    let testPathArray = [];
    let testTile = unitTileToTest;
    testTile.isTrapSlotOccupied = true;
    for(let i = 0; i < entrances.length; i++)
    {

    }
} */