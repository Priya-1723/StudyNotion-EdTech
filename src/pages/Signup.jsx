import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"


function Signup(){
    return (
        <Template 
        title = "Join the millions learning to code with StudyNotion fro free"
        description1 = "Build skills for today, tomorreow, and beyond."
        description2 = "Education to future-proof your career."
        image = {signupImg}
        formType = "signup"
        />
    )
}

export default Signup