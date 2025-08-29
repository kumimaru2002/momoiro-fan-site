// ローディング画面の制御
(function() {
    // ランダムローディング画像の設定（軽量化WebP版）
    const loadingImages = [
        'assets/drthdfh (1) (1).webp',
        'assets/ｆｔｔｆｌ (1).webp',
        'assets/futfu (1).webp',
        'assets/hul.gh (2).webp'
    ];
    
    // DOMが準備完了次第実行
    function initLoading() {
        const loadingCharacter = document.querySelector('.loading-character');
        
        // 初期画像を設定
        if (loadingCharacter) {
            loadingCharacter.src = loadingImages[Math.floor(Math.random() * loadingImages.length)];
        }
        
        // 0.4秒ごとに画像を切り替え
        const imageInterval = setInterval(function() {
            if (loadingCharacter) {
                const randomIndex = Math.floor(Math.random() * loadingImages.length);
                loadingCharacter.src = loadingImages[randomIndex];
            }
        }, 400);
        
        // 最小2秒間はローディング画面を表示
        setTimeout(function() {
            clearInterval(imageInterval); // 画像切り替えを停止
            
            const loadingScreen = document.getElementById('loading');
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                
                // フェードアウト完了後に要素を削除
                setTimeout(function() {
                    loadingScreen.remove();
                }, 500);
            }
        }, 2000);
    }
    
    // DOM準備完了を待つ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoading);
    } else {
        initLoading();
    }
})();

// スムーススクロールの実装
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーのスクロール効果
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ヘッダーのスクロール効果とアクティブリンク更新を統合
    let ticking = false;
    
    function updateOnScroll() {
        // ヘッダーの透明度変更
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // アクティブリンクの更新
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // ヘッダーナビゲーションのスムーススクロール
    const headerNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
    headerNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // 背景動画の設定
    const bgVideo = document.querySelector('.bg-video');
    if (bgVideo) {
        // 動画の属性を確実に設定
        bgVideo.muted = true;
        bgVideo.loop = true;
        bgVideo.autoplay = true;
        bgVideo.playsinline = true;
        
        // 動画の再生を確実にする
        bgVideo.play().catch(function(error) {
            console.log('動画の自動再生に失敗しました:', error);
            // フォールバック: ユーザーインタラクション後に再生
            document.addEventListener('click', function() {
                bgVideo.play();
            }, { once: true });
        });
        
        // 動画が読み込まれたら再生
        bgVideo.addEventListener('loadeddata', function() {
            this.play();
        });
    }
    // スクロールダウンボタンのクリックイベント
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // フッターナビゲーションリンクのスムーススクロール
    const footerNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    footerNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロール時のアニメーション効果
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('.about-content, .profile-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // YouTube動画アイテムのスクロールアニメーション
    const youtubeItems = document.querySelectorAll('.youtube-item');
    const youtubeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    youtubeItems.forEach(item => {
        youtubeObserver.observe(item);
    });

    // ソーシャルボタンのクリックイベント
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 実際のリンクがある場合はここで処理
            console.log('Social button clicked:', this.className);
            
            // アニメーション効果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // キャラクター画像のホバー効果
    const characterImage = document.querySelector('.character-image');
    if (characterImage) {
        let isAnimating = false;
        
        characterImage.addEventListener('mouseenter', function() {
            if (!isAnimating) {
                isAnimating = true;
                this.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    this.style.transform = '';
                    isAnimating = false;
                }, 300);
            }
        });
    }

    // プロフィール画像のクリック効果
    const profileImage = document.querySelector('.profile-img');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }

    // パーティクル効果（簡単な星のアニメーション）
    function createStar() {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.position = 'fixed';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = '-50px';
        star.style.fontSize = Math.random() * 20 + 10 + 'px';
        star.style.color = '#ff9ec7';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '1000';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        document.body.appendChild(star);
        
        const duration = Math.random() * 3000 + 2000;
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                star.style.top = (progress * (window.innerHeight + 100) - 50) + 'px';
                star.style.transform = `rotate(${progress * 360}deg)`;
                requestAnimationFrame(animate);
            } else {
                star.remove();
            }
        }
        
        animate();
    }

    // 5秒に1回星を生成
    setInterval(createStar, 5000);

    // ページ読み込み完了時のウェルカムアニメーション
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle && heroSubtitle) {
            heroTitle.style.animation = 'pulse 2s ease-in-out';
            heroSubtitle.style.animation = 'fadeIn 2s ease-in-out';
        }
    }, 500);

    // CTAボタンのクリック効果
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // リップル効果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(233, 30, 99, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// CSS keyframes をJSで追加
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// スクロール位置に応じたヘッダー風の効果（将来的な拡張用）
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール方向の検出
    if (scrollTop > lastScrollTop) {
        // 下にスクロール
    } else {
        // 上にスクロール
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);