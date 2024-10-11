

// eslint-disable-next-line react/prop-types
function ImageDis({imgUrl}) {
  const imgstyle = {
     height : '230px' ,
     width : '230px',
     border: '1px solid black',
     margin:'25% 0 0 0',
     position:'fixed'
  }
  return (
    <>
      <img src={imgUrl} alt="Generated" style={imgstyle} />
    </>
  )
}

export default ImageDis