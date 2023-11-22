import "./single.scss"

const Single = props => {
  return (
    <div className="single">
        <div className="view">
          <div className="info">
            <div className="topInfo">
              {props.img && <img src={props.img} alt="" />}
              <h1>{props.title}</h1>
              <button>Update</button>
            </div>
            <div className="details">
              {Object.entries(props.info).map(item => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">{item[0]}</span>
                  <span className="itemValue">{item[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Single
