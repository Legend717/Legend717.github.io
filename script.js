// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initLanguageToggle();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
    initSmoothScrolling();
    initTypingEffect();
    initParallaxEffect();
    initSkillsAnimation();
    initProjectCardsEffect();
    initLazyLoading();
    initPreloader();
    // Initialize post detail page if present
    if (typeof initPostPage === 'function') {
        initPostPage();
    }
    // Initialize auto abstracts on homepage Thought cards
    if (typeof initThoughtsAbstracts === 'function') {
        initThoughtsAbstracts();
    }
});

// Update navbar shadow based on scroll position
function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.classList.add('scrolled');
    } else {
        navbar.style.boxShadow = 'none';
        navbar.classList.remove('scrolled');
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    updateNavbarBackground();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        updateNavbarBackground();
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme, icon);

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, icon);
        
        // Update navbar background immediately after theme change
        updateNavbarBackground();
    });
}

function updateThemeIcon(theme, icon) {
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Language toggle and i18n
function initLanguageToggle() {
    const toggleContainer = document.getElementById('language-toggle');
    if (!toggleContainer) return;

    const buttons = toggleContainer.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('lang') || 'zh';

    setLanguage(savedLang);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            // Save first, then update UI so downstream code reads the latest language
            localStorage.setItem('lang', lang);
            setLanguage(lang);
        });
    });
}

