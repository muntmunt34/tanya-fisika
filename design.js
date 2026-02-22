(function(){
    // Simple interactive 3D/float enhancements for the site
    document.addEventListener('DOMContentLoaded', function(){
        // Tilt effect for elements with .tilt
        const tiltEls = document.querySelectorAll('.tilt');
        document.addEventListener('mousemove', function(e){
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;
            tiltEls.forEach(el => {
                el.style.transform = `rotateY(${dx * 6}deg) rotateX(${ -dy * 6 }deg) translateZ(0)`;
                el.style.transition = 'transform 0.08s linear';
            });
        });

        // Auto-add .tilt to primary logo if present
        const logo = document.querySelector('.logo-circle');
        if(logo) logo.classList.add('tilt');

        // Floating blobs background (only add once)
        if(!document.querySelector('.floating-blobs')){
            const container = document.createElement('div');
            container.className = 'floating-blobs';

            const colors = [
                'radial-gradient(circle at 30% 30%, rgba(67,97,238,0.20), rgba(67,97,238,0.04))',
                'radial-gradient(circle at 30% 30%, rgba(6,214,160,0.16), rgba(6,214,160,0.03))',
                'radial-gradient(circle at 30% 30%, rgba(247,37,133,0.12), rgba(247,37,133,0.02))',
                'radial-gradient(circle at 30% 30%, rgba(255,158,0,0.14), rgba(255,158,0,0.03))'
            ];

            for(let i=0;i<9;i++){
                const b = document.createElement('div');
                b.className = 'blob';
                const size = 60 + Math.floor(Math.random()*220);
                b.style.width = size + 'px';
                b.style.height = size + 'px';
                b.style.left = (Math.random()*110 - 5) + '%';
                b.style.top = (Math.random()*110 - 5) + '%';
                b.style.background = colors[i % colors.length];
                b.style.animationDelay = (Math.random()*6) + 's';
                b.style.opacity = 0.9 - Math.random()*0.5;
                container.appendChild(b);
            }

            document.body.appendChild(container);
        }

        // Subtle floating movement using requestAnimationFrame
        const floats = document.querySelectorAll('.floating-blobs .blob');
        if(floats.length){
            const state = [];
            floats.forEach((el, idx)=>{
                state.push({
                    el,
                    vx: (Math.random()*0.6-0.3),
                    vy: (Math.random()*0.4-0.2),
                    x: parseFloat(el.style.left),
                    y: parseFloat(el.style.top),
                    ang: Math.random()*360,
                    vr: (Math.random()*0.6-0.3)
                });
            });

            function step(){
                state.forEach(s => {
                    s.x += s.vx * 0.02;
                    s.y += s.vy * 0.02;
                    s.ang += s.vr * 0.2;
                    if(s.x < -10) s.x = 110;
                    if(s.x > 110) s.x = -10;
                    if(s.y < -10) s.y = 110;
                    if(s.y > 110) s.y = -10;
                    s.el.style.left = s.x + '%';
                    s.el.style.top = s.y + '%';
                    s.el.style.transform = `translate(-50%, -50%) rotate(${s.ang}deg)`;
                });
                requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

    });
})();
