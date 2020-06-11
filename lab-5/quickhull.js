let hull = [];

function QuickHull(points) {
    hull = [];

    if(points.length == 3) {
        points.push(points[0]); //close the poly
        return points;
    }
    let baseline = getMinMaxPoints(points);
    addSegments(baseline, points);
    addSegments([baseline[1], baseline[0]], points);
    hull.push(hull[0]);
    return hull;
}

/**
 * Return the min and max points in the set along the X axis
 * Returns [ {x,y}, {x,y} ]
 * @param {Array} points - An array of {x,y} objects
 */
function getMinMaxPoints(points) {
    let i;
    let minPoint;
    let maxPoint;

    minPoint = points[0];
    maxPoint = points[0];

    for(i=1; i<points.length; i++) {
        if(points[i].x < minPoint.x)
            minPoint = points[i];
        if(points[i].x > maxPoint.x)
            maxPoint = points[i];
    }

    return [minPoint, maxPoint];
}

/**
 * Calculates the distance of a point from a line
 * @param {Array} point - Array [x,y]
 * @param {Array} line - Array of two points [ [x1,y1], [x2,y2] ]
 */
function distanceFromLine(point, line) {
    let vY = line[1].y - line[0].y;
    let vX = line[0].x - line[1].x;
    return (vX * (point.y - line[0].y) + vY * (point.x - line[0].x))
}

/**
 * Determines the set of points that lay outside the line (positive), and the most distal point
 * Returns: {points: [ [x1, y1], ... ], max: [x,y] ]
 * @param points
 * @param line
 */
function distalPoints(line, points) {
    let i;
    let outer_points = [];
    let point;
    let distal_point;
    let distance=0;
    let max_distance=0;

    for(i=0; i<points.length; i++) {
        point = points[i];
        distance = distanceFromLine(point,line);

        if(distance > 0) outer_points.push(point);
        else continue; //short circuit

        if(distance > max_distance) {
            distal_point = point;
            max_distance = distance;
        }

    }

    return {points: outer_points, max: distal_point};
}

/**
 * Recursively adds hull segments
 * @param line
 * @param points
 */
function addSegments(line, points) {
    let distal = distalPoints(line, points);
    if(!distal.max) return hull.push(line[0]);
    addSegments([line[0], distal.max], distal.points);
    addSegments([distal.max, line[1]], distal.points);
}

var points = [
    {x:0, y: 1},
    {x:-1,y:0},
    {x:1, y:0 },
    {x:0, y:-1 },
    {x:.3, y:.3},
    {x:-.3, y:-.3},
    {x:.3, y:-.3},
    {x:-.3, y:.3}
];

var hull1 = QuickHull(points);

console.log(JSON.stringify(hull1));