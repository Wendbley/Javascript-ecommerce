const HandleSignin =  (e) => {
	e.preventDefault()
}

 const LoginScreen = {
	after_render: async () => {},
	render: async () => {
		return `<div class="form-container">
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1>Sign-In</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" />
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </li>
            <li>
              <button type="submit" class="primary" onClick='HandleSignin'>Signin</button>
            </li>
            <li>
              <div>
                New User?
                <a href="/#/sign-up">Create your account </a>
              </div>
            </li>
          </ul>
        </form>
      </div>`
	},
}

export default LoginScreen
