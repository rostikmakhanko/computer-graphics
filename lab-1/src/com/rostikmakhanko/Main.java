package com.rostikmakhanko;

import com.rostikmakhanko.algorithm.Algorithm;
import com.rostikmakhanko.datastructure.Point;
import com.rostikmakhanko.view.PolygonView;


public class Main {
    public static void main(String[] args) {
        Point point = new Point(10, 10);
        System.out.println("Точка надежить многокутнику? " + Algorithm.pointIsInPolygon(Algorithm.createPolygon(), point));
        new PolygonView(Algorithm.createPolygon(), point);
    }
}
