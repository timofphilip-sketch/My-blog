(function () {
            const nav = document.querySelector('.nav-list');
            const items = [...document.querySelectorAll('.nav-list a')];
            const indicator = document.querySelector('.indicator');
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.getElementById('primaryNav');

            function updateIndicator(el) {
                if (!el) return indicator.style.transform = 'translateX(-9999px)';
                const rect = el.getBoundingClientRect();
                const parentRect = nav.getBoundingClientRect();
                const left = rect.left - parentRect.left + (rect.width - Math.max(48, rect.width)) / 2;
                indicator.style.width = Math.max(48, rect.width) + 'px';
                indicator.style.transform = 'translateX(' + (rect.left - parentRect.left) + 'px)';
            }

            items.forEach(a => {
                a.addEventListener('click', e => {
                    e.preventDefault();
                    items.forEach(i => i.classList.remove('active'));
                    a.classList.add('active');
                    updateIndicator(a);
                    const target = document.querySelector(a.getAttribute('href'));
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (nav.classList.contains('open')) nav.classList.remove('open');
                });
                a.addEventListener('mouseenter', () => updateIndicator(a));
            });

            document.addEventListener('click', e => {
                if (!nav.contains(e.target) && !e.target.closest('.hamburger')) updateIndicator();
            });

            window.addEventListener('load', () => {
                const first = items[0];
                updateIndicator(first);
            });

            hamburger.addEventListener('click', () => {
                const open = nav.classList.toggle('open');
                hamburger.setAttribute('aria-expanded', String(open));
            });
        })();