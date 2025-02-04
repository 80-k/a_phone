import { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck,
} from 'webgi'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger)

const WebGiViewer = forwardRef((props, ref) => {
    const phonePath = 'scene-black.glb'
    const canvasRef = useRef(null)
    const [viewerRef, setViewerRef] = useState(null)
    const [targetRef, setTargetRef] = useState(null)
    const [cameraRef, setCameraRef] = useState(null)
    const [positionRef, setPositionRef] = useState(null)
    const [previewMode, setPreviewMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const canvasContainerRef = useRef(null);

    useImperativeHandle(ref, ()=>({
        triggerPreview(){
            setPreviewMode(true)
            canvasContainerRef.current.style.pointerEvents = 'all';
            document.body.style.overflow = 'hidden';
            props.contentRef.current.style.opacity = 0;
            

            gsap.to(positionRef, {
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty();
                    cameraRef.positionTargetUpdated(true);
                }
            })

            gsap.to(targetRef, {x: 0.11, y: 0.0, z: 0.0, duration: 2});

            viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true })
        }
    }))

    const memoScrollAnimation = useCallback((position, target, isMobile, onUpdate)=>{
        if (position && target && onUpdate){
            scrollAnimation(position, target, isMobile, onUpdate)
        }
    }, [])

    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({
            canvas: canvasRef.current
        })

        const isMobileOrTablet = mobileAndTabletCheck();
        setIsMobile(isMobileOrTablet)

        const manager = await viewer.addPlugin(AssetManagerPlugin)

        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;

        setViewerRef(viewer)
        setCameraRef(camera)
        setPositionRef(position)
        setTargetRef(target)

        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)

        viewer.renderer.refreshPipeline()
        await manager.addFromPath(phonePath)

        viewer.getPlugin(TonemapPlugin).config.clipBackground = true
        viewer.scene.activeCamera.setCameraOptions({
            controlsEnabled: false
        })


        if (isMobileOrTablet){
            position.set(-16.7, 1.17, 11.7);
            target.set(0, 1.37, 0)
            props.contentRef.current.className = 'mobile-or-tablet';
        }

        window.scrollTo(0, 0)

        let needsUpdate = true;
        const onUpdate = () => {
            needsUpdate = true;
            viewer.setDirty();
        }

        viewer.addEventListener('preFrame', () => {
            if (needsUpdate){
                camera.positionTargetUpdated(true);
                needsUpdate = false;
            }
        })

        memoScrollAnimation(position, target, isMobileOrTablet, onUpdate)

    }, [])

    useEffect(()=>{
        setupViewer();
    }, [])

    const handleExit = useCallback(() => {
        setPreviewMode(false)
        document.body.style.overflow = 'auto';
        canvasContainerRef.current.style.pointerEvents = 'none';
        props.contentRef.current.style.opacity = '1';
        viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false })

        gsap.to(positionRef, {
            x: !isMobile ? 1.56 : 9.36,
            y: !isMobile ? 5.0 :  10.95,
            z: !isMobile ? 0.01 : 0.09,
            scrollTrigger: {
                trigger: '.display-section',
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
                immediateRender: false,
                ease: "power1.inOut"
            },
            onUpdate: () => {
                viewerRef.setDirty();
                cameraRef.positionTargetUpdated(true);
            }
        })

        gsap.to(targetRef, {  // 문법 오류 수정
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
            onUpdate: () => {
                viewerRef.setDirty();
                cameraRef.positionTargetUpdated(true);
            }
        })
    }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef])

    return (
        <div id="webgi-canvas-container" ref={canvasContainerRef}>
            <canvas ref={canvasRef} id="webgi-canvas"></canvas>
            {
                previewMode && (
                    <button onClick={handleExit} className="button">Exit</button>
                )
            }
        </div>
    )
})

export default WebGiViewer;