import React from 'react'
import MagicBento from '../components/upl'
const UploadPage = () => {
    return (
        <div className='flex justify-center pt-3.5'>
            <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
        />
        </div>
    )
}

export default UploadPage
