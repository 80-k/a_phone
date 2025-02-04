import gsap from "gsap";
export const scrollAnimation = (position, target, isMobile, onUpdate) => {
    const tl = gsap.timeline();
    tl.to(position, {
        x: !isMobile ? -3.38 : -7.0,
        y: !isMobile ? -10.74 : -12.2,
        z: !isMobile ? -5.93 : -6.0,
        scrollTrigger: {
            trigger: '.sound-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 1,  // 2에서 1.5로 조정하여 더 부드럽게
            immediateRender: true,
            ease: "power1.inOut"  // 이징 추가
        },
        onUpdate
    })
    .to(target, {
        x: !isMobile ? 1.52 : 0.7,
        y: !isMobile ? 0.77 : 1.9,
        z: !isMobile ? -1.08 :0.7,
        scrollTrigger: {
            trigger: '.sound-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            immediateRender: true,
            ease: "power1.inOut"
        }
    })
    .to('.jumbotron-section', {
        opacity: 0,
        scrollTrigger: {
            trigger: '.sound-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            immediateRender: false
        }
    })
    .to('.sound-section-content', {
        opacity: 1,
        scrollTrigger: {
            trigger: '.sound-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            immediateRender: false
        }
    })
    .to(position, {
        x: !isMobile ? 1.56 : 9.36,
        y: !isMobile ? 5.0 : 10.95,
        z: !isMobile ? 0.01 : 0.09,
        scrollTrigger: {
            trigger: '.display-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            immediateRender: false,
            ease: "power1.inOut"
        },
        onUpdate
    })
    .to(target, {  // 문법 오류 수정
        x: !isMobile ? -0.55 : -1.62,
        y: !isMobile ? 0.32 : 0.02,
        z: !isMobile ? 0.0 : -0.06,
        scrollTrigger: {
            trigger: '.display-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            immediateRender: false,
            ease: "power1.inOut"
        },
        onUpdate
    })
    .to('.display-section', {
        opacity: 1,
        scrollTrigger: {
            trigger: '.display-section',
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            immediateRender: false
        }
    })
}