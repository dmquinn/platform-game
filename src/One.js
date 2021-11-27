import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const One = ({ setLevel, setJump, jump }) => {
  const refEl = useRef(null);
  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body;
    let onGround = true;
    const engine = Engine.create();
    console.log(World);
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth - 20,
        height: window.innerHeight - 10,
        wireframes: false,
        background: "rgb(24, 24, 24)",
      },
    });

    const topWall = Bodies.rectangle(750, 0, window.innerWidth, 20, {
      isStatic: true,
    });
    const leftWall = Bodies.rectangle(0, 350, 20, window.innerHeight, {
      isStatic: true,
    });
    const rightWall = Bodies.rectangle(
      window.innerWidth + 20,
      310,
      20,
      window.innerHeight,
      {
        isStatic: true,
      }
    );
    const bottomWall = Bodies.rectangle(
      750,
      window.innerHeight - 50,
      window.innerWidth,
      70,
      {
        isStatic: true,
        render: {
          fillStyle: "whitesmoke",
        },
      }
    );

    const ball = Bodies.rectangle(100, 200, 34, 30, {});

    World.add(engine.world, [
      // gridBackground,
      topWall,
      leftWall,
      rightWall,
      bottomWall,

      ball,
    ]);

    Matter.Runner.run(engine);

    Render.run(render);

    function handleKeyDown(e) {
      if (e.key === "ArrowUp" && onGround === true) {
        onGround = false;
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: 0, y: -0.03 }
        );
      }
      if (e.key === "ArrowRight") {
        Matter.Body.translate(ball, { x: -10, y: 0 });
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: 0.02, y: 0 }
        );
      }
      if (e.key === "ArrowLeft") {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: -0.02, y: 0 }
        );
      }
      if (e.key === "+") {
        World.zoom(1.1);
      }
    }
    console.log(ball.position.y);

    document.addEventListener("keydown", handleKeyDown);

    Matter.Events.on(engine, "collisionStart", function (event) {
      event.pairs.forEach(function (obj) {
        console.log(obj);
        if (obj.id === "A3B5") setLevel(1);
        if (obj.id === "A4B5") {
          onGround = true;
        }
      });
    });
  });
  return (
    <div className="game">
      <div ref={refEl} />
      <h1>It's Party Time!</h1>
    </div>
  );
};
export default One;
