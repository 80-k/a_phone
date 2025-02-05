
const SoundSection = () => {
    const handleLearnMore = () => {
        const ele = document.querySelector('.display-section.wrapper')
        if (ele) {
            const elementTop = ele.getBoundingClientRect().top
            const offsetTop = elementTop + window.scrollY
            console.log(elementTop, window.scrollY)
            
            window.scrollTo({
                top: offsetTop,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="sound-section wrapper">
            <div className="body">
                <div className="sound-section-content content">
                    <h2 className="title">New Sound System</h2>
                    <p className="text">Teel the base.</p>
                    <span className="description">
                        From $41.62/mo. for 24 mo. or $999 before trade-in
                    </span>
                    <ul className="links">
                        <li><button className="button">Buy</button></li>
                        <li><a onClick={handleLearnMore} className="link">Learn more</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SoundSection;