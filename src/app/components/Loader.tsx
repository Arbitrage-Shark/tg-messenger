import Spinner from 'react-bootstrap/Spinner';
export default function Loader() {
    return (
        <Spinner style={{
        position: "fixed",
  left: "50%",
  top: "50%",
//   width: "100%",
//   height: "100%",
  zIndex: 9999
    }} animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}