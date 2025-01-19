import axios from 'axios';
import googleButton from '../../assets/images/btn_google_signin_dark_pressed_web.png'
import Header from '../../components/Header/Header';

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
            <button type="button" onClick={()=> auth()}>
                <img src={googleButton} alt='google sign in'/>
            </button>
        </>
    )
}

export default GoogleLoginPage;