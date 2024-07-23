// Capture cursor movements
document.addEventListener('mousemove', function(event) {
    fetch('/api/cursor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now()
        })
    });
});

// Capture click events
document.addEventListener('click', function(event) {
    fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now()
        })
    });
});

// Capture page load event
window.addEventListener('load', function() {
    fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event: 'page_load',
            timestamp: Date.now()
        })
    });
});

// Capture page unload event
window.addEventListener('beforeunload', function() {
    navigator.sendBeacon('/api/event', JSON.stringify({
        event: 'page_unload',
        timestamp: Date.now()
    }));
});

