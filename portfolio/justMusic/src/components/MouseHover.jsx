export default function MouseHover() {
    const [isHovering, setIsHovering] = useState(false);
    const style = {
        backgroundColor: '#004FA3'
    }
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };
    return(
        <>
        <button style={backgroundColor} className="searchButton">추천받기</button>
        </>
    )
}