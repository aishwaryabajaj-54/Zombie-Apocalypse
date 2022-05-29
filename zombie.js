// zombie movement
const zombieRoam = (i, j, move, dimension) => {
  try {
    if(move === 'r') {
        i += 1;
    } else if(move === 'l') {
        i -= 1;
    } else if(move === 'd') {
        j += 1;
    } else if(move === 'u') {
        j -=1
    } else{
        throw new Error('Invalid Zombie Move');
    }
    if(i >= dimension) i = 0; 
    else if(i < 0) i += dimension; 
    if(j >= dimension) j = 0;
    else if(j < 0) j += dimension; 
   
    return {x: i, y: j};
 } catch (error) {
    throw error;
 }
}


const mainFunction = () => {
 try {
    // input extraction and data validation start 
    const dimension = parseInt(document.getElementById("dimension").value);
    const moves = document.getElementById("moves").value ? document.getElementById("moves").value.toLowerCase(): '';
    let zombiesString = document.getElementById("zombiePos").value;
    let creaturesString = document.getElementById("creaturePos").value;
    
    zombiesString = zombiesString.replace(/[ )(]/g,'');

    if(!zombiesString || isNaN(parseInt(zombiesString.split(',')[0])) || isNaN(parseInt(zombiesString.split(',')[1])) || !creaturesString){
        throw new Error('Invalid Input Data');
    }
    const zombies = [{ x: parseInt(zombiesString.split(',')[0]), y: parseInt(zombiesString.split(',')[1]) }];

    creaturesString = creaturesString.replace(/ /g,"").split(')(');
    const creatures = creaturesString.map((creat)=>{
      const creature = creat.replace(/[ )(]/g,'');
      if(!creature || !creature.split(',')[0] || isNaN(parseInt(creature.split(',')[0])) || isNaN(parseInt(creature.split(',')[1]))) {
        throw new Error('Invalid Input Data');
      }

      return { x: parseInt(creature.split(',')[0]), y: parseInt(creature.split(',')[1]) };
   });

   if(!dimension || !moves || !zombies.length || !creatures.length){
       throw new Error('Input Data missing');
   }
   // input extraction and data validation end 

   let zombiePositions = '';
   let creaturesPositions = '';

   //evaluating each zombie as per the move
    for(let n=0; n < zombies.length; n++) {
        let zombiePos = { x: zombies[n].x, y: zombies[n].y };

        for(let k=0; k < moves.length; k++) {
            zombiePos = zombieRoam(zombiePos.x, zombiePos.y, moves[k], dimension);
            const deadCreature = creatures.findIndex(creature => creature.x === zombiePos.x && creature.y === zombiePos.y);
            if(deadCreature > -1) zombies.push(...creatures.splice(deadCreature, 1));
        }
        
        zombiePositions += '(' + zombiePos.x + ',' + zombiePos.y + ') ';
   }

  // extracting creature's position
   creatures.map((creature)=>{
    creaturesPositions += '(' + creature.x + ',' + creature.y + ')';
   });

   const zombieOutput = document.getElementById('zombieOutput');
   zombieOutput.innerHTML = `Zombie's Position: ${zombiePositions ? zombiePositions: 'none'} <br/> Creature's Positions: ${creaturesPositions ? creaturesPositions : 'none'}`
 } catch (error){
   const zombieOutput = document.getElementById('zombieOutput');
   zombieOutput.innerHTML = error;
 }
}

