function Login() {
  return (
    <main className="login-main">
      <div className="login-card">
        <h2>Login</h2>
        <p className="login-text">Enter your credentials to access your account</p>
        <div className="login-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="login-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button className="login-btn">Sign In</button>
        <div className="login-actions">
          <a href="#">Forgot password?</a>
          <span> / </span>
          <a href="#">Already have an account?</a>
        </div>
      </div>
    </main>
  );
}

export default Login;
