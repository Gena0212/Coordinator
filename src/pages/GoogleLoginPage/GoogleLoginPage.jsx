import axios from 'axios';
import googleButton from '../../assets/images/web_light_rd_SI.svg'
import Header from '../../components/Header/Header';
import './GoogleLoginPage.scss'

const GoogleLoginPage = ({formData}) => {
    const apiURL = import.meta.env.VITE_API_BASE_URL;

    function navigate(url){
        window.location.href = url;
    }

    async function auth(){
        try {
        const response = await axios.post(`${apiURL}/request/${formData.email}`)
        console.log(response.data);
        navigate(response.data.url);
        } catch (error) {
        console.log(error)
        }
    }
    
    return(
        <>
            <Header isLoggedIn={false}/>
            <p>Please sign in with Google below:</p>
            <img className='google' src={googleButton} alt='google sign in' onClick={()=> auth()}/>
        </>
    )
}

export default GoogleLoginPage;