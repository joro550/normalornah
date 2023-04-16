export default function StatsPage() {
    const myStyle = {
        width: '200px',
        height : '200px', 
        backgroundImage: 'conic-gradient(orange 64%, red 37%)',
        border_radius: '50%'
    };

    return (
        <div className='mx-auto'>
            <div className="mx-auto rounded-full mt-10" style={myStyle}></div>
            <div className="mx-auto w-full">
                <div className='flex mx-auto container w-full'>
                    <span style={{ "backgroundColor": "red"}} className="block w-5 h-5"></span>
                    Normal
                </div>
                <div>
                    <span className="w-5 h-5"></span>
                    Nah
                </div>
            </div>

        </div>
    );
}
