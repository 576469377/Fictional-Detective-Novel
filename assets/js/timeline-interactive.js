// Interactive Timeline for The Crimson Cipher
// Provides visual timeline navigation and filtering

document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveTimeline();
});

function initializeInteractiveTimeline() {
    // Initialize timeline filtering
    initializeTimelineFilters();
    
    // Initialize timeline scrolling and navigation
    initializeTimelineNavigation();
    
    // Initialize event interactions
    initializeEventInteractions();
    
    // Initialize timeline progress tracking
    initializeTimelineProgress();
}

// Timeline Filtering System
function initializeTimelineFilters() {
    const filterButtons = document.querySelectorAll('.timeline-filter');
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter events
            timelineEvents.forEach(event => {
                if (filter === 'all' || event.classList.contains(filter)) {
                    event.style.display = 'flex';
                    event.style.opacity = '1';
                    event.style.transform = 'translateX(0)';
                } else {
                    event.style.opacity = '0';
                    event.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        if (event.style.opacity === '0') {
                            event.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            // Update timeline statistics
            updateTimelineStats(filter);
        });
    });
}

// Timeline Navigation System
function initializeTimelineNavigation() {
    const timeline = document.querySelector('.timeline-track');
    const events = document.querySelectorAll('.timeline-event');
    
    // Add scroll navigation
    let isScrolling = false;
    timeline.addEventListener('scroll', function() {
        if (!isScrolling) {
            highlightVisibleEvents();
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            navigateTimeline(e.key === 'ArrowDown' ? 1 : -1);
        }
    });
    
    // Add timeline date navigation
    createTimelineNavigation();
}

function highlightVisibleEvents() {
    const events = document.querySelectorAll('.timeline-event');
    const viewportTop = window.pageYOffset;
    const viewportBottom = viewportTop + window.innerHeight;
    
    events.forEach(event => {
        const eventTop = event.offsetTop;
        const eventBottom = eventTop + event.offsetHeight;
        
        // Check if event is in viewport
        if (eventTop < viewportBottom && eventBottom > viewportTop) {
            event.classList.add('in-viewport');
            
            // Highlight current event
            if (eventTop < viewportTop + window.innerHeight * 0.5 && 
                eventBottom > viewportTop + window.innerHeight * 0.5) {
                event.classList.add('current-focus');
            } else {
                event.classList.remove('current-focus');
            }
        } else {
            event.classList.remove('in-viewport', 'current-focus');
        }
    });
}

