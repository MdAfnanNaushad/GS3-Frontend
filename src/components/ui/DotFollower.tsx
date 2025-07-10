"use client";
import React, { useEffect } from "react";

interface FollowCursorProps {
  color?: string;
}

const FollowCursor: React.FC<FollowCursorProps> = ({ color = "#fff" }) => {
  useEffect(() => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const cursor: {
      x: number;
      y: number;
    } = { x: 0, y: 0 };
    let visible = true; // true = dot shown
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    class Dot {
      position: { x: number; y: number };
      width: number;
      lag: number;

      constructor(x: number, y: number, width: number, lag: number) {
        this.position = { x, y };
        this.width = width;
        this.lag = lag;
      }

      moveTowards(x: number, y: number, context: CanvasRenderingContext2D) {
        this.position.x += (x - this.position.x) / this.lag;
        this.position.y += (y - this.position.y) / this.lag;
        context.fillStyle = color;
        context.beginPath();
        context.arc(
          this.position.x,
          this.position.y,
          this.width,
          0,
          2 * Math.PI
        );
        context.fill();
        context.closePath();
      }
    }

    const dot = new Dot(width / 2, height / 2, 5, 10);

    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (!visible) visible = true; // restore visibility on mouse move
    };

    const onClick = () => {
      visible = false; // hide dot on click
      context?.clearRect(0, 0, width, height);
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const updateDot = () => {
      if (context) {
        context.clearRect(0, 0, width, height);
        if (visible) dot.moveTowards(cursor.x, cursor.y, context);
      }
    };

    const loop = () => {
      updateDot();
      animationFrame = requestAnimationFrame(loop);
    };

    const init = () => {
      if (prefersReducedMotion.matches) {
        console.log("Reduced motion enabled, cursor effect skipped.");
        return;
      }

      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.pointerEvents = "none";
      canvas.width = width;
      canvas.height = height;
      document.body.appendChild(canvas);

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);
      window.addEventListener("click", onClick);
      loop();
    };

    const destroy = () => {
      if (canvas) canvas.remove();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("click", onClick);
    };

    prefersReducedMotion.onchange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    init();

    return () => {
      destroy();
    };
  }, [color]);

  return null;
};

export default FollowCursor;
