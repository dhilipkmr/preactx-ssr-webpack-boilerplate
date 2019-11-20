import { h } from 'preact';
import { Link } from 'preact-router';

const Login = () => (
  <div>
    <div style={{background: '#673AB7', color: 'white', height: '200px', borderRadius: '5px'}}>
      <div style={{ paddingTop: '100px', textAlign: 'center' }}>
        Hello Preact!
      </div>
    </div>
    <div style={{ marginTop: '20px'}}>Goto <Link href="/login">Login</Link></div>
  </div>
);

export default Login;