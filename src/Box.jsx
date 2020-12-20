export default function Box (props) {
    const style = Object.assign({ background: '#48d1cc', border: '2px solid #9932cc' }, props.style || {})
    return <div {...props} style={style}  />
}