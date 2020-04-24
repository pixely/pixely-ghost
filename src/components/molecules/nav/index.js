import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import GenericNav from './genericNav'

import './_nav.scss'

const Nav = ({ className, navItems }) => {
    const [menuActive, setMenu] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)

    const handleEscape = useCallback((event) => {
        if (event.keyCode === 27) {
            setMenu(false)
        }
    }, [])

    const setMenuStatus = (status) => {
        setMenuVisible(status)
        if (!status) {
            setTimeout(() => setMenu(false), 300)
        } else {
            setMenu(status)
        }
    }

    useEffect(() => {
        document.addEventListener(`keydown`, handleEscape, false)

        return () => {
            document.removeEventListener(`keydown`, handleEscape, false)
        }
    }, [])

    useEffect(() => {
        menuVisible && document.body.classList.add(`is-locked`)

        return () => {
            document.body.classList.remove(`is-locked`)
        }
    }, [menuVisible])

    const buttonOffset = () => {
        let offset = null
        if (menuActive && window.scrollY < 10) {
            offset = { transform: `translateY(${ window.scrollY }px)` }
        }
        return offset
    }

    return (
        <>
            <button
                className={`${className ? `${className} ` : ``}nav${menuVisible ? ` is-open` : ``}`}
                onClick={() => setMenuStatus(!menuActive)}
                aria-label="Open main menu"
                style={buttonOffset()}
            >
                <span className="nav__icon-bar"></span>
                <span className="nav__icon-bar"></span>
                <span className="nav__icon-bar"></span>
                <span className="nav__icon-bar"></span>
            </button>
            {menuActive && <div key="oa" className={`nav__overlay ${menuVisible ? `is-open` : ``}`} onClick={() => setMenuStatus(!menuActive)} /> }
            {menuActive && <nav key="ob" className={`nav__menu ${menuVisible ? `is-open` : ``}`}>
                <GenericNav navItems={navItems} navClass="nav__menu-item" />
            </nav>
            }
        </>
    )
}

Nav.defaultProps = {
    className: null,
}

Nav.propTypes = {
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    className: PropTypes.string,
}

export default Nav
