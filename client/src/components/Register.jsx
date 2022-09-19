import { useEffect, useState } from "react";

import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormRow from "./common/FormRow";

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

const initialState = {
  name: "",
  dob: "",
  mobile: "",
  gender: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, mobile, dob, gender } = values;
    console.log({ name, email, password, isMember, mobile, dob, gender })
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    if (isMember) {
      const currentUser = { email, password };
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      const currentUser = { name, gender, mobile, dob, email, password };
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (user) setTimeout(() => navigate("/", { replace: true }), 3000);
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <div>
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
            <FormRow type="tel" name="mobile" value={values.mobile} handleChange={handleChange}/>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                margin: "10px 0"
              }}
            >
              <input type="radio" name="gender" id="male" value="male" onChange={handleChange}/>
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" value="female" onChange={handleChange}/>
              <label htmlFor="female">Female</label>
            </div>
            <FormRow type="date" name="dob" id="date" handleChange={handleChange}/>
          </div>
        )}
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type={show === false ? "password" : "text"}
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <input
            type="checkbox"
            value={show}
            id="show_pass"
            onClick={() => setShow(!show)}
          />
          <label htmlFor="show_pass">Show</label>
        </div>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
