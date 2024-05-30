import React, { useState } from 'react';

function Tooltip({ children, text }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
            style={{ position: 'relative', display: 'inline-block',cursor:"pointer",fontWeight:'bold' }}
        >
            {children}
            {isVisible && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    height: '100px',
                    width: '200px',
                    fontSize: '14px',
                    transform: 'translateX(-50%)',
                    padding: '8px',
                    color: 'white',
                    backgroundColor: 'black',
                    borderRadius: '4px',
                    zIndex: '100',
                    fontWeight:'normal'

                }}>
                    {text}
                </div>
            )}
        </div>
    );
}


export default Tooltip;
