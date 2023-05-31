import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function LoginForm ({onSubmit}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username:"",
    password:""
  });
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
      setFormData({
        username:"",
        password:""
      });
      navigate("/");
    } catch (err) {
      setAlertMsgs(err);
    }

  }

  return (
      <div className="LoginForm">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username"></label>
            <input
                id="username"
                onChange={handleChange}
                name="username"
                value={formData.username}
                placeholder="username"
            />
          </div>

          <div>
            <label htmlFor="password"></label>
            <input
                id="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                placeholder="password"
            />
          </div>
          {alertMsgs.length > 0 && <Alert alertMsgs={alertMsgs}/>}
          <button className="LoginForm-submitBtn">Login</button>
        </form>
      </div>
  );
}

export default LoginForm;