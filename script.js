// Basic button functionality for external links
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add loading state for external links
        if (this.href && (this.href.includes('mailto:') || this.href.includes('instagram'))) {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 2000);
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Biscottino website loaded successfully!');
});