const translations = {
    zh: {
        'page.title': 'Xingping Chen (Legend) - 个人主页',
        'nav.home': '首页',
        'nav.about': '关于我',
        'nav.portfolio': '作品集',
        'nav.projects': '项目',
        'nav.thoughts': '碎碎念',
        'nav.languageAria': '切换语言',

        'hero.description': '中山大学计算机学院学生 | 信息与计算数学专业',
        'hero.tagline': '探索具身智能的无限可能',
        'hero.contactBtn': '联系我',
        'hero.moreBtn': '了解更多',

        'about.title': '关于我',
        'about.subtitle': '个人简介',
        'about.p1': '现为中山大学计算机学院信息与计算数学专业的学生。',
        'about.p2': '对前沿领域的研究充满热情，特别是在具身智能、量子计算、CV和大语言模型等前沿方向。',
        'about.p3': '研究兴趣集中在赋予机器人更强大的感知和交互能力，打造统一视觉-语言-动作的模型。',
        'about.p4': '想要打造出机器人的眼睛和大脑，实现更智能、更自然的交互。',
        'about.tagLabel': '标签',
        'about.education': '教育背景',
        'about.schoolName': '中山大学',
        'about.schoolInfo': '计算机学院 · 信息与计算数学专业',
        'about.degree': '本科生',

        'skills.cv': '计算机视觉',
        'skills.ml': '机器学习',
        'skills.qc': '量子计算',
        'skills.eai': '具身智能',
        'skills.unity': 'Unity（C#）',

        'portfolio.title': '作品集',
        'portfolio.papers': '学术论文',
        'portfolio.paper1.desc': '发表于CCF-SB的TEST会议',
        'portfolio.techSharing': '技术分享',
        'portfolio.talk1.desc': '技术分享会演讲',

        'projects.title': '项目展示',
        'projects.vr.title': '基于VR手柄的机器人遥操作系统',
        'projects.vr.desc': '开发一个基于VR手柄的机器人遥操作系统，实现用户通过VR手柄控制机器人进行操作，进而辅助采集数据。',

        'thoughts.title': '碎碎念',
        'thoughts.vla.title': '关于具身智能(VLA)',
        'thoughts.vla.date': '2024年10月',
        'thoughts.vla.p1': '在我整个大学阶段，人工智能领域经历了关键的技术跃迁。从GPT-3的发布到大模型的广泛落地，我见证了AI从理解到推理的演进过程。',
        'thoughts.vla.p2': '然而，当前技术仍存在关键短板：机器人尚未具备人类式的多模态环境感知与物理交互能力。真正的具身智能需要融合视觉信息与人类指令，做出精准且可泛化的物理动作(Vision-Language-Action)。',
        'thoughts.vla.p3': '我渴望为机器人构建更强大的"眼睛-大脑"，使其能够真正感知并理解物理环境，实现与世界的深层、有效互动。',
        'thoughts.vla.tag1': '具身智能',
        'thoughts.vla.tag2': 'VLA',
        'thoughts.vla.tag3': '多模态',
        'thoughts.llm.title': 'pi 系列论文笔记',
        'thoughts.llm.date': '2024年9月',
        'thoughts.llm.p1': '大语言模型的发展让我们看到了通用人工智能的曙光。从最初的文本生成，到现在的推理、规划、工具使用，LLM正在成为连接人类意图与机器执行的桥梁。',
        'thoughts.llm.p2': '特别是在多模态融合方面，视觉-语言模型的出现为具身智能提供了重要的认知基础。如何让LLM更好地理解物理世界，并指导机器人的行为，是我关注的重点方向。',
        'thoughts.llm.tag1': 'LLM',
        'thoughts.llm.tag2': '多模态',
        'thoughts.llm.tag3': '认知智能',
        'thoughts.readMore': '阅读全文',
        'thoughts.detail.title': '碎碎念详情',
        'thoughts.detail.back': '返回',
        'thoughts.detail.loading': '正在加载内容…',
        'thoughts.detail.errorFetch': '加载失败，请稍后重试。',
        'thoughts.detail.contentAria': '碎碎念详情内容',

        'footer.researchTitle': '研究兴趣',
        'footer.quickLinks': '快速链接',
        'footer.tag.eai': '具身智能',
        'footer.tag.qc': '量子计算',
        'footer.tag.cv': '计算机视觉',
        'footer.tag.llm': '大语言模型',
        'footer.emailTitle': '邮箱',
        'footer.builtWith': '使用 ❤️ 构建：HTML、CSS 和 JavaScript',
        'footer.copyright': '© 2025 Legend. 保留所有权利。',
        'common.year2025': '2025年'
    },
    en: {
        'page.title': "Xingping Chen (Legend) - Personal Homepage",
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.portfolio': 'Portfolio',
        'nav.projects': 'Projects',
        'nav.thoughts': 'Thoughts',
        'nav.languageAria': 'Language Toggle',

        'hero.description': 'Student at Sun Yat-sen University | Computer Science',
        'hero.tagline': 'Exploring the potential of Embodied Intelligence',
        'hero.contactBtn': 'Contact',
        'hero.moreBtn': 'Learn More',

        'about.title': 'About Me',
        'about.subtitle': 'Profile',
        'about.p1': 'Currently a student in Information and Computational Mathematics at the School of Computer Science, Sun Yat-sen University.',
        'about.p2': 'Passionate about research in cutting-edge areas, especially Embodied Intelligence, Quantum Computing, Computer Vision, and Large Language Models.',
        'about.p3': 'Focused on building robots with stronger perception and interaction abilities, aiming for unified vision-language-action models.',
        'about.p4': 'Aspire to build robots’ “eyes and brain” for more intelligent and natural interaction.',
        'about.tagLabel': 'Tags',
        'about.education': 'Education',
        'about.schoolName': 'Sun Yat-sen University',
        'about.schoolInfo': 'School of Computer Science · Information and Computational Mathematics',
        'about.degree': 'Undergraduate',

        'skills.cv': 'Computer Vision',
        'skills.ml': 'Machine Learning',
        'skills.qc': 'Quantum Computing',
        'skills.eai': 'Embodied AI',
        'skills.unity': 'Unity (C#)',

        'portfolio.title': 'Portfolio',
        'portfolio.papers': 'Academic Papers',
        'portfolio.paper1.desc': 'Published at the TEST conference (CCF-SB)',
        'portfolio.techSharing': 'Tech Talks',
        'portfolio.talk1.desc': 'Talk at a tech sharing session',

        'projects.title': 'Projects',
        'projects.vr.title': 'Robot Teleoperation System based on VR Controllers',
        'projects.vr.desc': 'Develop a robot teleoperation system using VR controllers, enabling users to control robots and assist data collection.',

        'thoughts.title': 'Thoughts',
        'thoughts.vla.title': 'On Embodied Intelligence (VLA)',
        'thoughts.vla.date': 'Oct 2024',
        'thoughts.vla.p1': 'During my university years, AI has undergone key leaps. From GPT-3 to widespread deployment of large models, I’ve witnessed the evolution from understanding to reasoning.',
        'thoughts.vla.p2': 'However, there are still gaps: robots lack human-like multimodal perception and physical interaction. True embodied intelligence requires integrating vision with human instructions to produce precise, generalizable actions (Vision-Language-Action).',
        'thoughts.vla.p3': 'I aim to build robots’ “eyes and brain” to truly perceive and understand the physical world for deep, effective interaction.',
        'thoughts.vla.tag1': 'Embodied AI',
        'thoughts.vla.tag2': 'VLA',
        'thoughts.vla.tag3': 'Multimodal',
        'thoughts.llm.title': 'Notes on pi series papers',
        'thoughts.llm.date': 'Sep 2024',
        'thoughts.llm.p1': 'The development of LLMs brings the dawn of AGI. From text generation to reasoning, planning, and tool use, LLMs are becoming the bridge between human intent and machine execution.',
        'thoughts.llm.p2': 'Especially in multimodal integration, the emergence of vision-language models provides important cognitive foundations for embodied intelligence. How to enable LLMs to better understand the physical world and guide robot behavior is a key focus of mine.',
        'thoughts.llm.tag1': 'LLM',
        'thoughts.llm.tag2': 'Multimodal',
        'thoughts.llm.tag3': 'Cognitive Intelligence',
        'thoughts.readMore': 'Read More',
        'thoughts.detail.title': 'Thoughts Detail',
        'thoughts.detail.back': 'Back',
        'thoughts.detail.loading': 'Loading content…',
        'thoughts.detail.errorFetch': 'Failed to load. Please try again later.',
        'thoughts.detail.contentAria': 'Thoughts detail content',

        'footer.researchTitle': 'Research Interests',
        'footer.quickLinks': 'Quick Links',
        'footer.tag.eai': 'Embodied AI',
        'footer.tag.qc': 'Quantum Computing',
        'footer.tag.cv': 'Computer Vision',
        'footer.tag.llm': 'Large Language Models',
        'footer.emailTitle': 'Email',
        'footer.builtWith': 'Built with ❤️ using HTML, CSS & JavaScript',
        'footer.copyright': '© 2025 Legend. All rights reserved.',
        'common.year2025': '2025'
    }
};

function setLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    applyTranslations(lang);

    // Update toggle button active state
    const toggleContainer = document.getElementById('language-toggle');
    if (toggleContainer) {
        toggleContainer.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    // Update document title
    const titleKey = 'page.title';
    if (translations[lang] && translations[lang][titleKey]) {
        document.title = translations[lang][titleKey];
    }

    // Re-initialize dynamic content that depends on language
    try {
        if (window.PersonalWebsite) {
            if (typeof window.PersonalWebsite.initThoughtsAbstracts === 'function') {
                window.PersonalWebsite.initThoughtsAbstracts();
            }
            if (typeof window.PersonalWebsite.initPostPage === 'function') {
                window.PersonalWebsite.initPostPage();
            }
        }
    } catch (e) {
        console.warn('Re-initializing thoughts abstracts failed:', e);
    }
}

function applyTranslations(lang) {
    const dict = translations[lang] || {};
    // Text content translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.textContent = dict[key];
        }
    });

    // Attribute translations, e.g., data-i18n-attr="title:footer.emailTitle"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const attrSpec = el.getAttribute('data-i18n-attr');
        if (!attrSpec) return;
        attrSpec.split(';').forEach(pair => {
            const parts = pair.split(':');
            if (parts.length === 2) {
                const attrName = parts[0].trim();
                const key = parts[1].trim();
                const value = dict[key];
                if (value !== undefined) {
                    el.setAttribute(attrName, value);
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.hero-content, .about-content, .skills-category, .project-card, .portfolio-item, .thought-card, .contact-item');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) {
        console.warn('Back to top button not found');
        return;
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form functionality (deprecated - form moved to footer)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    // Only initialize if contact form exists
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.innerHTML = '<span class="loading"></span> 发送中...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                contactForm.reset();
                showNotification('消息发送成功！我会尽快回复您。', 'success');
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#2ECC71';
            break;
        case 'error':
            notification.style.background = '#E74C3C';
            break;
        default:
            notification.style.background = '#4A90E2';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const heroTagline = document.querySelector('.hero-tagline');
    if (!heroTagline) return;
    
    const text = heroTagline.textContent;
    heroTagline.textContent = '';
    
    let index = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (index < text.length) {
            heroTagline.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Add blinking cursor effect
            heroTagline.innerHTML += '<span class="cursor">|</span>';
            
            // Add cursor blinking animation
            const cursor = heroTagline.querySelector('.cursor');
            if (cursor) {
                cursor.style.cssText = `
                    animation: blink 1s infinite;
                `;
                
                // Add blink keyframes if not already added
                if (!document.querySelector('#blink-keyframes')) {
                    const style = document.createElement('style');
                    style.id = 'blink-keyframes';
                    style.textContent = `
                        @keyframes blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Skills animation
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });
}

// Project cards hover effect
function initProjectCardsEffect() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize additional effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Additional effects are now initialized in the main DOMContentLoaded event
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent functions can be called here
}, 16)); // ~60fps

// Preloader (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loading"></div>
            <p>Loading...</p>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
}

// Initialize preloader
// initPreloader();

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Utility function for adding event listeners safely
function safeAddEventListener(element, event, handler) {
    if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
    }
}

// -------- Thoughts Abstract Auto Extraction --------
function fetchFirstAvailableMarkdown(paths) {
    return new Promise((resolve, reject) => {
        const tryNext = (i) => {
            if (i >= paths.length) return reject(new Error('NOT_FOUND'));
            fetch(paths[i], { cache: 'no-store' })
                .then(r => { if (!r.ok) throw new Error('NOT_FOUND'); return r.text(); })
                .then(resolve)
                .catch(() => tryNext(i + 1));
        };
        tryNext(0);
    });
}

// Fetch the first available file among given candidates and return both content and the resolved path
function fetchFirstAvailableFile(paths) {
    return new Promise((resolve, reject) => {
        const tryNext = (i) => {
            if (i >= paths.length) return reject(new Error('NOT_FOUND'));
            fetch(paths[i], { cache: 'no-store' })
                .then(r => { if (!r.ok) throw new Error('NOT_FOUND'); return r.text().then(text => resolve({ text, path: paths[i] })); })
                .catch(() => tryNext(i + 1));
        };
        tryNext(0);
    });
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function parseFrontMatter(md) {
    const fmMatch = md.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) return {};
    const fmText = fmMatch[1];
    const fm = {};
    const lines = fmText.split(/\n/);
    let currentKey = null;
    lines.forEach(line => {
        const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_\-]*):\s*(.*)$/);
        if (m) {
            currentKey = m[1];
            const value = m[2].trim();
            if (/^\[.*\]$/.test(value)) {
                // YAML array inline: [a, b]
                fm[currentKey] = value
                    .slice(1, -1)
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
            } else if (value) {
                fm[currentKey] = value;
            } else {
                fm[currentKey] = [];
            }
        } else if (currentKey && /^-\s+/.test(line)) {
            // YAML list style: - item
            const arr = Array.isArray(fm[currentKey]) ? fm[currentKey] : (fm[currentKey] ? [fm[currentKey]] : []);
            arr.push(line.replace(/^-\s+/, '').trim());
            fm[currentKey] = arr;
        }
    });
    return fm;
}

// Parse embedded JSON front-matter from generated HTML
function parseFrontMatterFromHtml(container) {
    try {
        const el = container.querySelector('script[data-front-matter]');
        if (!el) return null;
        const jsonText = (el.textContent || '').trim();
        if (!jsonText) return null;
        return JSON.parse(jsonText);
    } catch (e) {
        return null;
    }
}

function extractSummaryFromMarkdown(md, maxParas = 2) {
    // Strip YAML Front-Matter if present
    md = md.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();
    // Remove the first heading and blockquotes and code blocks
    md = md.replace(/^#\s+.*$/m, '').trim();
    let inCode = false;
    const filtered = [];
    for (const line of md.split('\n')) {
        const t = line.trim();
        if (t.startsWith('```')) { inCode = !inCode; continue; }
        if (inCode) continue;
        if (/^#{1,6}\s/.test(t)) continue; // headings
        if (/^>\s?/.test(t)) continue;     // blockquotes (e.g., update date)
        filtered.push(line);
    }
    const text = filtered.join('\n').trim();
    const paras = text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean).slice(0, maxParas);
    return paras.map(s => `<p>${escapeHtml(s)}</p>`).join('');
}

// Extract summary from generated HTML: remove title, blockquote and code blocks, then take first paragraphs
function extractSummaryFromHtml(container, maxParas = 2) {
    const temp = container.cloneNode(true);
    temp.querySelectorAll('h1, blockquote, pre, code').forEach(el => el.remove());
    const paras = Array.from(temp.querySelectorAll('p'))
        .map(p => p.innerHTML.trim())
        .filter(Boolean)
        .slice(0, maxParas);
    if (!paras.length) return '';
    return paras.map(html => `<p>${html}</p>`).join('');
}

function initThoughtsAbstracts() {
    const cards = document.querySelectorAll('.thought-card');
    if (!cards.length) return;
    const lang = localStorage.getItem('lang') || 'zh';
    cards.forEach(card => {
        const link = card.querySelector('.thought-title-link');
        const contentEl = card.querySelector('.thought-content');
        if (!link || !contentEl) return;
        const href = link.getAttribute('href') || '';
        let slug = null;
        try {
            const u = new URL(href, window.location.origin);
            slug = u.searchParams.get('p');
        } catch (e) {
            const m = href.match(/[?&]p=([^&]+)/);
            slug = m && m[1];
        }
        if (!slug) return;
        const candidates = [
            `blog/${slug}.${lang}.html`,
            `blog/${slug}.html`,
            `blog/${slug}.${lang}.md`,
            `blog/${slug}.md`
        ];
        fetchFirstAvailableFile(candidates)
            .then(({ text, path }) => {
                const isHtml = /\.html$/i.test(path);
                if (isHtml) {
                    const container = document.createElement('div');
                    container.innerHTML = text;

                    // Title
                    const firstH1 = container.querySelector('h1');
                    if (firstH1 && link) link.textContent = firstH1.textContent.trim();

                    // Date
                    const dateEl = card.querySelector('.thought-date');
                    const firstQuote = container.querySelector('blockquote');
                    if (dateEl && firstQuote) dateEl.textContent = firstQuote.textContent.trim();

                    // Tags via front-matter JSON if available
                    const fm = parseFrontMatterFromHtml(container);
                    const tagsEl = card.querySelector('.thought-tags');
                    if (tagsEl && fm) {
                        let tags = null;
                        if (lang === 'zh' && Array.isArray(fm.tags_zh)) tags = fm.tags_zh;
                        else if (lang === 'en' && Array.isArray(fm.tags_en)) tags = fm.tags_en;
                        else if (Array.isArray(fm.tags)) tags = fm.tags;
                        if (tags && tags.length) {
                            tagsEl.innerHTML = tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
                        }
                    }

                    const summaryHtml = extractSummaryFromHtml(container, 1);
                    if (summaryHtml) contentEl.innerHTML = summaryHtml;
                } else {
                    const md = text;
                    // Title
                    const titleMatch = md.match(/^#\s+(.+)$/m);
                    if (titleMatch && link) link.textContent = titleMatch[1].trim();

                    // Date
                    const dateEl = card.querySelector('.thought-date');
                    const quoteLineMatch = md.match(/^>\s*(.+)$/m);
                    if (dateEl && quoteLineMatch) dateEl.textContent = quoteLineMatch[1].trim();

                    // Tags via front matter from markdown
                    const fm = parseFrontMatter(md);
                    const tagsEl = card.querySelector('.thought-tags');
                    let tags = null;
                    if (lang === 'zh' && Array.isArray(fm.tags_zh)) tags = fm.tags_zh;
                    else if (lang === 'en' && Array.isArray(fm.tags_en)) tags = fm.tags_en;
                    else if (Array.isArray(fm.tags)) tags = fm.tags;
                    if (tagsEl && tags && tags.length) {
                        tagsEl.innerHTML = tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
                    }

                    const summaryHtml = extractSummaryFromMarkdown(md, 1);
                    if (summaryHtml) contentEl.innerHTML = summaryHtml;
                }
            })
            .catch(() => { /* keep existing content if fetch fails */ });
    });
}

// Post detail page initializer
function initPostPage() {
    const contentEl = document.getElementById('post-content');
    if (!contentEl) return; // Only run on post.html

    const lang = localStorage.getItem('lang') || 'zh';
    const params = new URLSearchParams(window.location.search);
    const mdParam = params.get('md');
    const pParam = params.get('p');
    let candidates = [];
    if (mdParam) {
        const base = mdParam.startsWith('blog/') ? mdParam : `blog/${mdParam}`;
        // Allow direct .html or .md via mdParam
        candidates = [base];
    } else if (pParam) {
        candidates = [
            `blog/${pParam}.${lang}.html`,
            `blog/${pParam}.html`,
            `blog/${pParam}.${lang}.md`,
            `blog/${pParam}.md`
        ];
    } else {
        candidates = [
            `blog/vla.${lang}.html`,
            'blog/vla.html',
            `blog/vla.${lang}.md`,
            'blog/vla.md'
        ];
    }

    contentEl.innerHTML = `<p data-i18n="thoughts.detail.loading">${(translations[lang] && translations[lang]['thoughts.detail.loading']) || 'Loading...'}</p>`;
    applyTranslations(lang);

    fetchFirstAvailableFile(candidates)
        .then(({ text, path }) => {
            const isHtml = /\.html$/i.test(path);
            if (isHtml) {
                // Parse HTML and extract title/date, then render the body
                const temp = document.createElement('div');
                temp.innerHTML = text;

                const titleEl = document.getElementById('post-title');
                const firstH1 = temp.querySelector('h1');
                if (titleEl && firstH1) {
                    titleEl.textContent = firstH1.textContent.trim();
                    firstH1.remove();
                }

                const dateEl = document.getElementById('post-date');
                const firstQuote = temp.querySelector('blockquote');
                if (dateEl) {
                    dateEl.textContent = firstQuote ? firstQuote.textContent.trim() : '';
                    if (firstQuote) firstQuote.remove();
                }

                // Remove embedded front-matter JSON block if present
                const fmEl = temp.querySelector('script[data-front-matter]');
                if (fmEl) fmEl.remove();

                contentEl.innerHTML = temp.innerHTML;
            } else {
                // Markdown path: keep existing behavior
                const md = text;
                const titleMatch = md.match(/^#\s+(.+)$/m);
                const titleText = titleMatch ? titleMatch[1].trim() : null;
                const titleEl = document.getElementById('post-title');
                if (titleEl && titleText) {
                    titleEl.textContent = titleText;
                }

                // Extract first blockquote first line as update date
                const quoteLineMatch = md.match(/^>\s*(.+)$/m);
                const dateEl = document.getElementById('post-date');
                if (dateEl) {
                    dateEl.textContent = quoteLineMatch ? quoteLineMatch[1].trim() : '';
                }

                // Remove the first heading from content to avoid duplicate title
                let bodyMd = md;
                if (titleMatch) {
                    bodyMd = md.replace(titleMatch[0], '').trimStart();
                }

                // Remove the first blockquote (contiguous lines starting with ">") from body
                {
                    const lines = bodyMd.split('\n');
                    const start = lines.findIndex(line => line.trim().startsWith('>'));
                    if (start !== -1) {
                        let end = start;
                        while (end < lines.length && lines[end].trim().startsWith('>')) end++;
                        lines.splice(start, end - start);
                        bodyMd = lines.join('\n').trimStart();
                    }
                }

                // Strip YAML Front-Matter before rendering
                bodyMd = bodyMd.replace(/^---\n[\s\S]*?\n---\n?/, '').trimStart();

                if (window.marked && typeof marked.parse === 'function') {
                    contentEl.innerHTML = marked.parse(bodyMd);
                } else {
                    // Fallback: plain text
                    const pre = document.createElement('pre');
                    pre.textContent = bodyMd;
                    contentEl.innerHTML = '';
                    contentEl.appendChild(pre);
                }
            }

            applyTranslations(lang);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
            console.error('Error loading markdown:', err);
            contentEl.innerHTML = `<p class="error" data-i18n="thoughts.detail.errorFetch">${(translations[lang] && translations[lang]['thoughts.detail.errorFetch']) || 'Failed to load.'}</p>`;
            applyTranslations(lang);
        });
}

// Console welcome message
console.log(`
🎉 Welcome to Xingping Chen's Personal Homepage!
🚀 Built with HTML, CSS, and JavaScript
💡 Interested in collaboration? Contact: chenxp68@mail2.sysu.edu.cn
`);

// Export functions for potential external use
window.PersonalWebsite = {
    showNotification,
    initThemeToggle,
    initScrollAnimations,
    initPostPage,
    initThoughtsAbstracts
};