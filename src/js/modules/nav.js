const nav = (() => {
    const selectors = {
        triggers: {
            menu: '.js-menu-main',
            menuButton: '.js-menu-button',
            overlay: '.js-menu-overlay',
        },
        state: {
            menuOpen: 'is-open',
            scrollingLocked: 'is-locked',
            animatingIn: 'is-animating-in',
            animatingOut: 'is-animating-out',
        },
    };
    let menuVisible = false;
    
    const menu = document.querySelector(selectors.triggers.menu);
    const menuButton = document.querySelector(selectors.triggers.menuButton);
    const overlay = document.querySelector(selectors.triggers.overlay);

    const clearAnimatingClasses = () => {
        setTimeout(() => {
            menu?.classList.remove(selectors.state.animatingIn, selectors.state.animatingOut);
            menuButton?.classList.remove(selectors.state.animatingIn, selectors.state.animatingOut);
            overlay?.classList.remove(selectors.state.animatingIn, selectors.state.animatingOut);
        }, 200);
    }

    const openMenu = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.classList.add(`is-locked`);
        menu?.classList.add(selectors.state.menuOpen, selectors.state.animatingIn);
        menuButton?.classList.add(selectors.state.menuOpen, selectors.state.animatingIn);
        overlay?.classList.add(selectors.state.menuOpen, selectors.state.animatingIn);
        menuButton.style.transform = window.scrollY < 10 ? `translateY(${ window.scrollY }px)` : '';
    }

    const closeMenu = () => {
        console.log('close menu');
        document.body.classList.remove(`is-locked`);
        window.scrollTo(0, parseInt(document.body.style.top || `0`) * -1);
        document.body.style.top = '';
        menu?.classList.add(selectors.state.animatingOut);
        menuButton?.classList.add(selectors.state.animatingOut);
        overlay?.classList.add(selectors.state.animatingOut);
        menu?.classList.remove(selectors.state.menuOpen);
        menuButton?.classList.remove(selectors.state.menuOpen);
        overlay?.classList.remove(selectors.state.menuOpen);
        menuButton.style.transform = '';
    }

    const toggleMenuStatus = () => {
        menuVisible = !menuVisible;
        if (menuVisible) {
            openMenu();  
        } else {
            closeMenu();
        }
        clearAnimatingClasses();
    }

    const handleEscape = (event) => {
        if (event.keyCode === 27) {
            toggleMenuStatus();
        }
    }

    const setEvents = () => {
        menuButton?.addEventListener(`click`, toggleMenuStatus);
        overlay?.addEventListener(`click`, toggleMenuStatus);
        document.addEventListener('keydown', handleEscape);
    }

    const init = () => {
        setEvents();
    }

    return {
        init,
    }
})();

export default nav;