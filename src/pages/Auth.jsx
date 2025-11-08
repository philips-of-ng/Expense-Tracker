import React, { useState } from 'react';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Auth = () => {
  const [displaying, setDisplaying] = useState('login');

  const { login, signUp } = useAuth()

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Object', { name: form.name, email: form.email, password: form.password });

      const response = await signUp(form.name, form.email, form.password)
      console.log('Response from sign up', response);
    } catch (error) {
      console.log('Error Signing up', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is associated with another account.')
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Object', { email: loginForm.email, password: loginForm.password });

      const response = await login(loginForm.email, loginForm.password)
      console.log('Response from sign in', response);
    } catch (error) {
      console.log('Error Signing in', error);
      if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
        toast.error('Invalid email or password')
      }
    }
  };

  return (
    <>
      {displaying === 'signup' ? (
        <div>
          <div className="min-h-[70vh] flex items-center justify-center bg-white">
            <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-center mb-6 text-appPurple">
                Create Account
              </h2>

              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-appPurpleLight"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="johndoe@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-appPurpleLight"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-appPurpleLight"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-appPurple text-white font-semibold rounded-lg hover:bg-appPurpleLight hover:text-appPurple transition-all duration-300"
                >
                  Sign Up
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{" "}
                <a onClick={() => setDisplaying('login')} className="text-appPurple hover:underline cursor-pointer">
                  Log In
                </a>
              </p>
            </div>
          </div>

          <div className='text-center w-full flex align-middle justify-center mb-1'>
            <Logo />
          </div>
          <p className='text-center'>a mini app by Philips Edun</p>
        </div>
      ) : (
        <div>
          <div className="min-h-[70vh] flex items-center justify-center bg-white">
            <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-center mb-6 text-appPurple">
                Log In
              </h2>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="johndoe@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-appPurpleLight"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-appPurpleLight"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-appPurple text-white font-semibold rounded-lg hover:bg-appPurpleLight hover:text-appPurple transition-all duration-300"
                >
                  Log In
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-5">
                Don't have an account?{" "}
                <a onClick={() => setDisplaying('signup')} className="text-appPurple hover:underline cursor-pointer">
                  Sign Up
                </a>
              </p>
            </div>
          </div>

          <div className='text-center w-full flex align-middle justify-center mb-1'>
            <Logo />
          </div>
          <p className='text-center'>a mini app by Philips Edun</p>
        </div>
      )}
    </>
  );
};

export default Auth;

















// import React, { useState, useEffect } from 'react'
// import Logo from '../components/Logo';

// const Auth = () => {

//   const [displaying, setDisplaying] = useState('signup')

//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const [loginForm, setLoginForm] = useState({ email: '', password: '' })

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(form); // You’ll later replace this with Firebase signup logic
//   };

//   return (

//     <>
//       {
//         displaying === 'signup' ? (
//           <>
//             <div>

//               <div className="min-h-[70vh] flex items-center justify-center bg-white">
//                 <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-md p-8">
//                   <h2 className="text-2xl font-semibold text-center mb-6 text-appPurple">
//                     Create Account
//                   </h2>

//                   <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                       <label className="block text-sm text-gray-700 mb-1">Full Name</label>
//                       <input
//                         type="text"
//                         value={form.name}
//                         onChange={(e) => setForm({ ...form, name: e.target.value })}
//                         placeholder="John Doe"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-appPurpleLight"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-700 mb-1">Email</label>
//                       <input
//                         type="email"
//                         value={form.email}
//                         onChange={(e) => setForm({ ...form, email: e.target.value })}
//                         placeholder="johndoe@email.com"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-appPurpleLight"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-700 mb-1">Password</label>
//                       <input
//                         type="password"
//                         value={form.password}
//                         onChange={(e) => setForm({ ...form, password: e.target.value })}
//                         placeholder="••••••••"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-appPurpleLight"
//                         required
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="w-full py-2 bg-appPurple text-white font-semibold rounded-lg hover:bg-appPurple hover:text-appPurple transition-all duration-300"
//                     >
//                       Sign Up
//                     </button>
//                   </form>

//                   <p className="text-center text-sm text-gray-500 mt-5">
//                     Already have an account?{" "}
//                     <a onClick={() => setDisplaying('login')} className="text-appPurple hover:underline">
//                       Log In
//                     </a>
//                   </p>
//                 </div>

//               </div>

//               <div className='text-center w-full flex align-middle justify-center mb-1'>
//                 <Logo />
//               </div>
//               <p className='text-center'>a mini app by Philips Edun</p>

//             </div>
//           </>
//         ) : (
//           <>

//           </>
//         )
//       }
//     </>




//   );
// }

// export default Auth