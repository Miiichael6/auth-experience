import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearErrors,
  perfilDeUsuario,
  registrarUsuario,
} from "../redux/actions/authActions";

const Register = () => {
  const err = useSelector((state) => state.AuthReducer.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateInputs = (valores) => {
    const errores = {};

    if (!valores.name) {
      errores.name = "Ingresa un name";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
      errores.name = "El name solo puede contener letras o espacios";
    }
    if (!valores.email) {
      errores.email = "porfavor ingresa tu correo";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)
    ) {
      errores.email = "el email solo puede tener puntos letras numeros guiones";
    } else if (valores.password.length < 6) {
      errores.password = "min 8 max 6 numeros y letras";
    } else if (valores.password !== valores.repetirPassword) {
      errores.repetirPassword = "los passwords no coinciden";
    }
    return errores;
  };

  const handleFormik = async (valores, resetForm) => {
    const { error } = await dispatch(registrarUsuario(valores));
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 4000);
      return;
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        repetirPassword: "",
      }}
      validate={(valores) => validateInputs(valores)}
      onSubmit={(valores, { resetForm }) => handleFormik(valores, resetForm)}
    >
      {({ handleChange, errors, values }) => (
        <div className="p-5">
          <h1 className="text-zinc-100 font-sans text-5xl text-center">
            Sign in
          </h1>
          <Form className="my-10 max-w-md bg-neutral-900 px-10 py-5 rounded-lg mx-auto">
            <div className="mt-5">
              <label className="text-white text-md block">Nombre</label>
              <Field
                value={values.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="nombre"
                className="w-full p-2 border border-zinc-500 rounded outline-0 bg-zinc-600 text-white"
              />
              <ErrorMessage
                name="nombre"
                component={() => (
                  <span className="text-center block text-red-600">
                    {errors.name}
                  </span>
                )}
              />
            </div>
            <div className="my-2">
              <label className="text-white text-md block">Email</label>
              <Field
                value={values.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="email de Registro"
                className="w-full p-2 border border-zinc-500 rounded outline-0 bg-zinc-600 text-white"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <span className="text-center block text-red-600">
                    {errors.email}
                  </span>
                )}
              />
            </div>
            <div className="">
              <label htmlFor="password" className="text-white text-md block">
                Password
              </label>
              <Field
                id="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="password"
                className="w-full p-2 border border-zinc-500 rounded outline-0 bg-zinc-600 text-white"
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <span className="text-center block text-red-600">
                    {errors.password}
                  </span>
                )}
              />
            </div>
            <div className="mt-2 mb-5">
              <label htmlFor="" className="text-white text-md block">
                Repite tu password
              </label>
              <Field
                value={values.repetirPassword}
                onChange={handleChange}
                name="repetirPassword"
                type="password"
                placeholder="repite tu password"
                className="w-full p-2 border border-zinc-500 rounded outline-0 bg-zinc-600 text-white"
                // onBlur={handleBlur}
              />
              <ErrorMessage
                name="repetirPassword"
                component={() => (
                  <span className="text-center block text-red-600">
                    {errors.repetirPassword}
                  </span>
                )}
              />
            </div>

            <div className="my-3">
              {err.error && (
                <span className="text-red-600 block text-center">
                  {err.errorMsg}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="block bg-zinc-800 shadow-lg shadow-cyan-500/50 text-white rounded-sm p-2 mx-auto hover:bg-zinc-900 transition-colors"
            >
              crear cuenta
            </button>
          </Form>

          <nav className="lg:flex lg:justify-between">
            <Link
              className="block text-center text-sky-500 my-5 hover:text-white"
              to="/login"
            >
              ya tienes cuenta?
            </Link>
          </nav>
        </div>
      )}
    </Formik>
  );
};

export default Register;
