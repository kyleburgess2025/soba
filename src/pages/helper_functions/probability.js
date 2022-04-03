export function probability(obj){
    let numBeds = 0;
    for (let i = 0; i < obj.room_types.length; i++){
        numBeds += obj.room_types[i]["avail_beds"];
    }
    
}