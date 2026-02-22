/**
 * Physics Background Animation System
 * Handles interactive particle effects and scientific visualizations
 * for the educational platform
 */

class PhysicsBackground {
    constructor(containerId = '#app' || 'body') {
        this.container = document.querySelector(containerId);
        this.particlesContainer = null;
        this.particles = [];
        this.init();
    }

    init() {
        this.createBackground();
        this.createParticles();
        this.addInteractivity();
        this.animate();
    }

    createBackground() {
        const bg = document.createElement('div');
        bg.className = 'physics-background';
        
        // Add scientific diagrams
        const diagrams = ['pendulum', 'orbit', 'magnetic-field', 'force-vectors'];
        diagrams.forEach(diagram => {
            const div = document.createElement('div');
            div.className = `physics-diagram ${diagram}`;
            bg.appendChild(div);
        });

        // Create particles container
        this.particlesContainer = document.createElement('div');
        this.particlesContainer.className = 'physics-particles';
        bg.appendChild(this.particlesContainer);

        document.body.insertBefore(bg, document.body.firstChild);
    }

    createParticles() {
        const particleTypes = [
            { type: 'atom', count: 4 },
            { type: 'electron', count: 3 },
            { type: 'light-dust', count: 12 },
            { type: 'ripple', count: 2 },
            { type: 'quantum', count: 5 }
        ];

        let id = 0;
        particleTypes.forEach(({ type, count }) => {
            for (let i = 0; i < count; i++) {
                const particle = this.createParticle(type, id++);
                this.particles.push(particle);
                this.particlesContainer.appendChild(particle.element);
            }
        });
    }

    createParticle(type, id) {
        const el = document.createElement('div');
        el.className = `particle ${type} p${id % 6}`;
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const velocity = {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
        };

        return {
            id,
            element: el,
            type,
            x,
            y,
            velocity,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
        };
    }

    addInteractivity() {
        const handleMouseMove = (e) => {
            const rect = this.particlesContainer.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.particles.forEach((particle) => {
                const dx = mouseX - (particle.x / 100) * rect.width;
                const dy = mouseY - (particle.y / 100) * rect.height;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const angle = Math.atan2(dy, dx);
                    const force = (1 - distance / 150) * 0.5;
                    
                    particle.vx -= Math.cos(angle) * force;
                    particle.vy -= Math.sin(angle) * force;

                    // Add subtle glow effect
                    particle.element.style.filter = `drop-shadow(0 0 10px rgba(0, 217, 255, ${0.5 + force}))`;
                    particle.element.style.opacity = Math.min(1, 0.5 + force);
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('mousemove', handleMouseMove);
        });
    }

    animate() {
        const rect = this.particlesContainer.getBoundingClientRect();

        this.particles.forEach((particle) => {
            // Apply velocity
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Boundary wrapping
            if (particle.x < -5) particle.x = 105;
            if (particle.x > 105) particle.x = -5;
            if (particle.y < -5) particle.y = 105;
            if (particle.y > 105) particle.y = -5;

            // Update position
            particle.element.style.left = `${particle.x}%`;
            particle.element.style.top = `${particle.y}%`;

            // Reset glow if no interaction
            if (Math.abs(particle.vx) < 0.01 && Math.abs(particle.vy) < 0.01) {
                particle.element.style.filter = '';
                particle.element.style.opacity = '';
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    // Public methods for external control
    addGlowEffect(selector, color = 'cyan') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('neon-icon', color);
        });
    }

    enhanceCard(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('glass-card');
        });
    }

    createGlowingText(text, options = {}) {
        const span = document.createElement('span');
        span.textContent = text;
        span.className = `neon-text ${options.color || 'cyan'}`;
        if (options.animate) span.classList.add('breathing');
        return span;
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.physicsBackground = new PhysicsBackground();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsBackground;
}