function navigateTimeline(direction) {
    const events = Array.from(document.querySelectorAll('.timeline-event:not([style*="display: none"])'));
    const currentFocus = document.querySelector('.timeline-event.current-focus');
    let targetIndex = 0;
    
    if (currentFocus) {
        const currentIndex = events.indexOf(currentFocus);
        targetIndex = Math.max(0, Math.min(events.length - 1, currentIndex + direction));
    }
    
    if (events[targetIndex]) {
        events[targetIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

function createTimelineNavigation() {
    const timelineContainer = document.querySelector('.timeline-container');
    const navContainer = document.createElement('div');
    navContainer.className = 'timeline-navigation';
    
    // Create year markers
    const years = ['1847', '2020', '2023'];
    years.forEach(year => {
        const yearMarker = document.createElement('button');
        yearMarker.className = 'timeline-year-marker';
        yearMarker.textContent = year;
        yearMarker.dataset.year = year;
        
        yearMarker.addEventListener('click', function() {
            const targetEvent = document.querySelector(`[data-year="${year}"]`);
            if (targetEvent) {
                targetEvent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        navContainer.appendChild(yearMarker);
    });
    
    timelineContainer.insertBefore(navContainer, timelineContainer.firstChild);
}

// Event Interaction System
function initializeEventInteractions() {
    const events = document.querySelectorAll('.timeline-event');
    
    events.forEach(event => {
        // Add hover effects
        event.addEventListener('mouseenter', function() {
            this.classList.add('event-hover');
            showEventPreview(this);
        });
        
        event.addEventListener('mouseleave', function() {
            this.classList.remove('event-hover');
            hideEventPreview();
        });
        
        // Add click interaction for detailed view
        event.addEventListener('click', function() {
            showEventDetail(this);
        });
        
        // Add reading progress tracking
        addEventReadingProgress(event);
    });
}

function showEventPreview(event) {
    const preview = document.getElementById('event-preview') || createEventPreview();
    const title = event.querySelector('h4').textContent;
    const content = event.querySelector('p').textContent;
    const details = event.querySelector('.timeline-details');
    
    preview.innerHTML = `
        <div class="preview-header">
            <h5>${title}</h5>
            <button class="preview-close" onclick="hideEventPreview()">×</button>
        </div>
        <div class="preview-content">
            <p>${content}</p>
            ${details ? details.outerHTML : ''}
        </div>
        <div class="preview-footer">
            <small>Click event for detailed view</small>
        </div>
    `;
    
    // Position preview relative to mouse
    const rect = event.getBoundingClientRect();
    preview.style.left = (rect.right + 10) + 'px';
    preview.style.top = rect.top + 'px';
    preview.style.display = 'block';
}

function createEventPreview() {
    const preview = document.createElement('div');
    preview.id = 'event-preview';
    preview.className = 'timeline-event-preview';
    document.body.appendChild(preview);
    return preview;
}

function hideEventPreview() {
    const preview = document.getElementById('event-preview');
    if (preview) {
        preview.style.display = 'none';
    }
}

function showEventDetail(event) {
    const modal = document.getElementById('event-detail-modal') || createEventDetailModal();
    const title = event.querySelector('h4').textContent;
    const content = event.querySelector('p').textContent;
    const details = event.querySelector('.timeline-details');
    const year = event.dataset.year;
    const month = event.dataset.month;
    const day = event.dataset.day;
    
    // Get additional context based on event type
    const eventType = event.classList.contains('historical') ? 'historical' : 
                     event.classList.contains('personal') ? 'personal' : 'investigation';
    const context = getEventContext(eventType, year, month, day);
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeEventDetail()">×</button>
            </div>
            <div class="modal-body">
                <div class="event-date">
                    <strong>Date:</strong> ${formatEventDate(year, month, day)}
                </div>
                <div class="event-description">
                    <p>${content}</p>
                </div>
                ${details ? `<div class="event-details">${details.outerHTML}</div>` : ''}
                <div class="event-context">
                    <h4>Additional Context</h4>
                    ${context}
                </div>
                <div class="event-connections">
                    <h4>Story Connections</h4>
                    ${getEventConnections(title)}
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="closeEventDetail()">Close</button>
                <button onclick="markEventAsRead('${year}-${month}-${day}')">Mark as Read</button>
            </div>
        </div>
        <div class="modal-backdrop" onclick="closeEventDetail()"></div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function createEventDetailModal() {
    const modal = document.createElement('div');
    modal.id = 'event-detail-modal';
    modal.className = 'timeline-modal';
    document.body.appendChild(modal);
    return modal;
}

function closeEventDetail() {
    const modal = document.getElementById('event-detail-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function getEventContext(type, year, month, day) {
    const contexts = {
        historical: {
            '1847': {
                '03': 'The original Cipher Master case began during a period of social unrest in London. Cryptography was still a relatively new field, making the sophisticated codes particularly unusual.',
                '08': 'The Morrison family\'s involvement represents the first documented case of generational interest in cryptographic crimes.',
                '12': 'The case going cold established patterns that would influence police procedure for decades.'
            }
        },
        personal: {
            '2020': {
                '01': 'David Chen\'s death occurred during Sarah\'s early career, shaping her dedication to solving mysteries and her interest in cold cases.'
            },
            '2023': {
                '02': 'David Morrison\'s research represented months of careful study, indicating premeditation and deep knowledge of historical cases.'
            }
        },
        investigation: {
            '2023': {
                '11': 'Each day of the investigation built upon previous discoveries, creating a accelerating pace of revelation and danger.'
            }
        }
    };
    
    return contexts[type]?.[year]?.[month] || 'This event represents a crucial moment in the unfolding mystery.';
}

function getEventConnections(title) {
    const connections = {
        'Original Cipher Master Crimes': 'Establishes the foundation for all subsequent events. References in Chapters 3, 7, and 11.',
        'Emma Rodriguez Disappears': 'Catalyst event that triggers the entire investigation. Central to Chapters 1-2.',
        'First Message Analysis': 'Sarah\'s cryptographic skills are established. Key to Chapters 2-3.',
        'University Discovery': 'Reveals historical connections. Pivotal to Chapters 3-4.',
        'Final Confrontation': 'Resolution of both historical and contemporary mysteries. Climax in Chapters 11-12.'
    };
    
    for (const key in connections) {
        if (title.includes(key.split(' ')[0]) || title.includes(key.split(' ')[1])) {
            return `<p>${connections[key]}</p>`;
        }
    }
    
    return '<p>This event connects to the larger narrative structure and character development throughout the novel.</p>';
}

function formatEventDate(year, month, day) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    if (day) {
        return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
    } else if (month) {
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    } else {
        return year;
    }
}

// Timeline Progress System
function initializeTimelineProgress() {
    const events = document.querySelectorAll('.timeline-event');
    const readEvents = JSON.parse(localStorage.getItem('crimson-cipher-timeline-progress') || '[]');
    
    // Mark previously read events
    readEvents.forEach(eventId => {
        const event = document.querySelector(`[data-year="${eventId.split('-')[0]}"][data-month="${eventId.split('-')[1]}"]`);
        if (event) {
            event.classList.add('event-read');
        }
    });
    
    // Update progress indicator
    updateTimelineProgressIndicator();
}

function markEventAsRead(eventId) {
    const readEvents = JSON.parse(localStorage.getItem('crimson-cipher-timeline-progress') || '[]');
    
    if (!readEvents.includes(eventId)) {
        readEvents.push(eventId);
        localStorage.setItem('crimson-cipher-timeline-progress', JSON.stringify(readEvents));
        
        // Visual feedback
        const event = document.querySelector(`[data-year="${eventId.split('-')[0]}"][data-month="${eventId.split('-')[1]}"]`);
        if (event) {
            event.classList.add('event-read');
            showProgressNotification('Event marked as read!');
        }
        
        updateTimelineProgressIndicator();
    }
    
    closeEventDetail();
}

function updateTimelineProgressIndicator() {
    const totalEvents = document.querySelectorAll('.timeline-event').length;
    const readEvents = JSON.parse(localStorage.getItem('crimson-cipher-timeline-progress') || '[]').length;
    const percentage = Math.round((readEvents / totalEvents) * 100);
    
    let indicator = document.getElementById('timeline-progress-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'timeline-progress-indicator';
        indicator.className = 'timeline-progress';
        document.querySelector('.timeline-container').prepend(indicator);
    }
    
    indicator.innerHTML = `
        <div class="progress-label">Timeline Progress</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="progress-text">${readEvents}/${totalEvents} events explored (${percentage}%)</div>
    `;
}

function updateTimelineStats(filter) {
    const visibleEvents = document.querySelectorAll(`.timeline-event${filter === 'all' ? '' : '.' + filter}`);
    let statsContainer = document.getElementById('timeline-stats');
    
    if (!statsContainer) {
        statsContainer = document.createElement('div');
        statsContainer.id = 'timeline-stats';
        statsContainer.className = 'timeline-stats';
        document.querySelector('.timeline-controls').appendChild(statsContainer);
    }
    
    const filterNames = {
        'all': 'All Events',
        'historical': 'Historical Events',
        'investigation': 'Investigation Events',
        'personal': 'Personal Events'
    };
    
    statsContainer.innerHTML = `
        <span class="stats-label">${filterNames[filter]}:</span>
        <span class="stats-count">${visibleEvents.length} events</span>
    `;
}

function showProgressNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'timeline-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: bold;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add event reading progress tracking
function addEventReadingProgress(event) {
    let readingStartTime = null;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                readingStartTime = Date.now();
            } else if (readingStartTime) {
                const readingTime = Date.now() - readingStartTime;
                
                // If user spent more than 3 seconds reading, consider it engaged
                if (readingTime > 3000) {
                    const eventId = `${event.dataset.year}-${event.dataset.month}-${event.dataset.day || '01'}`;
                    
                    // Track engagement
                    const engagement = JSON.parse(localStorage.getItem('crimson-cipher-timeline-engagement') || '{}');
                    engagement[eventId] = (engagement[eventId] || 0) + readingTime;
                    localStorage.setItem('crimson-cipher-timeline-engagement', JSON.stringify(engagement));
                }
                
                readingStartTime = null;
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(event);
}