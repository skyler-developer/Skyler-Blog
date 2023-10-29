import React, { useEffect } from "react";
import { useRef } from "react";
const BlinkLoop = () => {
    const loopRef = useRef(null);
    const loop = () => {
        const blink = loopRef.current;
        let blinkLoop1 = setInterval(() => {
            let r1 = parseInt(Math.random() * 6) - 2 + "px";
            let r2 = parseInt(Math.random() * 6) - 2 + "px";
            let r3 = parseInt(Math.random() * 6) - 2 + "px";
            blink.style.textShadow = ` ${r1}  ${r2}  ${r3}  pink `;
        }, 300);
        let blinkLoop2 = setInterval(() => {
            let r = parseInt(Math.random() * 10) - 4;
            blink.style.transform = `skew(${r}deg)`;
        }, 500);

        // 清除定时器
        /*  return () => {
            clearInterval(blinkLoop1);
            clearInterval(blinkLoop2);
        }; */
    };
    useEffect(loop, []);
    return (
        <div
            className="text-malfunction"
            style={{
                position: "fixed",
                right: "2vw",
                bottom: "25vh",
                fontSize: "3vw",
                color: "rgb(148, 214, 252)",
                transform: "skew(-10deg)",
                transition: "text-shadow 0.3s ease-in-out, transform 0.5s ease-in-out",
            }}
            ref={loopRef}>
            Skyler's Blog
        </div>
    );
};

export default BlinkLoop;
