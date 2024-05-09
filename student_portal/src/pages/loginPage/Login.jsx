import React, { useState } from 'react';
import teacherStudentImg from '../../images/teacher_student.jpeg';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className="login-main">
      <div className="login-image-container">
        <p className="login-text">
          <span className="login-text-title">Welcome to</span>
          <span className="login-text-sub-title">Student Portal</span>
        </p>
        <img
          className="login-image"
          src={teacherStudentImg}
          alt="teacher_student_img"
        />
      </div>

      <form className="login-form-container">
        <div className="login-form">
          <h1 style={{ textAlign: 'left', color: 'white' }}>Login</h1>
          <label htmlFor="username">Username</label>
          <input id="username" className="login-input" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" className="login-input" type="text" />
          <div
            style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
            }}
          >
            <label htmlFor="showPassword">Show password</label>
            <input type="checkbox" id="showPassword" />
          </div>

          <button className="login-button">Submit</button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              whiteSpace: 'nowrap',
            }}
          >
            <Link to="/register">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'underline',
                }}
              >
                <span>Need an account?</span>
                <span>Register</span>
              </div>
            </Link>
            <Link>
              <span style={{ textDecoration: 'underline' }}>
                Forgot password?
              </span>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
