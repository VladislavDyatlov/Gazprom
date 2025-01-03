'use client';

import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../login/login.scss";
import { registerUser } from "@/service/authService";
import toast from "react-hot-toast";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Неверный формат email")
      .required("Email обязателен"),
    name: yup
      .string()
      .min(3, "Имя должно быть минимум из 3 символов")
      .required("ФИО обязательно"),
    password: yup
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .required("Пароль обязателен"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли должны совпадать")
      .required("Повтор пароля обязателен"),
  })
  .required();

const Register = () => {
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
      const result = await registerUser(data);
      toast.success("Регистрация прошла успешно!");
    } catch (error: any) {
      console.error("Ошибка регистрации:", error);
      toast.error("Ошибка при регистрации. Попробуйте позже.");
      setError("email", {
        type: "manual",
        message: "Ошибка при регистрации. Попробуйте позже.",
      });
    }
  };

  return (
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
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="login__input">
              <label htmlFor="name">Введите ФИО</label>
              <input
                id="name"
                type="text"
                placeholder="Введите ваше ФИО"
                {...register("name")}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
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

            <div className="login__input">
              <label htmlFor="confirmPassword">Повторите пароль</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Повторите ваш пароль"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="login__auth"></div>

            <div className="login__btn">
              <button type="submit">Зарегистрироваться</button>
              <Link href="/login">Уже есть аккаунт? Войти</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

