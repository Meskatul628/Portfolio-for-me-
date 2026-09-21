/* ==========================================================================
   MD. MESKATUL ISLAM - PORTFOLIO INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Theme Toggle (Dark / Light Mode)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            showToast(`Switched to ${newTheme.toUpperCase()} theme mode!`, 'info');
        });
    }

    // ----------------------------------------------------------------------
    // 2. Mobile Navigation Hamburger Menu
    // ----------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('open');
        });

        // Close menu when clicking outside or on a link
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. Scroll Active Nav Link Highlight
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // ----------------------------------------------------------------------
    // 4. Skills Category Filtering
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillGroups = document.querySelectorAll('.skill-category-group');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillGroups.forEach(group => {
                const groupCategory = group.getAttribute('data-category');

                if (filterValue === 'all' || groupCategory === filterValue) {
                    group.classList.remove('hide');
                    group.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    group.classList.add('hide');
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 5. Project Details Modal Logic
    // ----------------------------------------------------------------------
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body-content');

    const projectData = {
        biblity: {
            title: "Biblity App",
            category: "Spiritual & Lifestyle Mobile App",
            storeLinks: [
                { link: "https://play.google.com/store/apps/details?id=com.biblity.appity", type: "Google Play", icon: "fa-brands fa-google-play" }
            ],
            features: [
                "Comprehensive Bible reading interface with search & offline bookmarking.",
                "High-quality Audio Bible streaming and progress tracking.",
                "Daily Prayer reminders, journal logging, and spiritual reflections.",
                "AI-powered Chat assistant for answering questions and guided study.",
                "Firebase Authentication for secure user accounts.",
                "Firebase Cloud Messaging (FCM) for push notifications & reminders."
            ],
            techStack: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Audio Players", "FCM Notifications", "REST API"],
            description: "Biblity is a modern, feature-rich Android app built with Flutter. It blends spiritual content with intelligent AI assistance and real-time notification scheduling."
        },
        cvconnect: {
            title: "My CV Connect",
            category: "Job Tech & Career Matching Mobile Platform",
            storeLinks: [
                { link: "https://play.google.com/store/apps/details?id=com.carlovan.cvconnectai", type: "Google Play", icon: "fa-brands fa-google-play" },
                { link: "https://apps.apple.com/us/app/my-cv-connect/id6757781151", type: "App Store", icon: "fa-brands fa-apple" }
            ],
            images: [
                "assets/my cv connect/picture_1.webp",
                "assets/my cv connect/picture_2.webp.webp",
                "assets/my cv connect/picture_3.webp.webp",
                "assets/my cv connect/picture_4.webp"
            ],
            features: [
                "Interactive CV builder with real-time preview and export options.",
                "Smart AI-driven job matching system connecting candidates with employers.",
                "One-tap quick job application submission with live status tracking.",
                "Direct in-app messaging between applicants and hiring managers.",
                "AI career guidance support and interview prep tools."
            ],
            techStack: ["Flutter", "Dart", "Android & iOS", "GetX State Management", "Realtime WebSockets", "REST API"],
            description: "My CV Connect is a cross-platform mobile app available on both Google Play Store and Apple App Store, designed to revolutionize career connections with AI smart matching and fast application workflows."
        }
    };

    document.querySelectorAll('.btn-details-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectData[projectKey];

            if (data && modalBody) {
                const imagesGalleryHtml = data.images && data.images.length > 0 ? `
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem; color: var(--text-primary);"><i class="fa-solid fa-images" style="color: var(--flutter-cyan);"></i> App Screenshots:</h4>
                    <div class="modal-gallery">
                        ${data.images.map(img => `
                            <img src="${img}" alt="${data.title} Screenshot" title="Click to view full image" onclick="window.open('${img}', '_blank')">
                        `).join('')}
                    </div>
                ` : '';

                modalBody.innerHTML = `
                    <div class="modal-project-header" style="margin-bottom: 1.5rem;">
                        <span class="subheading" style="color: var(--flutter-cyan); font-size: 0.85rem; text-transform: uppercase;">${data.category}</span>
                        <h2 style="font-size: 2rem; margin-top: 0.4rem;">${data.title}</h2>
                    </div>

                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">${data.description}</p>

                    ${imagesGalleryHtml}

                    <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem; color: var(--text-primary);"><i class="fa-solid fa-list-check" style="color: var(--flutter-cyan);"></i> Key Features & Capabilities:</h4>
                    <ul style="list-style: none; padding: 0; margin-bottom: 1.8rem;">
                        ${data.features.map(feat => `
                            <li style="display: flex; gap: 0.6rem; align-items: flex-start; margin-bottom: 0.6rem; color: var(--text-secondary); font-size: 0.95rem;">
                                <i class="fa-solid fa-circle-check" style="color: var(--flutter-cyan); margin-top: 0.25rem;"></i>
                                <span>${feat}</span>
                            </li>
                        `).join('')}
                    </ul>

                    <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem; color: var(--text-primary);"><i class="fa-solid fa-layer-group" style="color: var(--flutter-cyan);"></i> Tech Stack Used:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                        ${data.techStack.map(tech => `
                            <span style="font-size: 0.8rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 6px; background: rgba(1, 181, 248, 0.12); color: var(--flutter-cyan);">${tech}</span>
                        `).join('')}
                    </div>

                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        ${data.storeLinks.map(s => `
                            <a href="${s.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; text-align: center; justify-content: center; min-width: 170px;">
                                <i class="${s.icon}"></i> ${s.type}
                            </a>
                        `).join('')}
                    </div>
                `;

                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // ----------------------------------------------------------------------
    // 6. Contact Form Submission Handler
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value || "Portfolio Inquiry";
            const message = document.getElementById('message').value;

            // Trigger mailto link for direct sending option
            const mailtoUri = `mailto:meskatul628@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            window.location.href = mailtoUri;

            showToast("Opening your default mail app to send email...", "success");
            contactForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 7. Toast Notification Helper
    // ----------------------------------------------------------------------
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}" style="color: var(--flutter-cyan);"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ----------------------------------------------------------------------
    // 8. Auto Update Footer Year
    // ----------------------------------------------------------------------
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
