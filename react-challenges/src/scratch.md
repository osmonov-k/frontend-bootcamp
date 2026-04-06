const [bars, setBars] = useState([]);

const handleClick = () => {
setBars(prev => [...prev, 0]);
}
{
bars && bars.map((progress, index) => (
<div style={{width: '300px'}}>
<div style={{color: 'gren', width: ${progress}}}></div>
</div>
))
}

useEffect( ()=> {
const intervalId = setInterval(()=> {
setBars( prev => {
const newBars = prev;

        })
    }, 2000);

    return ()=> clearInterval(intervalId);

}, [bars])
