import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(({ notification }) => {
    return notification
  })

  //const dispatch = useDispatch()
  console.log(message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return <div style={style}>{message}</div>
}

export default Notification
