// Function to open links in new tabs reliably
function openInNewTab(url) {
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    
    // For local files, we need to handle this differently
    if (window.location.protocol === 'file:') {
        // For local files, use window.open with specific parameters
        try {
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            if (newWindow) {
                newWindow.focus();
            } else {
                // Fallback: show alert with instructions
                alert('Please allow pop-ups for this site to open links in new tabs.\n\nAlternatively, right-click the link and select "Open in new tab"');
            }
        } catch (e) {
            console.log('Could not open new tab:', e);
        }
    } else {
        // For HTTP served files, use the anchor method
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }
}

// Function to handle button clicks
function handleButtonClick(url) {
    openInNewTab(url);
}

// Function to handle navigation link clicks
function handleNavClick(event, url) {
    event.preventDefault();
    openInNewTab(url);
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            handleNavClick(e, this.href);
        });
    });
    
    // Handle buttons with onclick attributes
    const buttons = document.querySelectorAll('button[onclick*="window.open"]');
    buttons.forEach(button => {
        // Extract the URL from the onclick attribute
        const onclickAttr = button.getAttribute('onclick');
        const urlMatch = onclickAttr.match(/window\.open\(['"]([^'"]+)['"]/);
        if (urlMatch) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleButtonClick(urlMatch[1]);
            });
            // Remove the inline onclick to prevent conflicts
            button.removeAttribute('onclick');
        }
    });
    
    // Image scroll behavior control
    const devPics = document.querySelectorAll('.devpic img');
    if (devPics.length > 0) {
        let lastScrollTop = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', function() {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = currentScrollTop - lastScrollTop;
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Hide image when scrolling down significantly
            if (scrollDelta > 10 && currentScrollTop > 200) {
                devPics.forEach(img => {
                    img.style.opacity = '0';
                    img.style.visibility = 'hidden';
                });
            }
            
            // Show image when scrolling up or at top
            if (scrollDelta < -10 || currentScrollTop < 100) {
                devPics.forEach(img => {
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                });
            }
            
            // Set timeout to show image after scrolling stops
            scrollTimeout = setTimeout(() => {
                if (currentScrollTop < 500) {
                    devPics.forEach(img => {
                        img.style.opacity = '1';
                        img.style.visibility = 'visible';
                    });
                }
            }, 1000);
            
            lastScrollTop = currentScrollTop;
        });
    }
});