import { useState } from 'react'
import ZoomImage from '../../../components/zoomImage'

import './index.scss'
const HouseList = () => {
    const [houseData, setHouseData] = useState([
        {
            title: '襄阳绿地空间站'
        }
    ])

    return (
        <>
            <div className="house-list">
                {
                    houseData.map((item, index) => (
                        <div className="house-list-li" key={index}>
                            <div className="house-content">
                                <div className="house-image">
                                    <ZoomImage imgSrc="https://static.fczx.com/a/202102/05/8/8/b05d555922fcc6fd6cfa322270bbef49.png" />
                                </div>
                                <div className="house-text">
                                    <div className="text-item title mb8">
                                        <span>{item.title}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default HouseList