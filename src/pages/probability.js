
import "./onboard.js"






function getPoints(year = "none") {
    points = 0;
    year = year.toLowerCase();

    if(year == "freshman") {
        return points = 1;
    }
    else if(year == "sophomore") {
        return points = 2;
    }
    else if(year == "junior") {
        return points = 3;
    }
    else if(year == "senior") {
        return points = 4;
    }
    return points;
}

function getProb(cls = "none", n = 0) {
    points = getPoints(cls);

}


function getNumRoommates(n = 0) {
    return n;
}