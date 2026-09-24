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
        },
        safetymanager: {
            title: "Warehouse Safety Manager",
            category: "Safety Audits & Warehouse Compliance Platform",
            storeLinks: [
                { link: "https://play.google.com/store/apps/details?id=com.warehousesafety.manager", type: "Google Play", icon: "fa-brands fa-google-play" },
                { link: "https://apps.apple.com/us/app/warehouse-safety-manager-app/id6796285782", type: "App Store", icon: "fa-brands fa-apple" },
                { link: "https://apps.apple.com/us/app/warehouse-safety-manager-app/id6796285782?platform=mac", type: "macOS", icon: "fa-brands fa-apple" }
            ],
            images: [
                "assets/ware house saftey manager/image_1.webp",
                "assets/ware house saftey manager/image_2.webp",
                "assets/ware house saftey manager/image_3.webp",
                "assets/ware house saftey manager/image_4.webp"
            ],
            features: [
                "Comprehensive warehouse safety checklists and equipment inspection workflows.",
                "Rack safety & structural audits to inspect storage racks and verify load compliance.",
                "Equipment maintenance auditing for forklifts, heavy machinery, and facility tools.",
                "Visual photo logging & hazard issue tagging directly into inspection audit logs.",
                "Automated professional PDF audit reports generated instantly for OSHA compliance.",
                "In-App Purchases (IAP) integration for unlocking premium facility inspection tiers.",
                "Offline inspection mode with automatic background cloud sync upon reconnection."
            ],
            techStack: ["Flutter", "Dart", "BLoC State Management", "In-App Purchases", "Android & iOS", "macOS", "REST API"],
            description: "Warehouse Safety Manager is a multiplatform enterprise application available across Google Play, Apple App Store, and macOS. Built for safety auditors, facility managers, and inspectors, it simplifies safety inspection workflows with digital checklist tools, structural rack audits, and instant compliance reporting."
        },
        palletrack: {
            title: "Pallet Rack Inspection Manager",
            category: "Industrial Safety & Asset Inspection Platform",
            storeLinks: [
                { link: "https://play.google.com/store/apps/details?id=com.app.dti", type: "Google Play", icon: "fa-brands fa-google-play" },
                { link: "https://apps.apple.com/us/app/pallet-rack-inspection-manager/id6796648736", type: "App Store", icon: "fa-brands fa-apple" }
            ],
            images: [
                "assets/pallet rack inspection/unnamed.webp",
                "assets/pallet rack inspection/unnamed (1).webp",
                "assets/pallet rack inspection/unnamed (2).webp",
                "assets/pallet rack inspection/unnamed (3).webp"
            ],
            features: [
                "Advanced NFC tag reading & QR/Barcode scanning for instant asset identification and history lookup.",
                "Dynamic inspection checklists and customizable safety audit templates for rigorous regulatory compliance.",
                "Interactive rack and position mapping to visually organize warehouse coordinate layouts and device positions.",
                "Comprehensive contractor and inspector profile management with full audit history tracking.",
                "Detailed digital reporting with hazard photo evidence uploads and digital inspector signatures.",
                "In-App Purchases (IAP) integration for unlocking advanced inspection features and audits.",
                "Robust cloud synchronization for reliable on-site verification and multi-facility safety management."
            ],
            techStack: ["Flutter", "Dart", "Android & iOS", "NFC Scanning", "QR / Barcode", "REST API", "GetX State Management", "In-App Purchases"],
            description: "Pallet Rack Inspection Manager is an advanced industrial inspection application available on Google Play and Apple App Store. Built for equipment inspectors, contractors, and warehouse managers, it streamlines facility audits through native NFC tag reading, QR code scanning, coordinate-based rack mapping, and real-time checklist reporting."
        },
        yeppads: {
            title: "Yepp Ads",
            category: "Deals, Coupons & Vendor Marketing Platform",
            storeLinks: [
                { link: "https://play.google.com/store/apps/details?id=agency.beuptech.yepp", type: "Google Play", icon: "fa-brands fa-google-play" },
                { link: "https://apps.apple.com/us/app/yepp-ads/id6760607013", type: "App Store", icon: "fa-brands fa-apple" }
            ],
            images: [
                "assets/yeep ads/unnamed.webp",
                "assets/yeep ads/unnamed (1).webp",
                "assets/yeep ads/unnamed (2).webp",
                "assets/yeep ads/unnamed (4).webp"
            ],
            features: [
                "Exclusive vendor deal browsing across multiple shopping and lifestyle categories.",
                "Instant access to verified discount coupon codes without requiring mandatory registration.",
                "Real-time offer feed keeping users informed of flash sales and vendor promotions.",
                "Direct merchant store discovery connecting shoppers with local and online businesses.",
                "Clean, modern user interface built for fast searching, filtering, and smooth navigation.",
                "Seamless cross-platform performance optimized for both Android and iOS devices."
            ],
            techStack: ["Flutter", "Dart", "Android & iOS", "Vendor CMS APIs", "REST API"],
            description: "Yepp Ads is a user-centric deals and coupon discovery application available on both Google Play Store and Apple App Store. Designed to help shoppers save on their favorite brands, it brings together exclusive vendor promotions, free coupon codes, and real-time shopping discounts into an intuitive, frictionless mobile experience."
        }
    };

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-details-modal');
        if (!btn) return;

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
    // 6. Contact Form Submission Handler (Formspree Integration)
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';

            // Reset inline status
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status';
                formStatus.innerHTML = '';
            }

            // Show loading state on button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch("https://formspree.io/f/mrpbqdzo", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success feedback
                    if (submitBtn) {
                        submitBtn.innerHTML = `<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>`;
                        submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                    }
                    if (formStatus) {
                        formStatus.style.display = 'block';
                        formStatus.style.background = 'rgba(16, 185, 129, 0.15)';
                        formStatus.style.border = '1px solid rgba(16, 185, 129, 0.4)';
                        formStatus.style.color = '#34D399';
                        formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent directly to my email.`;
                    }
                    showToast("Thank you! Your message has been sent successfully. I will get back to you soon.", "success");
                    contactForm.reset();

                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.style.background = '';
                            submitBtn.innerHTML = originalBtnContent;
                            submitBtn.disabled = false;
                        }
                    }, 4000);
                } else {
                    const data = await response.json().catch(() => null);
                    let errorMsg = "Oops! There was a problem submitting your message. Please try again.";
                    if (data && data.errors && data.errors.length > 0) {
                        errorMsg = data.errors.map(err => err.message).join(", ");
                    }
                    if (formStatus) {
                        formStatus.style.display = 'block';
                        formStatus.style.background = 'rgba(239, 68, 68, 0.15)';
                        formStatus.style.border = '1px solid rgba(239, 68, 68, 0.4)';
                        formStatus.style.color = '#F87171';
                        formStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${errorMsg}`;
                    }
                    showToast(errorMsg, "error");
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnContent;
                    }
                }
            } catch (error) {
                const netError = "Network error. Please check your internet connection and try again.";
                if (formStatus) {
                    formStatus.style.display = 'block';
                    formStatus.style.background = 'rgba(239, 68, 68, 0.15)';
                    formStatus.style.border = '1px solid rgba(239, 68, 68, 0.4)';
                    formStatus.style.color = '#F87171';
                    formStatus.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${netError}`;
                }
                showToast(netError, "error");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
            }
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
        
        let iconHtml = '<i class="fa-solid fa-circle-info" style="color: var(--flutter-cyan); font-size: 1.2rem;"></i>';
        if (type === 'success') {
            iconHtml = '<i class="fa-solid fa-circle-check" style="color: #34D399; font-size: 1.2rem;"></i>';
        } else if (type === 'error') {
            iconHtml = '<i class="fa-solid fa-circle-exclamation" style="color: #F87171; font-size: 1.2rem;"></i>';
        }

        toast.innerHTML = `
            ${iconHtml}
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // ----------------------------------------------------------------------
    // 8. Auto Update Footer Year
    // ----------------------------------------------------------------------
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});
