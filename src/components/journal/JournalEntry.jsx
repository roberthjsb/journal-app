import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage:'url(https://3.bp.blogspot.com/-Y096u66r_U8/WHQebMbvCXI/AAAAAAAAEjU/tqCfSi0FZOApfOFMFr1tmwwLv4-NyO_eACLcB/s1600/myAvatar.png)'
                }}
            >
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title"> un nuevo dia</p>
                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </p>
            </div>
            <div className="journal__entry-date-box">
                <p>Monday</p>
                <h4>28</h4>
            </div>
        </div>
    )
}
