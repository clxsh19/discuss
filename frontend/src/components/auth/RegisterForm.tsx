import Link from "next/link";
import { userRegister } from "@/lib/auth_api";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {

  return (
    <div className="bg-white h-full w-full rounded-[15px] p-[15px]">
      <div></div>
      <div>
        <h1>Sign Up</h1>
        <p>
          By continuing, you agree to our
          <a href="#">User Agreement</a>
          and acknowledge that you understand the
          <a href="#">Privacy Policy</a>
        </p>
        <div>Continue with Google</div>
        <div>
          <hr />
          <div>OR</div>
          <hr />
        </div>
        <form action={userRegister}>
          <div>
            <input type="text" name="username" placeholder="Email or username" required />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <div>
            Already a Redditor?
            <button onClick={onSwitchToLogin}>Log In</button>     
            {/* <Link href="/login">Log In</Link> */}
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;