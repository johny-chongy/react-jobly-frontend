import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function SignUpForm({ onSubmit }) {
  const navigate = useNavigate();
  const initialFormInput = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  }

  const [formData, setFormData] = useState(initialFormInput);
  const [alertMsgs, setAlertMsgs] = useState([]);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Submit form: call function from parent & clear inputs. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await onSubmit(formData);
      setFormData(initialFormInput);
      navigate("/");
    } catch (err) {
      setAlertMsgs(err);
    }
  }

  return (
    <div className="SignUpForm m-2">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="form-control w-25"
            id="username"
            onChange={handleChange}
            name="username"
            value={formData.username}
            placeholder="username"
          />
        </div>

        <div>
          <input
            className="form-control w-25"
            id="password"
            type="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            placeholder="password"
          />
        </div>

        <div>
          <input
            className="form-control w-25"
            id="firstName"
            onChange={handleChange}
            name="firstName"
            value={formData.firstName}
            placeholder="first name"
          />
        </div>

        <div>
          <input
            className="form-control w-25"
            id="lastName"
            onChange={handleChange}
            name="lastName"
            value={formData.lastName}
            placeholder="last name"
          />
        </div>

        <div>
          <input
            className="form-control w-25"
            id="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
            placeholder="email"
          />
        </div>
        {alertMsgs.length > 0 && <Alert alertMsgs={alertMsgs} />}
        <button className="SignUpForm-submitBtn btn btn-primary m-1">Sign up</button>
      </form>
    </div>
  );
}

export default SignUpForm;