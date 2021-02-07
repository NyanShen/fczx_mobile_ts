import './index.scss'
interface IProps {
    imgSrc: string
}
const ZoomImage = (props: IProps) => {
    const imageStyle = {
        backgroundImage: `url(${props.imgSrc})`
    }
    return (
        <>
            <div className="zoom-image" style={imageStyle}></div>
        </>
    )
}

export default ZoomImage