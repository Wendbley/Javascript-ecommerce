
const HandleSignup =  (e) => {
    e.preventDefault()
}

 const RegisterScreen = {
    after_render: async () => {
        
    },
	render: async () => {
		return `<div class="form-container">
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1>Register</h1>
            </li>
            <li>
              <label for="name">Username</label>
              <input type="text" name="name" id="name" placeholder="johnny"/>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" placeholder="johnny@jfk.com"/>
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </li>
            <li>
              <button type="submit" class="primary" onClick='HandleSignup'>Register</button>
            </li>
            <li>
              <div>
                Have an account?
                <a href="/#/sign-in">Sign in </a>
              </div>
            </li>
          </ul>
        </form>
      </div>`
	},
}


export default RegisterScreen