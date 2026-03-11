import { useEffect } from "react";
import { useParams,useNavigate } from "react-router";

const DetailBook = () => {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params)
    
    useEffect(() => {
        if(parseInt(params.id) !== 1) {
            navigate('/notfound')
        }
    }, [params.id,navigate])
    return ( 
        <div>
            <h1>Detail Book</h1>
        </div>
     );
}
 
export default DetailBook;