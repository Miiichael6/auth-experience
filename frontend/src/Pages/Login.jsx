import React, { useEffect } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  logearUsuario,
  perfilDeUsuario,
} from "../redux/actions/authActions";

const Login = () => {
  const navigate = useNavigate();
  const err = useSelector((state) => state.AuthReducer.error);
  const dispatch = useDispatch();
  const validateInputs = (valores) => {
    const errores = {};

    if (!valores.email) {
      errores.email = "porfavor ingresa tu correo";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)
    ) {
      errores.email = "el email solo puede tener puntos letras numeros guiones";
    } else if (valores.password.length < 6) {
      errores.password = "min 8 max 6 numeros y letras";
    } else if (!valores.password.trim()) {
      errores.password = "ingrese una contraseña porfavor";
    }

    return errores;
  };

  const handleFormik = async (valores, resetForm) => {
    const data = await dispatch(logearUsuario(valores));

    if (data.payload.msgErr) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 4000);
      return;
    } else {
      navigate("/home");
      resetForm();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-3/4">
        <div>
          <h1 className="text-white font-sans font-bold text-5xl text-center">
            Inicia Sesion
          </h1>
        </div>
        <div className="p-4">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(valores) => validateInputs(valores)}
            onSubmit={(valores, { resetForm }) =>
              handleFormik(valores, resetForm)
            }
          >
            {({ handleChange, values, errors }) => (
              <Form className="my-5 bg-zinc-900 shadow px-10 py-5 max-w-lg mx-auto rounded-xl">
                <div className="mt-5 mb-1">
                  <label htmlFor="email" className="text-lg text-white block">
                    Email
                  </label>
                  <Field
                    value={values.email}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email de Registro"
                    className="w-full p-2 border rounded outline-0 bg-zinc-800 border-neutral-600 text-white"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <span className="text-red-700 block text-center">
                        {errors.email}
                      </span>
                    )}
                  />
                </div>
                <div className="mt-1 mb-5">
                  <label
                    htmlFor="password"
                    className="text-lg text-white block"
                  >
                    password
                  </label>
                  <Field
                    value={values.password}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    className="w-full p-2 border rounded outline-0 bg-zinc-800 border-neutral-600 text-white"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <span className="text-red-700">{errors.password}</span>
                    )}
                  />
                </div>

                <div>
                  {err.msgErr && (
                    <span className="text-red-700 block text-center my-4">
                      {err.errorMsg.msg}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="block mx-auto bg-blue-500 p-2 text-white rounded hover:bg-slate-500 transition-colors"
                >
                  Iniciar Sesion
                </button>
                <div className="mt-5 text-center text-red-600"></div>
              </Form>
            )}
          </Formik>
          <nav className="max-w-md flex flex-col md:flex-row md:justify-between mx-auto">
            <Link
              className="text-center my-1 text-sky-600 hover:text-white transition-colors"
              to="/register"
            >
              ¿Aun sin cuenta? ¡Registrate!
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Login;
