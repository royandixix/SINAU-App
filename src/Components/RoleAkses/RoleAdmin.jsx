import { useContext } from "react";
import { AuthContext } from "../../App";
import { Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";


function RoleAdmin(){
    const { state } = useContext(AuthContext);

    if(!state.isAuthenticated) {
        return <Navigate to='/login' replace/>;
    }

    return(
        <Container className="mt-5">
            <h1 className="display-4 mb-3">Halaman Role{state.role} yaitu {state.user}</h1>
            <p className="lead">Kelola semua rakyat dan aktivitas</p>
            <hr className="my-2"/>
            <p>Lihat detail pembayaran, status transaksi, dan catatan lainnya dengan mudah.</p>
            <Button color="primary">Lihat status</Button>
        </Container>
    )
}

export default RoleAdmin