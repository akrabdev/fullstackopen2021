import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    try {
      const userR = await loginService.login(credentials);
      setUser(userR);
    } catch (e) {
      console.log(e);
    }
  };

  const LoginForm = () => (
    <div>
      <form method="POST">
        <label htmlFor="password">Username</label>
        <input
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          id="username"
          type="text"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          type="password"
          name="password"
          id="password"
        />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        {LoginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
