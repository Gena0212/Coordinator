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
        <section className='google'>
            <Header isLoggedIn={false}/>
            <h3 className='google__h3'>Please sign in with Google below:</h3>
            <h4 className='google__h4'>Please note that this app only stores and displays the start and end times of events in your Google Calendar. Event locations, names, other invitees and any other personal information are not stored or displayed in this app to protect your privacy</h4>
            <h4 className='google__h4'>Any changes made to your Google Calendar will only be made if you make them yourself.</h4>
            <img className='google__img' src={googleButton} alt='google sign in' onClick={()=> auth()}/>
        </section>
        
    )
}

export default GoogleLoginPage;