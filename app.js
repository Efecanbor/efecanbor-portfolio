const canvas = document.querySelector('#hero-canvas');
const ctx = canvas.getContext('2d');
let mouse = { x: 0, y: 0 };
let easedMouse = { x: 0, y: 0 };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    easedMouse.x += (mouse.x - easedMouse.x) * 0.08;
    easedMouse.y += (mouse.y - easedMouse.y) * 0.08;
    const size = 55; 
    const rows = Math.ceil(canvas.height / size);
    const cols = Math.ceil(canvas.width / size);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * size;
            const y = j * size;
            const dx = easedMouse.x - x;
            const dy = easedMouse.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const opacity = Math.max(0.02, 0.12 - dist / 500);
            ctx.strokeStyle = `rgba(26, 25, 24, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.strokeRect(x, y, size, size);
        }
    }
    requestAnimationFrame(drawGrid);
}
drawGrid();

gsap.registerPlugin(ScrollTrigger);
gsap.from(".huge-text", { y: 100, opacity: 0, duration: 1.5, ease: "expo.out" });

gsap.to("body", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
        end: "top 20%",
        scrub: true
    },
    backgroundColor: "#1a1918",
    color: "#f7f4f0"
});