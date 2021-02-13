class Nav {
    constructor(options) {
        const selectors = {
            triggers: {
                menu: '.js-menu-main',
                menuButton: '.js-menu-button',
                themeDrawer: '.js-theme-drawer',
                themeDrawerButton: '.js-theme-button',
                themeDrawerCloseButton: '.js-theme-close-button',
                overlay: '.js-menu-overlay',
            },
            state: {
                menuOpen: 'is-open',
                scrollingLocked: 'is-locked',
                animatingIn: 'is-animating-in',
                animatingOut: 'is-animating-out',
            },
        };
        let menu, menuButton, themeDrawer, themeDrawerButton, themeDrawerCloseButton, overlay;

        let menuVisible = false;
        let themeDrawerVisible = false;

        const clearAnimatingClasses = () => {
            setTimeout(() => {
                menu?.classList.remove(selectors.state.animatingIn, selectors.state.animatingOut);
                themeDrawer?.classList.remove(selectors.state.animatingIn, selectors.state.animatingOut);
                menuButton?.classList.remove(selectors.state.animatingIn, selectors.state.animatingOut);
                themeDrawerButton?.classList.remove(selectors.state.animatingIn, selectors.state.animatingOut);
                overlay?.classList.remove(selectors.state.animatingIn, selectors.state.animatingOut);
            }, 200);
        };

        const openMenu = () => {
            document.body.style.top = `-${window.scrollY}px`;
            selectors.state?.scrollingLocked && document.body.classList.add(selectors.state.scrollingLocked);
            menu?.classList.add(selectors.state.menuOpen, selectors.state.animatingIn);
            menuButton?.classList.add(selectors.state.menuOpen, selectors.state.animatingIn);
            themeDrawerButton?.classList.add(selectors.state.menuOpen, selectors.state.animatingIn);
            overlay?.classList.add(selectors.state.menuOpen, selectors.state.animatingIn);
            menuButton.style.transform = window.scrollY < 10 ? `translateY(${ window.scrollY }px)` : '';
            themeDrawerButton.style.transform = window.scrollY < 10 ? `translateY(${ window.scrollY }px)` : '';
            themeDrawerVisible && toggleThemeDrawer();
        };

        const closeMenu = () => {
            selectors.state?.scrollingLocked && document.body.classList.remove(selectors.state.scrollingLocked);
            window.scrollTo(0, parseInt(document.body.style.top || `0`) * -1);
            document.body.style.top = '';
            menu?.classList.add(selectors.state.animatingOut);
            menuButton?.classList.add(selectors.state.animatingOut);
            themeDrawerButton?.classList.add(selectors.state.animatingOut);
            overlay?.classList.add(selectors.state.animatingOut);
            menu?.classList.remove(selectors.state.menuOpen);
            menuButton?.classList.remove(selectors.state.menuOpen);
            themeDrawerButton?.classList.remove(selectors.state.menuOpen);
            overlay?.classList.remove(selectors.state.menuOpen);
            menuButton.style.transform = '';
            themeDrawerButton.style.transform = '';
        };

        const openThemeDrawer = () => {
            themeDrawer?.classList.add(selectors.state.menuOpen, selectors.state.animatingIn);
            menuVisible && toggleMenuStatus();
            // window.scroll(0,0)
        };

        const closeThemeDrawer = () => {
            themeDrawer?.classList.add(selectors.state.animatingOut);
            themeDrawer?.classList.remove(selectors.state.menuOpen);
        };

        const toggleMenuStatus = () => {
            menuVisible = !menuVisible;
            if (menuVisible) {
                openMenu();  
            } else {
                closeMenu();
            }
            clearAnimatingClasses();
        };

        const toggleThemeDrawer = () => {
            themeDrawerVisible = !themeDrawerVisible;
            if (themeDrawerVisible) {
                openThemeDrawer();  
            } else {
                closeThemeDrawer();
            }
            clearAnimatingClasses();
        };

        const handleEscape = (event) => {
            if (menuVisible && event.keyCode === 27) {
                toggleMenuStatus();
            }
            if (themeDrawerVisible && event.keyCode === 27) {
                toggleThemeDrawer();
            }
        };

        const setEvents = () => {
            menuButton?.addEventListener(`click`, toggleMenuStatus);
            themeDrawerButton?.addEventListener(`click`, toggleThemeDrawer);
            themeDrawerCloseButton?.addEventListener(`click`, toggleThemeDrawer);
            overlay?.addEventListener(`click`, toggleMenuStatus);
            document.addEventListener('keydown', handleEscape);
        };

        const init = () => {
            menu = document.querySelector(selectors.triggers.menu);
            menuButton = document.querySelector(selectors.triggers.menuButton);
            themeDrawer = document.querySelector(selectors.triggers.themeDrawer);
            themeDrawerButton = document.querySelector(selectors.triggers.themeDrawerButton);
            themeDrawerCloseButton = document.querySelector(selectors.triggers.themeDrawerCloseButton);
            overlay = document.querySelector(selectors.triggers.overlay);

            setEvents();
        };

        init(options);
    }
}

export default Nav;