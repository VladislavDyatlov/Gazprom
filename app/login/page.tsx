"use client";

import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../login/login.scss";
import toast from "react-hot-toast";
import { loginUser } from "@/service/authService";
import { signIn } from "next-auth/react";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Неверный формат email")
      .required("Email обязателен"),
    password: yup
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .required("Пароль обязателен"),
  })
  .required();

const Login = async () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  }); 

  const onSubmit = async (data: any) => {
    try {
      await loginUser(data).then(res => {
        if(res.status === 200){
          toast.success(res.data);
        }
      });
    } catch (error: any) {
      console.log(error);
      toast.error("Ошибка при авторизации. Попробуйте позже.");
    }
  };

  return (
    <>
      <div className="login">
        <div className="login__icon">
          <p>Экосистема Смарт</p>
        </div>
        <div className="login__section">
          <div className="login__block">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="login__input">
                <label htmlFor="email">Введите email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Введите ваш email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>

              <div className="login__input">
                <label htmlFor="password">Введите пароль</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Введите ваш пароль"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>

              <div className="login__auth" onClick={() => signIn('google')}></div>

              <div className="login__btn">
                <button type="submit">Вход</button>
                <Link href="/reg">Нету аккаунта? Зарегистрироваться</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
