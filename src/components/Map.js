import Gebied from './Gebieden.js'

const Map = ({ gebieden, setId, setCode}) => {
  return (
    <>
      {gebieden.map((gebied) => (
        <Gebied key={gebied.id} gebied={gebied} setId={setId} setCode={setCode}/>
      ))}
    </>
  )
}

export default Map
