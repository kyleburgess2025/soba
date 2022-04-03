function calculateAverage(arr){
    let tempVal = 0;
    for (let i = 0; i < arr.length; i++){
        tempVal += arr[i].value;
    }

    return tempVal / arr.length;
}

export default calculateAverage;