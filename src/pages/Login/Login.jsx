import { useContext, useRef} from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { getAuth} from 'firebase/auth';
import { app } from '../../firebase/firebase.config';
const auth = getAuth(app);
const Login = () => {
 
    const { signIn ,passwordReset } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }
    const handlePasswordReset = event =>{
        const email = emailRef.current.value;
        if(!email){
            alert("please provide your email address to reset password");
            return;
        }
        passwordReset( auth, email).then(()=>{
            alert("please check your email")
        })
    }

    return (
        <>
           
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    
                    <div className="card  max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                
                            </div>

                            <div className="form-control mt-6">
                                <input  className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                       <div className='text-center '>
                       <button  onClick={handlePasswordReset}  className=" link link-hover text-sm">Forgot password?</button>
                       <p className='text-center pt-5'><small>New Here? <Link className='text-blue-500' to="/signup">Create an account</Link> </small></p>
                       </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;