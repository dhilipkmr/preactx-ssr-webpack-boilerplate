import { h } from 'preact';
import { Link } from 'preact-router';

const Login = () => (
  <div>
    <div style={{background: '#673AB7', color: 'white', height: '200px', borderRadius: '5px'}}>
      <div style={{ paddingTop: '100px', textAlign: 'center' }}>
        Preact Login Page!
      </div>
    </div>
    <div style={{ marginTop: '20px'}}>Goto <Link href="/">Home</Link></div>
  </div>
);

export default Login;
